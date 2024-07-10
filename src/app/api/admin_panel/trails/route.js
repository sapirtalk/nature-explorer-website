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

// POST /api/admin_panel/trails
// Purpose:
// allow admins and editors to add a new trail to the database
// Input Example:
// {
//     "requesterId": "667dcd842f4666fa50754116",
//     "name": "trail",
//     "difficulty": 2,
//     "location": "location",
//     "distance": 5,
//     "duration": 3,
//     "kidsFriendly": false,
//     "petsFriendly": true,
//     "babyStrollerFriendly": true,
//     "description": "description",
//     "image": [
//       "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD//gA7Q1JFQ...",
//       "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAeAB4AAD/2wBDAAIBA..."
//     ]
//   }
export async function POST(req) {
    try {
        const { requesterId, name, difficulty, location, distance, duration, kidsFriendly, petsFriendly, babyStrollerFriendly, description, image } = await req.json();
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

        const newTrail = {
            name,
            difficulty,
            location,
            distance,
            duration,
            kidsFriendly,
            petsFriendly,
            babyStrollerFriendly,
            description,
            image: imageUrls,
            ratings: {},
            averageRating: 0,
            totalRating: 0,
            ratingCount: 0,
            isArchived: false,
            numComments: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        
        const result = await db.collection('Trails').insertOne(newTrail);
        return NextResponse.json({ success: true, trailId: result.insertedId });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}

// DELETE /api/admin_panel/trails
// Purpose:
// Allow admins and editors to delete a trail from the database
// Input Example:
// {
//     "requesterId": "667dcd842f4666fa50754116",
//     "trailId": "667dc4272f4666fa50754112"
// }
export async function DELETE(req) {
    try {
        const { requesterId, trailId } = await req.json();
        const db = await connectToDatabase();

        // Check if requester is authorized
        const requester = await db.collection('Users').findOne({_id: new ObjectId(requesterId)})
        if (requester) {
            if (requester.role !== "admin" && requester.role !== "editor") { 
                return NextResponse.json({ success: false, message: "Not authorized!" });
            }
        } else return NextResponse.json({ success: false, message: "Requester user not found" });

        const trail = await db.collection('Trails').findOne({ _id: new ObjectId(trailId) });
        if (!trail) {
          return NextResponse.json({ success: false, message: 'Trail not found' });
        }
  
        deleteImages(trail.image)

        const result = await db.collection('Trails').deleteOne({ _id: new ObjectId(trailId) });

        if (result.deletedCount > 0) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false, message: 'Trail not found' });
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}


// GET /api/admin_panel/trails
// Purpose:
// Present to admins/editors the entire trails collection from the database,
// so they can modify/delete if needed
export async function GET(req) {
    try {
        const db = await connectToDatabase();
        const trails = await db.collection('Trails').find().toArray();
        return NextResponse.json({ success: true, trails });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}

// PUT /api/admin_panel/trails
// Purpose:
// Allow admins/editors to modify a trail (change its name, add to archive etc.) 
// Input Example:
// {
//     "requesterId": "667dcd842f4666fa50754116",
//     "trailId": "667dc4272f4666fa50754112",
//     "updatedFields": {
//         "name": "updated_trail",
//         "difficulty": 3,
//         "location": "updated_location",
//         "distance": 6,
//         "duration": 4,
//         "kidsFriendly": false,
//         "petsFriendly": false,
//         "babyStrollerFriendly": false,
//         "description": "updated_description",
//         "newImages": [
//           "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD//gA7Q1JFQ..."
//          ],
//         "removeImages": [
//           "https://res.cloudinary.com/da2bhmbeg/image/upload/v1720205814/r5vmpz1yehsqnlyk1zu4.jpg"
//          ]
//     }
// }
export async function PUT(req) {
    try {
        const { requesterId, trailId, updatedFields } = await req.json();
        const db = await connectToDatabase();

        // Check if requester is authorized
        const requester = await db.collection('Users').findOne({_id: new ObjectId(requesterId)});
        if (requester) {
            if (requester.role !== "admin" && requester.role !== "editor") { 
                return NextResponse.json({ success: false, message: "Not authorized!" });
            }
        } else return NextResponse.json({ success: false, message: "Requester user not found" });

        // Find the existing trail
        const trail = await db.collection('Trails').findOne({ _id: new ObjectId(trailId) });
        if (!trail) {
            return NextResponse.json({ success: false, message: "Trail not found" });
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
        let currentImages = trail.image || [];
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

        const response = await updateTrailById(db, trailId, updatedFieldsWithImages);
        response.uploadResults = uploadResults;
        response.deleteResults = deleteResults;
        if (invalidImages.length > 0) {
            response.invalidImages = invalidImages;
            response.message = "Some images were not part of this trail and were not deleted from Cloudinary.";
        }
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}

// Helper function to update trail by trailId
async function updateTrailById(db, trailId, updatedFields) {
    try {
        const result = await db.collection('Trails').updateOne(
            { _id: new ObjectId(trailId) },
            { $set: updatedFields }
        );

        if (result.matchedCount > 0) {
            return { success: true };
        } else {
            return { success: false, message: 'Trail not found' };
        }
    } catch (error) {
        return { success: false, message: error.message };
    }
}