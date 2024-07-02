// show the newest published tours first (descending order)


import { connectToDatabase } from '../middleware/mongo';
import { NextResponse } from 'next/server';


// request body example:
// {
//     "SortReq": {
//         "by": "updatedAt",
//         "order": "dsc"
//     }
// }



export async function POST(req) {
    try {
    
        const {SortReq} = await req.json();
        const db = await connectToDatabase();


        const SortIndex = SortReq ? { [SortReq.by]: SortReq.order === 'dsc' ? -1 : 1 } : { writtenAt: -1 };

        const tours = await db.collection('Tours').find().sort(SortIndex).toArray();


        return NextResponse.json({tours});
    } catch (error) {
        return NextResponse.json({ success : false, message: error.message });
    }
}