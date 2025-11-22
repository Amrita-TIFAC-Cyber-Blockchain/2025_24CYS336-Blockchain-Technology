import mongoose from 'mongoose';

export default async function connectDB(uri) {
  await mongoose.connect(uri);
  console.log('Connected to MongoDB');
}
