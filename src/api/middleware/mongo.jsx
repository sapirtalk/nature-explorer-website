/* connection with mongoDB database */

import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let cachedDb = null;

export async function connectToDatabase() {
    if (cachedDb) {
        return cachedDb;
    }

    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db("sample_mflix");
        cachedDb = db;
        return db;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw new Error('Unable to connect to MongoDB');
    }
}

export async function disconnectFromDatabase() {
    if (cachedDb) {
        await client.close();
        console.log('Disconnected from MongoDB');
        cachedDb = null;
    }
}