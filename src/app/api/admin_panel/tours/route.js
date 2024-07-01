import { connectToDatabase } from '../../middleware/mongo';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

// POST /api/admin_panel/tours
// Purpose:
// allow admins and editors to add a new tour to the database
// Input Example:
// {
//     "requesterId": "667dcd842f4666fa50754116",
//     "title": "title",
//     "description": "description"
// }
export async function POST(req) {
    try {
      const { requesterId, title, description } = await req.json();
      const db = await connectToDatabase();
  
      // Check if requester is authorized
      const requester = await db.collection('Users').findOne({_id: new ObjectId(requesterId)})
      if (requester) {
          if (requester.role !== "admin" && requester.role !== "editor") { 
              return NextResponse.json({ success: false, message: "Not authorized!" });
          }
      } else return NextResponse.json({ success: false, message: "Requester user not found" });



      const tour = {
        title,
        description,
        registeredUsers: {},
        registeredUsersCount: 0,
        isArchived: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };
  
      const { insertedId } = await db.collection('Tours').insertOne(tour);
  
      return NextResponse.json({ success: true, tourId: insertedId });
    } catch (error) {
      console.error('Error creating article:', error);
      return NextResponse.json({ success: false, message: 'Failed to create article' });
    }
  }

// DELETE /api/admin_panel/tours
// Purpose:
// Allow admins and editors to delete a tour from the database
// Input Example:
// {
//     "requesterId": "667dcd842f4666fa50754116",
//     "articleId": "667dba5a2f4666fa50754110"
// }
export async function DELETE(req) {
    try {
      const { requesterId, tourId } = await req.json();
      const db = await connectToDatabase();

      // Check if requester is authorized
      const requester = await db.collection('Users').findOne({_id: new ObjectId(requesterId)})
      if (requester) {
          if (requester.role !== "admin" && requester.role !== "editor") { 
              return NextResponse.json({ success: false, message: "Not authorized!" });
          }
      } else return NextResponse.json({ success: false, message: "Requester user not found" });
  
      const result = await db.collection('Tours').deleteOne({ _id: new ObjectId(tourId) });
  
      if (result.deletedCount > 0) {
        return NextResponse.json({ success: true });
      } else {
        return NextResponse.json({ success: false, message: 'Tour not found' });
      }
    } catch (error) {
      console.error('Error deleting article:', error);
      return NextResponse.json({ success: false, message: 'Failed to delete tour' });
    }
  }
  

// GET /api/admin_panel/tours
// Purpose:
// Present to admins/editors the entire tours collection from the database,
// so they can modify/delete if needed
export async function GET(req) {
    try {
      const db = await connectToDatabase();
      const articles = await db.collection('Tours').find({}).toArray();
  
      return NextResponse.json({ success: true, articles });
    } catch (error) {
      console.error('Error retrieving tours:', error);
      return NextResponse.json({ success: false, message: 'Failed to retrieve tours' });
    }
  }

// PUT /api/admin_panel/tours
// Purpose:
// Allow admins/editors to modify a tour (change the description, add to archive etc.) 
// Input Example:
// {
//     "requesterId": "667dcd842f4666fa50754116",
//     "updatedFields": {
//         "description": "updated_description"
//         "isArchived": false
//     }
// }
export async function PUT(req) {
    try {
        const { requesterId, tourId, updatedFields } = await req.json();
        const db = await connectToDatabase(); 

        // Check if requester is authorized
        const requester = await db.collection('Users').findOne({_id: new ObjectId(requesterId)})
        if (requester) {
            if (requester.role !== "admin" && requester.role !== "editor") { 
                return NextResponse.json({ success: false, message: "Not authorized!" });
            }
        } else return NextResponse.json({ success: false, message: "Requester user not found" });
        
        if (updatedFields.registeredUsers) {
            return NextResponse.json({ success: false, message: 'Cannot modify the registered users list' }); 
        }

        const response = await updateArticleById(db, tourId, updatedFields);
        return NextResponse.json(response);
    } catch (error) {
        console.error('Error updating tour:', error);
        return NextResponse.json({ success: false, message: 'Failed to update tour' });
    }
}

// Helper function to update article by tourId
async function updateArticleById(db, tourId, updatedFields) {
    updatedFields.updatedAt = new Date();
    try {
        const result = await db.collection('Tours').updateOne(
            { _id: new ObjectId(tourId) },
            { $set: updatedFields }
        );

        if (result.matchedCount > 0) {
            return { success: true };
        } else {
            return { success: false, message: 'Tour not found' };
        }
    } catch (error) {
        return { success: false, message: error.message };
    }
}
