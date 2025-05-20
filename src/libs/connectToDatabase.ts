import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  throw new Error('Invalid/Missing environment variable: "MONGO_URL"');
}

export async function connectToDatabase() {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(MONGO_URL as string); // Use type assertion here

    } catch (error) {
      console.error('Failed to connect to MongoDB', error);
      throw new Error('Failed to connect to MongoDB');
    }
  }
}
