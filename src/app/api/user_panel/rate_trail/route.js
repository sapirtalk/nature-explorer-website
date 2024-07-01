import { connectToDatabase } from '../../middleware/mongo';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

// PUT /api/specific_trail/rate
// Purpose:
// Allow a user to add or update a rating for a trail.
// Note: After the rating is submitted, it automatically updates the average rating for the trail.
// Input Example:
// {
//     "requesterId": "66530ccdd001059ab08fb5af",
//     "trailId": "667917be7068d871a92d482d",
//     "rating": 1
// }
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
        // Update the specific rating as before
        const updateResult = await db.collection('Trails').updateOne(
            { _id: new ObjectId(trailId) },
            { 
                $set: { 
                    [`ratings.${requesterId}`]: rating, 
                } 
            }
        );

        // If the update was successful, calculate and update the average
        if (updateResult.matchedCount > 0) {
            // Get the trail document after the update
            const trail = await db.collection('Trails').findOne({ _id: new ObjectId(trailId) });

            if (trail) {
                const trailRatings = Object.values(trail.ratings);
                if (trailRatings.length > 0) {
                    let sum = 0;
                    for (const number of trailRatings) {
                        sum += number;
                    }
                    const average = sum / trailRatings.length;

                    // Update the 'averageRating' field and the 'rating' field
                    await db.collection('Trails').updateOne(
                        { _id: new ObjectId(trailId) },
                        {
                            $set: {
                                averageRating: average, // New field for average rating
                            }
                        }
                    );
                }
            }

            return { success: true };
        } else {
            return { success: false, message: 'Trail not found' };
        }
    } catch (error) {
        return { success: false, message: error.message };
    }
}