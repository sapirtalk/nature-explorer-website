import { connectToDatabase } from '../../middleware/mongo';
import { NextResponse } from 'next/server';

// Input Example:
// POST /api/admin_panel/users
// {
//   "email": "admin@admin.com",
//   "password_hash": "admin_password",
//   "isAdmin": true,
//   "firstName": "admin",
//   "lastName": "admin",
//   "fromFacebook": false
// }
export async function POST(req) {
    try {
        const { email, password_hash, isAdmin, firstName, lastName, fromFacebook } = await req.json();
        const db = await connectToDatabase();
        
        // Check if user with the same email already exists
        const existingUser = await db.collection("Users").findOne({ email });

        if (existingUser) {
            return NextResponse.json({ success: false, message: 'User already exists' });
        }

        const newUser = {
            email,
            password_hash,
            isAdmin,
            firstName,
            lastName,
            fromFacebook,
            LastLogin: new Date(),
            RegisterDate: new Date()
        };

        // Insert new user into the database
        const result = await db.collection('Users').insertOne(newUser);
        return NextResponse.json({ success: true, userId: result.insertedId });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}

// Input Example:
// DELETE /api/admin_panel/users
// {
//     "userId": "667dcb312f4666fa50754115"
// }
export async function DELETE(req) {
    try {
        const { userId } = await req.json();
        const db = await connectToDatabase();
        const ObjectId = require('mongodb').ObjectId;
        
        // Delete user by userId
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

// GET /api/admin_panel/users
export async function GET(req) {
    try {
        const db = await connectToDatabase();
        const users = await db.collection('Users').find().toArray();
        return NextResponse.json({ success: true, users });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}

// Input Example:
// PUT /api/admin_panel/users
// {
//   "userId": "667dcb312f4666fa50754115",
//   "updatedFields": {
//     "email": "updatedadmin@admin.com",
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

        // If updating email, check if the new email already exists
        if (updatedFields.email) {
            const db = await connectToDatabase();
            const existingUser = await db.collection("Users").findOne({ email: updatedFields.email });

            if (existingUser && existingUser._id.toString() !== userId) {
                return NextResponse.json({ success: false, message: 'Email already in use' });
            }
        }

        const response = await updateUserById(userId, updatedFields);
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}

// Helper function to update user by userId
async function updateUserById(userId, updatedFields) {
    const db = await connectToDatabase();
    const ObjectId = require('mongodb').ObjectId;
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
