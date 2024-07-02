import { connectToDatabase } from '../middleware/mongo';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';


// POST/api/comments
// Purpose:
// Allow a user to add a comment on a specific trail.
// Input Example:
// {
//     "userId": "66530ccdd001059ab08fb5af",
//     "title": "חוות דעת על מסלול הצבעים",
//     "trailId": "66530ccdd001059ab08fb5aa",
//     "textMessage": "וואו, מסלול יפהפה"
// }
export async function POST(req) {
    try {
        const {userId, title, trailId, textMessage} = await req.json();
        const db = await connectToDatabase();

        const newComment = {
            userId,
            title,
            trailId,
            textMessage,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        
        const result = await db.collection('Comments').insertOne(newComment);
        return NextResponse.json({ success: true, CommentId: result.insertedId });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}


// POST/api/comments
// Purpose:
// Allow a user to delete his comment on a specific trail.
// Input Example:
// {
//     "userId": "66530ccdd001059ab08fb5af",
//     "commentId": "6683059cc59137738ba0847f"
// }
export async function DELETE(req) {
    try {
        const {userId, commentId } = await req.json();
        const db = await connectToDatabase();
        // Users can't delete comments of other users.
        const requesterId = await db.collection('Users').findOne({_id: new ObjectId(userId)});
        const user = requesterId._id
        const comment = await db.collection('Comments').findOne({_id: new ObjectId(commentId)});
        const commentingUser = comment.userId
        if (user != commentingUser) {
            return NextResponse.json({success: false, message: 'You can not delete a comment that is not yours!'})
        }

        const result = await db.collection('Comments').deleteOne({ _id: new ObjectId(commentId) });


        if (result.deletedCount > 0) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false, message: 'Message not found' });
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}


// PUT/api/comments
// Purpose:
// Allow users to edit their comment on a specific trail.
// Input Example:
// {
//     "userId": "66530ccdd001059ab08fb5ad",
//     "commentId": "6682e2db1a730a504152f353",
//     "updatedFields": {
//         "title": "איך מחליטים איזה מסלול הכי מתאים",
//         "textMessage": "אני לא יודעת האם לטייל במסלול הזה או לא"
//     }
// }
export async function PUT(req) {
    try {
        const { userId, commentId, updatedFields } = await req.json();
        const db = await connectToDatabase();

        // Users can't edit comments of other users.
        const requesterId = await db.collection('Users').findOne({_id: new ObjectId(userId)});
        const user = requesterId._id
        const comment = await db.collection('Comments').findOne({_id: new ObjectId(commentId)});
        const commentingUser = comment.userId
        if (user != commentingUser) {
            return NextResponse.json({success: false, message: 'You can not edit a comment that is not yours!'})
        }
        const response = await updateCommentById(db, commentId, updatedFields);
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}

// Helper function to edit comment by commentId
async function updateCommentById(db, commentId, updatedFields) {
    updatedFields.updatedAt = new Date();
    try {
        const result = await db.collection('Comments').updateOne(
            { _id: new ObjectId(commentId) },
            { $set: updatedFields }
        );

        if (result.matchedCount > 0) {
            return { success: true };
        } else {
            return { success: false, message: 'Message not found' };
        }
    } catch (error) {
        return { success: false, message: error.message };
    }
}