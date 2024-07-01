import { connectToDatabase } from '../../middleware/mongo';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

// POST /api/admin_panel/trails
// Purpose:
// allow admins and editors to add a new trail to the database
// Input Example:
// {
//     "requesterId": "667dcd842f4666fa50754116",
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
        const { requesterId, name, difficulty, location, distance, duration, kidsFriendly, petsFriendly, babyStrollerFriendly, description, image } = await req.json();
        const db = await connectToDatabase();

        // Check if requester is authorized
        const requester = await db.collection('Users').findOne({_id: new ObjectId(requesterId)})
        if (requester) {
            if (requester.role !== "admin" && requester.role !== "editor") { 
                return NextResponse.json({ success: false, message: "Not authorized!" });
            }
        } else return NextResponse.json({ success: false, message: "Requester user not found" });

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
            ratings: {},
            averageRating: null,
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
// Purpose:
// Allow admins and editors to delete a trail from the database
// Input Example:
// {
//     "requesterId": "667dcd842f4666fa50754116",
//     "trailId": "667dc4272f4666fa50754112"
// }
export async function DELETE(req) {
    try {
        const { requesterId, trailId } = await req.json();
        const db = await connectToDatabase();

        // Check if requester is authorized
        const requester = await db.collection('Users').findOne({_id: new ObjectId(requesterId)})
        if (requester) {
            if (requester.role !== "admin" && requester.role !== "editor") { 
                return NextResponse.json({ success: false, message: "Not authorized!" });
            }
        } else return NextResponse.json({ success: false, message: "Requester user not found" });


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
// Purpose:
// Present to admins/editors the entire trails collection from the database,
// so they can modify/delete if needed
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
// Purpose:
// Allow admins/editors to modify a trail (change its name, add to archive etc.) 
// Input Example:
// {
//     "requesterId": "667dcd842f4666fa50754116",
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
        const { requesterId, trailId, updatedFields } = await req.json();
        const db = await connectToDatabase();

        // Check if requester is authorized
        const requester = await db.collection('Users').findOne({_id: new ObjectId(requesterId)})
        if (requester) {
            if (requester.role !== "admin" && requester.role !== "editor") { 
                return NextResponse.json({ success: false, message: "Not authorized!" });
            }
        } else return NextResponse.json({ success: false, message: "Requester user not found" });

        const response = await updateTrailById(db, trailId, updatedFields);
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}

// Helper function to update trail by trailId
async function updateTrailById(db, trailId, updatedFields) {
    updatedFields.updatedAt = new Date();
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