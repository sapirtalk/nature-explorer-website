import { connectToDatabase } from '../middleware/mongo';
import { NextResponse } from 'next/server';


// POST/api/comments
// Purpose:
// Allow a user to add a comment on a specific trail.
// Input Example:
// {
//     "UserId": "66530ccdd001059ab08fb5af",
//     "Title": "חוות דעת על אמא שלך",
//     "TrailId": "66530ccdd001059ab08fb5aa",
//     "Text_message": "וואו, מסלול יפהפה"
// }
export async function POST(req) {
    try {
        const {UserId, Title, TrailId, Text_message} = await req.json();
        const db = await connectToDatabase();

        const newComment = {
            UserId,
            Title,
            Text_message,
            TrailId,
            Date_creation: new Date()
        };
        
        const result = await db.collection('Comments').insertOne(newComment);
        return NextResponse.json({ success: true, CommentId: result.insertedId });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}