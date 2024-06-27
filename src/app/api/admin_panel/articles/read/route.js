import { connectToDatabase } from '../../../middleware/mongo';
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        const db = await connectToDatabase();
        const articles = await db.collection('Articles').find({}).toArray();
        return NextResponse.json({ success: true, articles });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}