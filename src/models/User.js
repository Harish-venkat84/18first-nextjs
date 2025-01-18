import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
    },
    googleUserId: {
      type: String,
    },
    googleProfileImage: {
      type: String,
    },
  },
  { timestamps: true }
);

let User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
