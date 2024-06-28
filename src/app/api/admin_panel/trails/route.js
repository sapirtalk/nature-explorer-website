import { connectToDatabase } from '../../middleware/mongo';
import { NextResponse } from 'next/server';


// POST /api/admin_panel/trails
// Input Example:
// {
//     "name": "trail",
//     "difficulty": 2,
//     "location": "location",
//     "distance": 5,
//     "duration": 3,
//     "kidsFriendly": false,
//     "petsFriendly": true,
//     "babyStrollerFriendly": true,
//     "description": "description",
//     "image": [
//       "image1",
//       "image2",
//       "image3"
//     ]
//   }
export async function POST(req) {
    try {
        const { name, difficulty, location, distance, duration, kidsFriendly, petsFriendly, babyStrollerFriendly, description, image, rating } = await req.json();
        const db = await connectToDatabase();
        
        const newTrail = {
            name,
            difficulty,
            location,
            distance,
            duration,
            kidsFriendly,
            petsFriendly,
            babyStrollerFriendly,
            description,
            image,
            rating,
            isArchived: false,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        
        const result = await db.collection('Trails').insertOne(newTrail);
        return NextResponse.json({ success: true, trailId: result.insertedId });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}

// DELETE /api/admin_panel/trails
// Input Example:
// {
//     "trailId": "667dc4272f4666fa50754112"
// }
export async function DELETE(req) {
    try {
        const { trailId } = await req.json();
        const db = await connectToDatabase();
        var ObjectId = require('mongodb').ObjectId;

        const result = await db.collection('Trails').deleteOne({ _id: new ObjectId(trailId) });

        if (result.deletedCount > 0) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false, message: 'Trail not found' });
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}

// GET /api/admin_panel/trails
export async function GET(req) {
    try {
        const db = await connectToDatabase();
        const trails = await db.collection('Trails').find().toArray();
        return NextResponse.json({ success: true, trails });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}

// PUT /api/admin_panel/trails
// Input Example:
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
//             "updated_image"
//         ]
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

// Helper function to update trail by trailId
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