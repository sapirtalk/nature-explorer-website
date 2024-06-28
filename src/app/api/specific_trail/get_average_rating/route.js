import { connectToDatabase } from '../../middleware/mongo';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb'; // Import ObjectId from mongodb

export async function POST(req) {
    try {
        const { trailId } = await req.json();
        const db = await connectToDatabase();
        const trail = await db.collection('Trails').findOne({ _id: new ObjectId(trailId) });

        if (trail) {
            const trailRatings = Object.values(trail.ratings);
            if (trailRatings.length == 0) {
                return NextResponse.json({ success: true, message: 'Trail has no ratings yet' });
            } else {
                let sum = 0;
                for (const number of trailRatings) {
                  sum += number;
                }
                
                const average = sum / trailRatings.length;
                return NextResponse.json({ success: true, average: average });
            }
        } else {
            return NextResponse.json({ success: false, message: 'Trail not found' });
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}