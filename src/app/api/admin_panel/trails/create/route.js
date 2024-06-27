import { connectToDatabase } from '../../../middleware/mongo';
import { NextResponse } from 'next/server';

// input for example:
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
//     ],
//     "rating": 4,
//     "isArchived": false
//   }

export async function POST(req) {
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
    
    try {
        const result = await db.collection('Trails').insertOne(newTrail);
        return NextResponse.json({ success: true, trailId: result.insertedId });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}