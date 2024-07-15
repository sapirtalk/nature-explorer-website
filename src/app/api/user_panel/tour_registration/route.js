import { connectToDatabase } from '../../middleware/mongo';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

// POST /api/user_panel/tour_registration
// Purpose:
// Present the user his registered tours.
// Input Example:
// {
// "userId": "6666e04b2bb934afb1946489" 
// }
export async function POST(req) {
    try {
        const { userId } = await req.json();
        const db = await connectToDatabase();

        const user = await db.collection('Users').findOne({_id: new ObjectId(userId)})

        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" });
        }

        const userRegisteredToursIds = Object.keys(user.registeredTours)
        var userRegisteredTours = []
        for (const tourId of userRegisteredToursIds) {
            const tour = await db.collection('Tours').findOne(
                { _id: new ObjectId(tourId) },
                { projection: { title: 1, description: 1, registeredUsersCount: 1, isArchived: 1 } }  // Specify fields to include
            );
            userRegisteredTours.push(tour);
        }

        return NextResponse.json({ success: true, registered_tours: userRegisteredTours });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}

// PUT /api/user_panel/tour_registration
// Purpose:
// Allow a user to register to a tour (and undo it) and mention the number of people that will arrive.
// Input Example:
// {
//     "userId": "6666e04b2bb934afb1946489",
//     "tourId": "66827732b991287077953706",
//     "action": "add",
//     "numberOfPeople": 4
// }
export async function PUT(req) {
    try {
        const { userId, tourId, action, numberOfPeople } = await req.json();
        const db = await connectToDatabase();

        const response = await updateTourById(db, userId, tourId, action, numberOfPeople);
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}

async function updateTourById(db, userId, tourId, action, numberOfPeople) {
    try {
        const tour = await db.collection('Tours').findOne({ _id: new ObjectId(tourId) });
        const user = await db.collection('Users').findOne({ _id: new ObjectId(userId) });

        if (!tour) {
            return { success: false, message: 'Tour not found.' };
        }
        if (!user) {
            return { success: false, message: 'User not found.' };
        }

        let registeredUsersUpdate = {};
        let registeredUsersCountUpdate = 0;
        let registeredToursUpdate = {};

        const existingPeopleCount = tour.registeredUsers[userId] || 0;

        if (action === "add") {
            registeredUsersCountUpdate = numberOfPeople - existingPeopleCount;
            registeredUsersUpdate = { $set: { [`registeredUsers.${userId}`]: numberOfPeople }, $inc: { registeredUsersCount: registeredUsersCountUpdate } };
            registeredToursUpdate = { $set: { [`registeredTours.${tourId}`]: numberOfPeople } };
        } else if (action === "remove") {
            registeredUsersUpdate = { $unset: { [`registeredUsers.${userId}`]: "" }, $inc: { registeredUsersCount: -existingPeopleCount } };
            registeredToursUpdate = { $unset: { [`registeredTours.${tourId}`]: "" } };
        } else return { success: false, message: 'Action not defined.' }

        const result_1 = await db.collection('Tours').updateOne(
            { _id: new ObjectId(tourId) },
            registeredUsersUpdate
        );

        const result_2 = await db.collection('Users').updateOne(
            { _id: new ObjectId(userId) },
            registeredToursUpdate
        );

        if (result_1.matchedCount > 0 && result_2.matchedCount > 0) {
            return { success: true, message: 'Registered Users list and Registered Tours list updated successfully.', existingPeopleCount: existingPeopleCount };
        } else if (result_1.matchedCount === 0 && result_2.matchedCount === 0) {
            return { success: false, message: 'Tour not found. User not found.' };
        } else if (result_1.matchedCount === 0) {
            return { success: false, message: 'Tour not found.' };
        } else {
            return { success: false, message: 'User not found.' };
        }

    } catch (error) {
        return { success: false, message: error.message };
    }
}
