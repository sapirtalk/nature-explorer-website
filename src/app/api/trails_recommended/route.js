import { connectToDatabase } from '../middleware/mongo';
import { NextResponse } from 'next/server';



// return the first 5 trails in the database
export async function GET(){
    const db = await connectToDatabase();
    
    const trails = await db.collection('Trails').find({}).limit(5).toArray();
    return NextResponse.json({ trails });
}

// gal was here
