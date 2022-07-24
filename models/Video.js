import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    title: { type: String, required: true, unique: true },
    videoDescription: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    views: { type: Number, default: 0 },
    tags: { type: [String], default: [] },
    likes: { type: Number, default: [] },
    dislikes: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("Video", videoSchema);
