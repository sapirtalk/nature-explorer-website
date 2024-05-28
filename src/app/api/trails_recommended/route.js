import { connectToDatabase } from '../middleware/mongo';
import { NextResponse } from 'next/server';


export async function GET(request ,params){
    const db = await connectToDatabase();
    let id = null;
    let count = null;


    if (params){
        const url = new URL(request.url);
        count = url.searchParams.get('count');
        id = url.searchParams.get('id');
    }
    
    // if id is provided, return the trail with that id
    if (id){
        console.log('id from GET trail req:', id);
        const trail = await db.collection('Trails').findOne({id});
        return NextResponse.json({ trail });
    }
    // if count is provided, return the first count trails
    if (count){
        console.log('count from GET trail req:', count);
        const trails = await db.collection('Trails').find({}).limit(parseInt(count)).toArray();
        return NextResponse.json({ trails });
    }

    // if no id or count is provided, return all trails
    console.log('no id or count from GET trail req , returning all trails');
    const trails = await db.collection('Trails').find({}).toArray();
    return NextResponse.json({ trails });
}

