import mongoose from 'mongoose';

const connectDB = async (url) => {
  mongoose.set('strictQuery', true);
  mongoose.connect(url)
    .then(() => console.log('Connected to mongoDB'))
    .catch((err) => {
      console.error('Failed to connect to MongoDB');
      console.error(err);
    })
}

export default connectDB