import { connectToDatabase } from '../../middleware/mongo';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

// PUT /api/user_panel/trail_rating
// Purpose:
// Allow a user to add, update, or remove a rating for a trail.
// Note: After the rating is submitted, it automatically updates the average rating for the trail.
// Input Example:
// {
//     "userId": "66530ccdd001059ab08fb5af",
//     "trailId": "667917be7068d871a92d482d",
//     "rating": 1,
//     "action": "add" // or "remove"
// }
export async function PUT(req) {
    try {
        const { userId, trailId, rating, action } = await req.json();
        const db = await connectToDatabase();

        const response = await updateTrailById(db, userId, trailId, rating, action);
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}

// Helper function to update trail by trailId
async function updateTrailById(db, userId, trailId, rating, action) {
    try {
        const trail = await db.collection('Trails').findOne({ _id: new ObjectId(trailId) });

        if (!trail) {
            return { success: false, message: 'Trail not found' };
        }

        let newTotalRating = trail.totalRating || 0;
        let newRatingCount = trail.ratingCount || 0;
        const currentRating = trail.ratings[userId] || 0;

        if (action === 'add') {
            if (currentRating) {
                newTotalRating = newTotalRating - currentRating + rating;
            } else {
                newTotalRating += rating;
                newRatingCount += 1;
            }
            const updateResult = await db.collection('Trails').updateOne(
                { _id: new ObjectId(trailId) },
                {
                    $set: {
                        [`ratings.${userId}`]: rating,
                        totalRating: newTotalRating,
                        ratingCount: newRatingCount,
                        averageRating: newTotalRating / newRatingCount
                    }
                }
            );
            if (updateResult.matchedCount === 0) {
                return { success: false, message: 'Trail not found' };
            }
        } else if (action === 'remove') {
            if (!currentRating) {
                return { success: false, message: 'Rating not found for this user' };
            }
            newTotalRating -= currentRating;
            newRatingCount -= 1;
            const updateFields = {
                totalRating: newTotalRating,
                ratingCount: newRatingCount,
                averageRating: newRatingCount > 0 ? newTotalRating / newRatingCount : 0
            };

            const unsetResult = await db.collection('Trails').updateOne(
                { _id: new ObjectId(trailId) },
                { $unset: { [`ratings.${userId}`]: "" } }
            );
            if (unsetResult.matchedCount === 0) {
                return { success: false, message: 'Trail not found' };
            }

            const setResult = await db.collection('Trails').updateOne(
                { _id: new ObjectId(trailId) },
                { $set: updateFields }
            );
            if (setResult.matchedCount === 0) {
                return { success: false, message: 'Trail not found' };
            }
        } else {
            return { success: false, message: 'Invalid action' };
        }

        return { success: true , message: 'Rating updated successfully' , code: 202 };
    } catch (error) {
        return { success: false, message: error.message };
    }
}
