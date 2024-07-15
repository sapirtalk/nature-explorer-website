import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../middleware/mongo';
import { NextResponse } from 'next/server';



export async function GET(){
    const db = await connectToDatabase();
    const tours = await db.collection('Tours').find({}).toArray();
    return NextResponse.json({ tours });
}