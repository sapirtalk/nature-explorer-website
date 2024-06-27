import { connectToDatabase } from '../../../middleware/mongo';
import { NextResponse } from 'next/server';

// input for example:
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