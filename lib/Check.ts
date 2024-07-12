import mongoose from "mongoose";


// Load environment variables from .env file


async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("Database connection successful");
    mongoose.disconnect();
  } catch (error) {
    console.error("Database connection error:", error);
  }
}

connect();
