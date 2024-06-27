import { connectToDatabase } from '../../../middleware/mongo';
import { NextResponse } from 'next/server';

// input for example:
// {
//   "email": "admin@admin.com",
//   "password_hash": "admin_password",
//   "isAdmin": true,
//   "firstName": "admin",
//   "lastName": "admin",
//   "fromFacebook": false
// }
export async function POST(req) {
    const { email, password_hash, isAdmin, firstName, lastName, fromFacebook } = await req.json();
    const db = await connectToDatabase();
    const numOfUsersByEmail = await db.collection("Users").countDocuments( {email: email} );

    if (numOfUsersByEmail > 0) {
        return NextResponse.json({ error: 'User already exists' , status: 400});
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
    
    try {
        const result = await db.collection('Users').insertOne(newUser);
        return NextResponse.json({ success: true, userId: result.insertedId });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}
