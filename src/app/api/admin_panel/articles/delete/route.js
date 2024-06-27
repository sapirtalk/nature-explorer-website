import { connectToDatabase } from '../../../middleware/mongo';
import { NextResponse } from 'next/server';

// input for example:
// {
//     "articleId": "667dba5a2f4666fa50754110"
// }

export async function DELETE(req) {
    try {
        const { articleId } = await req.json();
        const response = await deleteArticleById(articleId);
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}

async function deleteArticleById(articleId) {
    const db = await connectToDatabase();
    var ObjectId = require('mongodb').ObjectId;
    try {
        const result = await db.collection('Articles').deleteOne(
            { _id: new ObjectId(articleId) }
        );

        if (result.deletedCount > 0) {
            return { success: true };
        } else {
            return { success: false, message: 'Article not found' };
        }
    } catch (error) {
        return { success: false, message: error.message };
    }
}