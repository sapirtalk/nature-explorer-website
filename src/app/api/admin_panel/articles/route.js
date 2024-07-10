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

// POST /api/admin_panel/articles
// Purpose:
// allow admins and editors to add a new article to the database
// Input Example:
// {
//     "requesterId": "667dcd842f4666fa50754116",
//     "source": "ynet",
//     "title": "title",
//     "url": "https://ynet.co.il/article",
//     "writtenAt": "2020-01-01",
//     "image": [
//     "<image 1: base64 encoded format>",
//     "<image 2: base64 encoded format>"
//      ]
// }
export async function POST(req) {
    try {
      const { requesterId, source, title, url, writtenAt, image } = await req.json();
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

      const article = {
        source,
        title,
        url,
        writtenAt: new Date(writtenAt),
        isArchived: false,
        image: imageUrls,
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
//     "writtenAt": "2022-02-02",
//     "newImages": [
//       "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD//gA7Q1JFQ..."
//     ],
//     "removeImages": [
//       "https://res.cloudinary.com/da2bhmbeg/image/upload/v1720205814/r5vmpz1yehsqnlyk1zu4.jpg"
//     ]
//      "title": "updated_title"
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

        // Find the existing article
        const article = await db.collection('Articles').findOne({ _id: new ObjectId(articleId) });
        if (!article) {
            return NextResponse.json({ success: false, message: "Article not found" });
        }

        if (updatedFields.writtenAt) {
            updatedFields.writtenAt = new Date(updatedFields.writtenAt);
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
      let currentImages = article.image || [];
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

      const response = await updateArticleById(db, articleId, updatedFieldsWithImages);
      response.uploadResults = uploadResults;
      response.deleteResults = deleteResults;
      if (invalidImages.length > 0) {
          response.invalidImages = invalidImages;
          response.message = "Some images were not part of this article and were not deleted from Cloudinary.";
      }
        return NextResponse.json(response);
    } catch (error) {
        console.error('Error updating article:', error);
        return NextResponse.json({ success: false, message: 'Failed to update article' });
    }
}

// Helper function to update article by articleId
async function updateArticleById(db, articleId, updatedFields) {
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
