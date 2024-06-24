import { connectToDatabase } from '../middleware/mongo';
import { NextResponse } from 'next/server';


<<<<<<< HEAD


export async function GET() {
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
=======
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
        if (filterReq.length) filterArr.push({ distance: { $gte: filterReq.length[0], $lte: filterReq.length[1] } });
        if (filterReq.duration) filterArr.push({ duration: { $gte: filterReq.duration[0], $lte: filterReq.duration[1] } });
        if (filterReq.kids) filterArr.push({ kidsFriendly: { $eq: filterReq.kids } });
        if (filterReq.pets) filterArr.push({ petsFriendly: { $eq: filterReq.pets } });
        if (filterReq.babyStroller) filterArr.push({ babyStrollerFriendly: { $eq: filterReq.babyStroller } });
        if (filterReq.name) filterArr.push({ name: { $regex: filterReq.name, $options: 'i' } });
    }

    return filterArr.length > 0 ? { $and: filterArr } : {};

}
>>>>>>> 2d4034136f000d9ac6a34a972e90dde2f510735d
