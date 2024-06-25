import { connectToDatabase } from '../../middleware/mongo';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const { includeArchived } = await req.json();

    const db = await connectToDatabase();

    var archiveFilter = {}

    if (!includeArchived){
        archiveFilter = { is_archived: false }
    }

    const numOfUsers = await db.collection("Users").countDocuments();
    const numOfTrails = await db.collection("Trails").countDocuments();
    const numOfArticles = await db.collection("Articles").countDocuments(archiveFilter);

    return NextResponse.json({ numOfUsers, numOfTrails, numOfArticles });
}

