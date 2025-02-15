import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
    avatar: {
        type: String,
    },
    files: {
        type: Schema.Types.ObjectId,
        ref: "File",
    }
});

export const userModel = model("User", UserSchema);