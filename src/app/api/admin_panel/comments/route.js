import { connectToDatabase } from '../../middleware/mongo';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

// show the newest written comments first (descending order)

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
        
    

        const comments = await db.collection('Comments').find().sort(SortIndex).toArray();


        return NextResponse.json({comments});
    } catch (error) {
        return NextResponse.json({ success : false, message: error.message });
    }
}



// DELETE/api/admin_panel/comments
// Purpose:
// Allow the admin/editor to delete a specific comment.
// Input Example:
// {
//     "userId": "66530ccdd001059ab08fb5af",
//     "commentId": "668489fe3936ccfdf31ddc2e"
// }

export async function DELETE(req) {
    try {
        const {userId, commentId } = await req.json();
        const db = await connectToDatabase();
        // Check if user is an admin or editor
        const requester = await db.collection('Users').findOne({_id: new ObjectId(userId)})
        if (requester) {
            if (requester.role !== "admin" && requester.role !== "editor") { 
                return NextResponse.json({ success: false, message: "Not authorized!" });
            }
        } else return NextResponse.json({ success: false, message: "Requester user not found" });

        const comment = await db.collection('Comments').findOne({_id: new ObjectId(commentId)});
        const commentTrail = comment.trailId;
        const result = await db.collection('Comments').deleteOne({ _id: new ObjectId(commentId) });
        db.collection('Trails').updateOne({_id: new ObjectId(commentTrail)}, {$inc: {"numComments": -1}});


        if (result.deletedCount > 0) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false, message: 'Message not found' });
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}