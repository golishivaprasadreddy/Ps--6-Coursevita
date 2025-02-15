import { model, Schema } from "mongoose";

const FileSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
    avatar: {
        type: String,
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
});

export const fileModel = model("File", FileSchema);