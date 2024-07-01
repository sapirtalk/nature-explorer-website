import { connectToDatabase } from '../../middleware/mongo';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

// POST /api/user_panel/favorite_trails
// Purpose:
// Present the user his favorite trails.
// Input Example:
// {
// "requesterId": "667dcb312f4666fa50754115" 
// }
export async function POST(req) {
    try {
        const { requesterId } = await req.json();
        const db = await connectToDatabase();

        const requester = await db.collection('Users').findOne({_id: new ObjectId(requesterId)})

        if (!requester) {
            return NextResponse.json({ success: false, message: "Requester user not found" });
        }

        const requesterFavoriteTrailsIds = requester.favoriteTrails
        var requesterFavoriteTrails = []
        for (const trailId of requesterFavoriteTrailsIds) {
            const trail = await db.collection('Trails').findOne({_id: new ObjectId(trailId)})
            requesterFavoriteTrails.push(trail)
        }

        return NextResponse.json({ success: true, favorite_trails: requesterFavoriteTrails });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}


// PUT /api/user_panel/favorite_trails
// Purpose:
// Allow a user to add/delete a specific trail to/from his favorite trails
// Input Example:
// {
//   "userId": "667dcb312f4666fa50754115",
//   "trailId": "667dc4272f4666fa50754112",
//   "action": "add"
// }
export async function PUT(req) {
    try {
        const { userId, trailId, action } = await req.json();
        const db = await connectToDatabase();

        const response = await updateUserById(db, userId, trailId, action);
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}

async function updateUserById(db, userId, trailId, action) {
    const updateOperation = action === "add" 
        ? { $addToSet: { favoriteTrails: trailId } }  // Add trail to set, prevents duplicates
        : { $pull: { favoriteTrails: trailId } };  // Remove trail from set if exists

    try {
        const result = await db.collection('Users').updateOne(
            { _id: new ObjectId(userId) },
            updateOperation
        );

        if (result.matchedCount > 0) {
            return { success: true, message: 'Favorite trails updated successfully.' };
        } else {
            return { success: false, message: 'User not found.' };
        }
    } catch (error) {
        return { success: false, message: error.message };
    }
}