import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
let cachedClient = null;
let cachedDb = null;

if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

export async function connectToDatabase() {
    if (cachedDb) {
        console.log('Using cached database connection');
        // Log the number of current connections
        const serverStatus = await cachedDb.command({ serverStatus: 1 });
        console.log(`Current number of connections: ${serverStatus.connections.current}`);
        return cachedDb;
    }

    if (!cachedClient) {
        cachedClient = new MongoClient(uri);
        console.log('Created new MongoDB client');
    }

    try {
        if (!cachedClient.topology || cachedClient.topology.isDestroyed()) {
            await cachedClient.connect();
            console.log('Started MongoDB connection..');
        }
        cachedDb = cachedClient.db('Nature_Haifa');
        // Log the number of current connections
        const serverStatus = await cachedDb.command({ serverStatus: 1 });
        console.log(`Current number of connections: ${serverStatus.connections.current}`);
        return cachedDb;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw new Error('Unable to connect to MongoDB');
    }
}



// Ensure proper cleanup
if (process.listenerCount('SIGINT') === 0) {
    process.on('SIGINT', async () => {
        if (cachedClient) {
            await cachedClient.close();
            console.log('MongoDB connection closed');
        }
        process.exit(0);
    });
}

if (process.listenerCount('SIGTERM') === 0) {
    process.on('SIGTERM', async () => {
        if (cachedClient) {
            await cachedClient.close();
            console.log('MongoDB connection closed');
        }
        process.exit(0);
    });
}




