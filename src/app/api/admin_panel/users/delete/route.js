import { connectToDatabase } from '../../../middleware/mongo';
import { NextResponse } from 'next/server';

// input for example:
// {
//     "userId": "667dcdef2f4666fa50754117"
// }

export async function DELETE(req) {
    try {
        const { userId } = await req.json();
        const db = await connectToDatabase();
        var ObjectId = require('mongodb').ObjectId;
        
        const result = await db.collection('Users').deleteOne({ _id: new ObjectId(userId) });

        if (result.deletedCount > 0) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}
