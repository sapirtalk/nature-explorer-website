import { connectToDatabase } from '../../middleware/mongo';
import { NextResponse } from 'next/server';

// Input Example:
// POST /api/admin_panel/articles
// {
//     "title": "title",
//     "text": "text",
//     "writtenAt": "2020-01-01",
//     "image": []
// }
export async function POST(req) {
    try {
      const { title, text, writtenAt, image } = await req.json();
      const db = await connectToDatabase();
  
      const article = {
        title,
        text,
        writtenAt: new Date(writtenAt),
        isArchive: false,
        image,
        createdAt: new Date(),
        updatedAt: new Date()
      };
  
      const { insertedId } = await db.collection('Articles').insertOne(article);
  
      return NextResponse.json({ success: true, articleId: insertedId });
    } catch (error) {
      console.error('Error creating article:', error);
      return NextResponse.json({ success: false, message: 'Failed to create article' });
    }
  }

// Input Example:
// DELETE /api/admin_panel/articles
// {
//     "articleId": "667dba5a2f4666fa50754110"
// }
export async function DELETE(req) {
    try {
      const { articleId } = await req.json();
      const db = await connectToDatabase();
      const ObjectId = require('mongodb').ObjectId;
  
      const result = await db.collection('Articles').deleteOne({ _id: new ObjectId(articleId) });
  
      if (result.deletedCount > 0) {
        return NextResponse.json({ success: true });
      } else {
        return NextResponse.json({ success: false, message: 'Article not found' });
      }
    } catch (error) {
      console.error('Error deleting article:', error);
      return NextResponse.json({ success: false, message: 'Failed to delete article' });
    }
  }
  
export async function GET(req) {
    try {
      const db = await connectToDatabase();
      const articles = await db.collection('Articles').find({}).toArray();
  
      return NextResponse.json({ success: true, articles });
    } catch (error) {
      console.error('Error retrieving articles:', error);
      return NextResponse.json({ success: false, message: 'Failed to retrieve articles' });
    }
  }

// Input Example:
// PUT /api/admin_panel/articles
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
        console.error('Error updating article:', error);
        return NextResponse.json({ success: false, message: 'Failed to update article' });
    }
}

// Helper function to update article by articleId
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
