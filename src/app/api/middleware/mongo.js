/* connection with mongoDB database */

// src/api/middleware/mongo.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
let client;
let cachedDb;

if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

// connect to the database, or return the cached database connection
export async function connectToDatabase() {
    if (cachedDb) {
        return cachedDb;
    }

    client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to MongoDB');
        cachedDb = client.db('Nature_Haifa'); // change the database name here
        return cachedDb;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw new Error('Unable to connect to MongoDB');
    }
}

export async function disconnectFromDatabase() {
    if (client) {
        await client.close();
        console.log('Disconnected from MongoDB');
        cachedDb = null;
    }
}



