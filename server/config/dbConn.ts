import mongoose from 'mongoose';
import * as dotenv from "dotenv";

export const connectDB = async () => {
    try {
        dotenv.config();
        const mongodbUri = process.env.MONGODB_URI;
        if (!mongodbUri) {
            console.error('MONGODB_URI is missing in the environment variables.');
            process.exit(1);
        }
        await mongoose.connect(mongodbUri);
    } catch (err) {
        console.error(err);
    }
}