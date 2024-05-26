import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../middleware/mongo';
import { NextResponse } from 'next/server';



export async function GET(){
    const db = await connectToDatabase();
    const news = await db.collection('AdminNews').find({}).toArray();
    return NextResponse.json({ news });
}