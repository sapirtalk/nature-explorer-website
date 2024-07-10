import { connectToDatabase } from '../../middleware/mongo';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import cloudinary from '../../../../utils/cloudinary';
import { parse } from 'path';

 
async function uploadImages(images) {
    const uploadResults = await Promise.all(images.map(async (image) => {
      try {
        const result = await cloudinary.uploader.upload(image, {
          upload_preset: 'ml_default',
        });
        return { image, url: result.secure_url, result: 'ok' };
      } catch (error) {
        return { image, error: error.message };
      }
    }));
    return uploadResults;
  }

  async function deleteImages(imageUrls) {
    const deleteResults = await Promise.all(imageUrls.map(async (url) => {
      try {
        // Extract the public ID from the URL
        const publicId = parse(url).name;
        const result = await cloudinary.uploader.destroy(publicId);
        return { url, result };
      } catch (error) {
        return { url, error: error.message };
      }
    }));
    return deleteResults;
  }

// POST /api/admin_panel/tours
// Purpose:
// allow admins and editors to add a new tour to the database
// Input Example:
// {
//     "requesterId": "667dcd842f4666fa50754116",
//     "title": "title",
//     "description": "description",
//     "tourTime": "2024-07-21 12:30:00",
//     "image": [
//     "<image 1: base64 encoded format>",
//     "<image 2: base64 encoded format>"
//      ]
// }
export async function POST(req) {
    try {
      const { requesterId, title, description, tourTime, image } = await req.json();
      const db = await connectToDatabase();
  
      // Check if requester is authorized
      const requester = await db.collection('Users').findOne({_id: new ObjectId(requesterId)})
      if (requester) {
          if (requester.role !== "admin" && requester.role !== "editor") { 
              return NextResponse.json({ success: false, message: "Not authorized!" });
          }
      } else return NextResponse.json({ success: false, message: "Requester user not found" });

      
      // Upload images to Cloudinary and get their URLs if images are provided
      let imageUrls = [];
      if (image && image.length > 0) {
        const uploadResults = await uploadImages(image);
        // Filter out successful uploads to get the URLs
        imageUrls = uploadResults.filter(result => result.result === 'ok').map(result => result.url);
      }

      const tour = {
        title,
        description,
        tourTime: new Date(tourTime),
        registeredUsers: {},
        registeredUsersCount: 0,
        isArchived: false,
        image: imageUrls,
        createdAt: new Date(),
        updatedAt: new Date()
      };
  
      const { insertedId } = await db.collection('Tours').insertOne(tour);
  
      return NextResponse.json({ success: true, tourId: insertedId });
    } catch (error) {
      console.error('Error creating tour:', error);
      return NextResponse.json({ success: false, message: 'Failed to create tour' });
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
//     "tourId": "668edf09055b669bc8fbfd20"
//     "updatedFields": {
//         "description": "updated_description"'
//         "tourTime": "2024-08-10 18:00:00",
//         "isArchived": false,
//         "newImages": [
//            "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD//gA7Q1JFQ..."
//         ],
//         "removeImages": [
//            "https://res.cloudinary.com/da2bhmbeg/image/upload/v1720205814/r5vmpz1yehsqnlyk1zu4.jpg"
//         ]
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
      
      // Find the existing tour
      const tour = await db.collection('Tours').findOne({ _id: new ObjectId(tourId) });
      if (!tour) {
          return NextResponse.json({ success: false, message: "Tour not found" });
      }
      
      if (updatedFields.registeredUsers) {
          return NextResponse.json({ success: false, message: 'Cannot modify the registered users list' }); 
      }

      if (updatedFields.tourTime) {
        updatedFields.tourTime = new Date(updatedFields.tourTime);
      }

      // Don't let modify 'image' field directly
      if (updatedFields.image) {
        return NextResponse.json({ success: false, message: "Cannot modify 'image' field directly! Send 'newImages' and 'removeImages' instead." })
      }

      const { newImages, removeImages, ...otherFields } = updatedFields;

      // Upload new images to Cloudinary and get their URLs if provided
      let uploadResults = [];
      if (newImages && newImages.length > 0) {
          uploadResults = await uploadImages(newImages);
      }

      // Filter out successful uploads to get the URLs
      const newImageUrls = uploadResults.filter(result => result.result === 'ok').map(result => result.url);

      // Remove specified images from the current images and delete from Cloudinary
      let currentImages = tour.image || [];
      let deleteResults = [];
      let invalidImages = [];

      if (removeImages && removeImages.length > 0) {
          const imagesToDelete = removeImages.filter(image => currentImages.includes(image));
          invalidImages = removeImages.filter(image => !currentImages.includes(image));
          currentImages = currentImages.filter(image => !imagesToDelete.includes(image));
          deleteResults = await deleteImages(imagesToDelete);
      }

      // Combine the existing images (after removal) with the new images
      const updatedImages = [...currentImages, ...newImageUrls];

      const updatedFieldsWithImages = {
          ...otherFields,
          image: updatedImages,
          updatedAt: new Date()
      };

      const response = await updateTourById(db, tourId, updatedFieldsWithImages);
      response.uploadResults = uploadResults;
      response.deleteResults = deleteResults;
      if (invalidImages.length > 0) {
          response.invalidImages = invalidImages;
          response.message = "Some images were not part of this tour and were not deleted from Cloudinary.";
      }
      return NextResponse.json(response);
  } catch (error) {
      console.error('Error updating tour:', error);
      return NextResponse.json({ success: false, message: 'Failed to update tour' });
  }
}

// Helper function to update tour by tourId
async function updateTourById(db, tourId, updatedFields) {
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
