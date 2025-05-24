import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectMongo = async () => {
  await mongoose.connect(process.env.MONGO_URI!);
  console.log('MongoDB connected');
};
