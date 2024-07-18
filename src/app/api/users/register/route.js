import { connectToDatabase } from '@/app/api/middleware/mongo';
import Register from '@/components/register_comp/Register';
import { NextResponse } from 'next/server';

// register user
export async function POST(req) {
    const { email, password , firstName , lastName , fromFacebook} = await req.json();
    const db = await connectToDatabase();
    const user = await db.collection('Users').find({email: email}).toArray();

    if (user.length > 0) {
        return NextResponse.json({ error: 'User already exists' , status: 400});
    }

    const newUser = {
        email: email,
        password_hash: password,
        role: 'user',
        firstName: firstName,
        lastName: lastName,
        fromFacebook: fromFacebook,
        LastLogin: new Date(),
        RegisterDate: new Date(),
        registeredTours: {},
        favoriteTrails: []
    };

    try{
        await db.collection('Users').insertOne(newUser);
    }
    catch(err){
        return NextResponse.json({ error: 'Error registering user' , status: 500});
    }

    return NextResponse.json({ message: 'User registered successfully' , status: 200 });
}
