import { connectToDatabase } from '../middleware/mongo';
import { NextResponse } from 'next/server';


// request body example:
// {
//     filterReq: {
//         difficulty: [1,3],
//         kids: true,
//         pets: true,
//         length: [0, 10],
//         duration: [0, 10],
//         name: 'trail',
//         babyStroller: true
//     },
//     SortReq: {
//         by: 'distance',
//         order: 'asc'
//     }
// }




export async function POST(req) {
    
    const {filterReq , SortReq} = await req.json();
    const db = await connectToDatabase();


    const SortIndex = SortReq ? { [SortReq.by]: SortReq.order === 'asc' ? 1 : -1 } : { name: 1 };

    const query = MakeQuery(filterReq); 
    
   

    const trails = await db.collection('Trails').find(query).sort(SortIndex).toArray();


    return NextResponse.json({ trails });
}








// this function is used to create a query object for the mongoDB find method
const MakeQuery = (filterReq) => {

    var filterArr = [];

    if (filterReq) {
        if (filterReq.difficulty) filterArr.push({ difficulty: { $in: filterReq.difficulty } });
        if (filterReq.distance) filterArr.push({ distance: { $gte: filterReq.distance[0], $lte: filterReq.distance[1] } });
        if (filterReq.duration) filterArr.push({ duration: { $gte: filterReq.duration[0], $lte: filterReq.duration[1] } });
        if (filterReq.kids) filterArr.push({ kidsFriendly: { $eq: filterReq.kids } });
        if (filterReq.pets) filterArr.push({ petsFriendly: { $eq: filterReq.pets } });
        if (filterReq.babyStroller) filterArr.push({ babyStrollerFriendly: { $eq: filterReq.babyStroller } });
        if (filterReq.name) filterArr.push({ name: { $regex: filterReq.name, $options: 'i' } });
    }

    return filterArr.length > 0 ? { $and: filterArr } : {};

}