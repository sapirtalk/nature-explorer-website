import { connectToDatabase } from '../../../middleware/mongo';
import { NextResponse } from 'next/server';

// input for example:
// {
//     "trailId": "667dc4272f4666fa50754112",
//     "updatedFields": {
//         "name": "updated_trail",
//         "difficulty": 3,
//         "location": "updated_location",
//         "distance": 6,
//         "duration": 4,
//         "kidsFriendly": false,
//         "petsFriendly": false,
//         "babyStrollerFriendly": false,
//         "description": "updated_description",
//         "image": [
//         "updated_image"
//         ],
//         "rating": 3,
//         "isArchived": false
//     }
// }
export async function PUT(req) {
    try {
        const { trailId, updatedFields } = await req.json();
        const response = await updateTrailById(trailId, updatedFields);
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}

async function updateTrailById(trailId, updatedFields) {
    const db = await connectToDatabase();
    updatedFields.updatedAt = new Date();
    var ObjectId = require('mongodb').ObjectId;
    try {
        const result = await db.collection('Trails').updateOne(
            { _id: new ObjectId(trailId) },
            { $set: updatedFields }
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