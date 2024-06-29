import { connectToDatabase } from '../../middleware/mongo';
import { NextResponse } from 'next/server';


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
        var ObjectId = require('mongodb').ObjectId;

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