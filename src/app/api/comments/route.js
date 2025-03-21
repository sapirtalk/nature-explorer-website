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
//     "trailId": "6684805b3936ccfdf31ddc26",
//     "textMessage": "וואו, מסלול יפהפה"
// }
export async function POST(req) {
    try {
        const {userId, title, trailId, textMessage , method} = await req.json();
        const db = await connectToDatabase();

        if (method == "GET") {
            const comments = await db.collection('Comments').find({trailId: trailId}).sort({createdAt: -1}).toArray();

            // for each comment, get the user's name from user id
            for (let i = 0; i < comments.length; i++) {
                const user = await db.collection('Users').findOne({_id: new ObjectId(comments[i].userId)});
                comments[i].userName = user.firstName + " " + user.lastName;
            }


            return NextResponse.json({success: true, comments: comments});
        }




        const newComment = {
            userId,
            title,
            trailId,
            textMessage,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        
        const result = await db.collection('Comments').insertOne(newComment);
        db.collection('Trails').updateOne({_id: new ObjectId(trailId)}, {$inc: {"numComments":1}})

        return NextResponse.json({ success: true, CommentId: result.insertedId});
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }

}


// DELETE/api/comments
// Purpose:
// Allow a user to delete his comment on a specific trail.
// Input Example:
// {
//     "userId": "66530ccdd001059ab08fb5af",
//     "commentId": "668487533936ccfdf31ddc2d"
// }
export async function DELETE(req) {
    try {
        const {userId, commentId } = await req.json();

        console.log('Form input', userId, commentId);

        const db = await connectToDatabase();
        // Users can't delete comments of other users.
        const requesterId = await db.collection('Users').findOne({_id: new ObjectId(userId)});
        const user = requesterId._id
        const comment = await db.collection('Comments').findOne({_id: new ObjectId(commentId)});
        const commentingUser = comment.userId
        if (user != commentingUser) {
            return NextResponse.json({success: false, message: 'You can not delete a comment that is not yours!'})
        }
        const commentTrail = comment.trailId
        const result = await db.collection('Comments').deleteOne({ _id: new ObjectId(commentId) });
        db.collection('Trails').updateOne({_id: new ObjectId(commentTrail)}, {$inc: {"numComments": -1}})


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