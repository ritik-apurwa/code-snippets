import mongoose from "mongoose";

async function connect(): Promise<void> {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection error:", error);
    throw new Error("Database connection error");
  }
}

export default connect;
