import { connectToDatabase } from '../../../middleware/mongo';
import { NextResponse } from 'next/server';

// input for example:
// {
//     "articleId": "667dba5a2f4666fa50754110",
//     "updatedFields": {
//         "writtenAt": "2022-02-02",
//         "image": ["1", "2"],
//         "text": "updated_text",
//         "title": "updated_title"
//     }
// }

export async function PUT(req) {
    try {
        const { articleId, updatedFields } = await req.json();

        if (updatedFields.writtenAt) {
            updatedFields.writtenAt = new Date(updatedFields.writtenAt);
        }

        const response = await updateArticleById(articleId, updatedFields);
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}

async function updateArticleById(articleId, updatedFields) {
    const db = await connectToDatabase();
    updatedFields.updatedAt = new Date();
    var ObjectId = require('mongodb').ObjectId;
    try {
        const result = await db.collection('Articles').updateOne(
            { _id: new ObjectId(articleId) },
            { $set: updatedFields }
        );

        if (result.matchedCount > 0) {
            return { success: true };
        } else {
            return { success: false, message: 'Article not found' };
        }
    } catch (error) {
        return { success: false, message: error.message };
    }
}