import { connectToDatabase } from '../middleware/mongo';
import { NextResponse } from 'next/server';


export async function GET(){
    const db = await connectToDatabase();
    // get the 5 most latest trails for now
    const trails = await db.collection('Trails').find({}).limit(5).toArray();
    return NextResponse.json({ trails });
}

