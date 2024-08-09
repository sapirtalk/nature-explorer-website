import { connectToDatabase } from '../../middleware/mongo';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

// DELETE /api/admin_panel/users
// Purpose:
// Allow admins to delete a user from the database
// Input Example:
// {
//     "requesterId": "667dcd842f4666fa50754116"
//     "userId": "667dcb312f4666fa50754115"
// }
export async function DELETE(req) {
    try {
        const { requesterId, userId } = await req.json();
        const db = await connectToDatabase();

        // Check if requester is authorized
        const requester = await db.collection('Users').findOne({_id: new ObjectId(requesterId)})
        if (requester) {
            if (requester.role !== "admin") { 
                return NextResponse.json({ success: false, message: "Not authorized!" });
            }
        } else return NextResponse.json({ success: false, message: "Requester user not found" });
        
        // Check if the user intended to be deleted is not an admin
        const user = await db.collection('Users').findOne({_id: new ObjectId(userId)})
        if (user) {
            if (user.role == "admin") { 
                return NextResponse.json({ success: false, message: "Admins cannot be deleted by other admins!" });
            }
        } else return NextResponse.json({ success: false, message: "User not found" });
        
        // Delete user by 
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
// Purpose:
// Present to admins the entire users collection from the database,
// so they can modify/delete if needed
export async function GET(req) {
    try {
        const db = await connectToDatabase();
        
        // Specify the fields you want to include
        const projection = {
            firstName: 1,
            lastName: 1,
            email: 1,
            role: 1,
            fromFacebook: 1,
            registeredTours: 1,
            favoriteTrails: 1,
            LastLogin: 1,
            RegisterDate: 1
        };

        const users = await db.collection('Users').find({}, { projection }).toArray();
        return NextResponse.json({ success: true, users });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}

// PUT /api/admin_panel/users
// Purpose:
// Allow admins to modify a user (maybe should be restricted to a role change only)
// Input Example:
// {
//   "userId": "667dcb312f4666fa50754115",
//   "updatedFields": {
//     "email": "updatedadmin@admin.com",
//     "isAdmin": true,
//     "firstName": "גל",
//     "lastName": "תמר",
//     "fromFacebook": true
//   }
// }
export async function PUT(req) {
    try {
        const { requesterId, userId, updatedFields } = await req.json();
        const db = await connectToDatabase();

        // Check if requester is authorized
        const requester = await db.collection('Users').findOne({_id: new ObjectId(requesterId)})
        if (requester) {
            if (requester.role !== "admin") { 
                return NextResponse.json({ success: false, message: "Not authorized!" });
            }
        } else return NextResponse.json({ success: false, message: "Requester user not found" });

        // Check if the user intended to be modified is not an admin
        const user = await db.collection('Users').findOne({_id: new ObjectId(userId)})
        if (user) {
            if (user.role == "admin") { 
                return NextResponse.json({ success: false, message: "Admins cannot be modified by other admins!" });
            }
        } else return NextResponse.json({ success: false, message: "User not found" });

        // If updating email, check if the new email already exists
        if (updatedFields.email) {
            const existingUser = await db.collection("Users").findOne({ email: updatedFields.email });
            if (existingUser && existingUser._id.toString() !== userId) {
                return NextResponse.json({ success: false, message: 'Email already in use' });
            }
        }

        // // don't allow to edit passwords
        // if (updatedFields.password_hash) {
        //     return NextResponse.json({ success: false, message: 'passwords of other users cannot be modified' });
        // }

        const response = await updateUserById(userId, updatedFields);
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}

// Helper function to update user by userId
async function updateUserById(userId, updatedFields) {
    const db = await connectToDatabase();
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

