// IMPLEMENT
// just query the articles from the database by their writtenAt field
// show the newest written articles first (descending order)


import { connectToDatabase } from '../middleware/mongo';
import { NextResponse } from 'next/server';


// request body example:
// {
//     SortReq: {
//         by: 'writtenAt',
//         order: 'dsc'
//     }
// }




export async function POST(req) {
    try {
    
        const {SortReq} = await req.json();
        const db = await connectToDatabase();


        const SortIndex = SortReq ? { [SortReq.by]: SortReq.order === 'dsc' ? -1 : 1 } : { writtenAt: -1 };
        
    

        const articles = await db.collection('Articles').find().sort(SortIndex).toArray();


        return NextResponse.json({ articles });
    } catch (error) {
        console.error('Error fetching articles:', error);
        return NextResponse.error({ statusCode: 500, message: 'Failed to fetch articles' });
    }
}