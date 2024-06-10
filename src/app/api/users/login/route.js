//checking login credentials and returning user details

import { connectToDatabase } from '@/app/api/middleware/mongo';
import { NextResponse } from 'next/server';


export async function POST(req) {
    const { email, password} = await req.json();
    const db = await connectToDatabase();
    const user = await db.collection('Users').find({email: email}).toArray();

    

    if (user.length === 0) {
        return NextResponse.json({ error: 'User not found' });
    }

    if (user[0].password_hash !== password.toString()) {
        console.log('Invalid password' , user.password_hash, password);
        return NextResponse.json({ error: 'Invalid password' });
    }

    // update last login date
    await db.collection('Users').updateOne({email: email}, { $set: { LastLogin: new Date() } });

    const userDetails = { email: user[0].email, firstName: user[0].firstName, lastName: user[0].lastName , id: user[0]._id , isAdmin: user[0].isAdmin};

    return NextResponse.json({ user: userDetails});
}
