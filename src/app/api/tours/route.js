// show the newest published tours first (descending order)


import { connectToDatabase } from '../middleware/mongo';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';


// request body example:
// {
//     "SortReq": {
//         "by": "updatedAt",
//         "order": "dsc"
//     }
// }



export async function POST(req) {
    try {
    
        const {SortReq} = await req.json();
        const db = await connectToDatabase();

        const SortIndex = SortReq ? { [SortReq.by]: SortReq.order === 'dsc' ? -1 : 1 } : { writtenAt: -1 };

        let tours = await db.collection('Tours').find().sort(SortIndex).toArray();

        for (const tour of tours) {
            const tourTime = new Date(tour.tourTime);
            tourTime.setUTCHours(23, 59, 59, 999);

            if (tourTime < Date.now() && tour.registeredUsers && Object.keys(tour.registeredUsers).length > 0) {
                const registeredUsers = Object.keys(tour.registeredUsers);
                for (const registeredUserId of registeredUsers) {
                    const registeredUser = await db.collection('Users').findOne({ _id: new ObjectId(registeredUserId) });
                    if (registeredUser) {
                        // Remove the tour from the user's registeredTours
                        delete registeredUser.registeredTours[tour._id.toString()];
                        await db.collection('Users').updateOne(
                            { _id: new ObjectId(registeredUserId) },
                            { $set: { registeredTours: registeredUser.registeredTours } }
                        );
                    }
                }
                // Remove all registrations from the tour
                await db.collection('Tours').updateOne(
                    { _id: new ObjectId(tour._id) },
                    { $set: { registeredUsers: {}, registeredUsersCount: 0 } }
                );
            }
        }


        // Fetch updated tours after modifications
        tours = await db.collection('Tours').find({}).toArray();

        return NextResponse.json({tours});
    } catch (error) {
        return NextResponse.json({ success : false, message: error.message });
    }
}