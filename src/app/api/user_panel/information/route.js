import { connectToDatabase } from '../../middleware/mongo';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

// POST /api/user_panel/information
// Purpose:
// Present the user his information in the system.
// Input Example:
// {
// "userId": "667dcb312f4666fa50754115" 
// }
export async function POST(req) {
    try {
        const { userId } = await req.json();
        const db = await connectToDatabase();

        const user = await db.collection('Users').findOne(
            { _id: new ObjectId(userId) },
            { projection: { firstName: 1, lastName: 1, email: 1, role: 1, fromFacebook: 1} }
        );

        if (user) {
            return NextResponse.json({ success: true, information: user });
        } else {
            return NextResponse.json({ success: false, message: "User not found" });
        }

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}

// PUT /api/user_panel/information
// Purpose:
// Allow users to modify their info
// Input Example:
// {
//     "userId": "667dcd842f4666fa50754116",
//     "updatedFields": {
//     "email": "myemail@gmail.com"
//     }
// }
export async function PUT(req) {
    try {
        const { userId, old_password , updatedFields } = await req.json();
        const db = await connectToDatabase();



        // Check if the user's password is correct
        const user_check = await db.collection('Users').findOne({ _id: new ObjectId(userId) });
        if (!user_check) {
            return NextResponse.json({ success: false, message: 'User not found' });
        }
        if (user_check.password_hash !== old_password) {
            return NextResponse.json({ success: false, message: 'Incorrect password' });

        }

        // Define allowed fields for update
        const allowedFields = ['firstName', 'lastName', 'email', 'password_hash', 'fromFacebook'];

        // Filter the fields to only include allowed ones
        const filteredUpdates = {};
        for (const key in updatedFields) {
            if (allowedFields.includes(key)) {
                filteredUpdates[key] = updatedFields[key];
            }
        }

        if (Object.keys(filteredUpdates).length === 0) {
            return NextResponse.json({ success: false, message: 'No valid fields to update.' });
        }

        // If updating email, check if the new email already exists
        if (updatedFields.email) {
            const existingUser = await db.collection("Users").findOne({ email: updatedFields.email });
            if (existingUser && existingUser._id.toString() !== userId) {
                return NextResponse.json({ success: false, message: 'Email already in use' });
            }
        }

        const result = await db.collection('Users').updateOne(
            { _id: new ObjectId(userId) },
            { $set: filteredUpdates }
        );

        if (result.matchedCount > 0) {
            // get the updated user
            const user = await db.collection('Users').findOne({ _id: new ObjectId(userId) });
            return NextResponse.json({ success: true, message: 'User details updated successfully.' , updatedUser: user });
        } else {
            return NextResponse.json({ success: false, message: 'User not found.' , updatedUser: null });
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}



// DELETE /api/user_panel/information
// Purpose:
// Allow users to delete their account
// Input Example:
// {
//     "userId": "667dcd842f4666fa50754116"
// }
export async function DELETE(req) {
    try {
        const { userId , password_hash } = await req.json();
        const db = await connectToDatabase();
        const result = await db.collection('Users').deleteOne({ _id: new ObjectId(userId) , password_hash: password_hash });
        if (result.deletedCount > 0) {
            return NextResponse.json({ success: true, message: 'User deleted successfully.' });
        } else {
            return NextResponse.json({ success: false, message: 'User not found.' });
        }    
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}