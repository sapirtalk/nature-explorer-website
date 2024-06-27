import { connectToDatabase } from '../../../middleware/mongo';
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        const db = await connectToDatabase();
        const trails = await db.collection('Trails').find().toArray();
        return NextResponse.json({ success: true, trails });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}