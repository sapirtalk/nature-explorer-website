import { connectToDatabase } from '../../middleware/mongo';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb'; // Import ObjectId from mongodb


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