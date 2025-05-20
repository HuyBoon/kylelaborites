import { MongoClient, ServerApiVersion } from "mongodb";

// Ensure that the MONGO_URL environment variable is set
if (!process.env.MONGO_URL) {
    throw new Error('Invalid/Missing environment variable: "MONGO_URL"');
}

const uri = process.env.MONGO_URL;
const options = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
};

// Declare a MongoClient and a promise for connecting
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Extend the global object in TypeScript to include _mongoClientPromise
declare global {
    // This prevents TypeScript from throwing an error when accessing _mongoClientPromise
    // It ensures that in development, the client persists across hot-reloads.
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// Check if we are in development mode (for hot-reloading in development)
if (process.env.NODE_ENV === "development") {
    // If there is no existing MongoDB client, create one and store it in the global object
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    // In production, create a new MongoClient instance
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

// Export the clientPromise for use in other parts of the app
export default clientPromise;
