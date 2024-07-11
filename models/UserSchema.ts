import mongoose, { Document, Schema } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    ClerkUserId: {
      type: String,
      unique: true,
      required: true,
    },
    emailAddress: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User",UserSchema)

export default User 
