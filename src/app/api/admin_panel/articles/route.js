import { connectToDatabase } from '../../middleware/mongo';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

// POST /api/admin_panel/articles
// Purpose:
// allow admins and editors to add a new article to the database
// Input Example:
// {
//     "requesterId": "667dcd842f4666fa50754116",
//     "title": "title",
//     "text": "text",
//     "writtenAt": "2020-01-01",
//     "image": []
// }
export async function POST(req) {
    try {
      const { requesterId, title, text, writtenAt, image } = await req.json();
      const db = await connectToDatabase();
  
      // Check if requester is authorized
      const requester = await db.collection('Users').findOne({_id: new ObjectId(requesterId)})
      if (requester) {
          if (requester.role !== "admin" && requester.role !== "editor") { 
              return NextResponse.json({ success: false, message: "Not authorized!" });
          }
      } else return NextResponse.json({ success: false, message: "Requester user not found" });

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

// DELETE /api/admin_panel/articles
// Purpose:
// Allow admins and editors to delete an article from the database
// Input Example:
// {
//     "requesterId": "667dcd842f4666fa50754116",
//     "articleId": "667dba5a2f4666fa50754110"
// }
export async function DELETE(req) {
    try {
      const { requesterId, articleId } = await req.json();
      const db = await connectToDatabase();

      // Check if requester is authorized
      const requester = await db.collection('Users').findOne({_id: new ObjectId(requesterId)})
      if (requester) {
          if (requester.role !== "admin" && requester.role !== "editor") { 
              return NextResponse.json({ success: false, message: "Not authorized!" });
          }
      } else return NextResponse.json({ success: false, message: "Requester user not found" });
  
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
  

// GET /api/admin_panel/trails
// Purpose:
// Present to admins/editors the entire articles collection from the database,
// so they can modify/delete if needed
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

// PUT /api/admin_panel/articles
// Purpose:
// Allow admins/editors to modify an article (change the title, add to archive etc.) 
// Input Example:
// {
//     "requesterId": "667dcd842f4666fa50754116",
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
        const { requesterId, articleId, updatedFields } = await req.json();
        const db = await connectToDatabase(); 

        // Check if requester is authorized
        const requester = await db.collection('Users').findOne({_id: new ObjectId(requesterId)})
        if (requester) {
            if (requester.role !== "admin" && requester.role !== "editor") { 
                return NextResponse.json({ success: false, message: "Not authorized!" });
            }
        } else return NextResponse.json({ success: false, message: "Requester user not found" });

        if (updatedFields.writtenAt) {
            updatedFields.writtenAt = new Date(updatedFields.writtenAt);
        }

        const response = await updateArticleById(db, ObjectId, articleId, updatedFields);
        return NextResponse.json(response);
    } catch (error) {
        console.error('Error updating article:', error);
        return NextResponse.json({ success: false, message: 'Failed to update article' });
    }
}

// Helper function to update article by articleId
async function updateArticleById(db, ObjectId, articleId, updatedFields) {
    updatedFields.updatedAt = new Date();
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
