import { connectToDatabase } from '../../../middleware/mongo';
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        const db = await connectToDatabase();
        const users = await db.collection('Users').find().toArray();
        return NextResponse.json({ success: true, users });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}