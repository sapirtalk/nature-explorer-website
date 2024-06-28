import { connectToDatabase } from '../../middleware/mongo';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb'; // Import ObjectId from mongodb

export async function PUT(req) {
    try {
        const { requesterId, trailId, rating } = await req.json();
        const db = await connectToDatabase();

        const response = await updateTrailById(db, requesterId, trailId, rating);
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}

// Helper function to update trail by trailId
async function updateTrailById(db, requesterId, trailId, rating) {
    try {
        const result = await db.collection('Trails').updateOne(
            { _id: new ObjectId(trailId) },
            { 
                $set: { 
                    [`ratings.${requesterId}`]: rating // Update specific field using bracket notation
                } 
            }
        );

        if (result.matchedCount > 0) {
            return { success: true };
        } else {
            return { success: false, message: 'Trail not found' };
        }
    } catch (error) {
        return { success: false, message: error.message };
    }
}