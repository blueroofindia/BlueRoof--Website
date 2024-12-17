import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB (you'll need to add your MongoDB URI in a .env file)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
  });

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});
