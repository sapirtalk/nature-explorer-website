import { connectToDatabase } from '../../../middleware/mongo';
import { NextResponse } from 'next/server';

// Example route handler for adding an article
export async function POST(req) {
    const db = await connectToDatabase();

    const { title, text, writtenAt, isArchived, image } = await req.json();


    // Create article object
    const article = {
        title,
        text,
        writtenAt: new Date(writtenAt),
        isArchived,
        image,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    // Add article to database
    const articleId = await db.collection('Articles').insertOne(article);

    // Return response indicating success or failure
    return NextResponse.json({ success: true, articleId });
}
