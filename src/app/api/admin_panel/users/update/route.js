import { connectToDatabase } from '../../../middleware/mongo';
import { NextResponse } from 'next/server';

// input for example:
// {
//   "userId": "667dcb312f4666fa50754115",
//   "updatedFields": {
//     "email": "admin@admin.com",
//     "password_hash": "updatedAdm!nPassw0rd!",
//     "isAdmin": true,
//     "firstName": "גל",
//     "lastName": "תמר",
//     "fromFacebook": true
//   }
// }

export async function PUT(req) {
    try {
        const { userId, updatedFields } = await req.json();
        const response = await updateUserById(userId, updatedFields);
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}

async function updateUserById(userId, updatedFields) {
    const db = await connectToDatabase();
    var ObjectId = require('mongodb').ObjectId;
    try {
        const result = await db.collection('Users').updateOne(
            { _id: new ObjectId(userId) },
            { $set: updatedFields }
        );

        if (result.matchedCount > 0) {
            return { success: true };
        } else {
            return { success: false, message: 'User not found' };
        }
    } catch (error) {
        return { success: false, message: error.message };
    }
}