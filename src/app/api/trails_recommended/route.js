import { connectToDatabase } from '../middleware/mongo';
import { NextResponse } from 'next/server';

// Return the top 5 recommended trails based on the number of raters and an average rating of at least 4
export async function GET() {
    const db = await connectToDatabase();

    // Find trails with averageRating of at least 4, sorted by ratingCount
    let trails = await db.collection('Trails')
        .find({ averageRating: { $gte: 4 } })
        .sort({ ratingCount: -1 })
        .limit(5)
        .toArray();

    // If less than 5 trails found, get additional top-rated trails with averageRating of at least 3 to fill up the list
    if (trails.length < 5) {
        const additionalTrails = await db.collection('Trails')
            .find({ averageRating: { $gte: 3, $lt: 4 } })
            .sort({ ratingCount: -1 })
            .limit(5 - trails.length)
            .toArray();

        trails = trails.concat(additionalTrails);
    }

    return NextResponse.json({ trails });
}