import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  userId: {
    type: string,
    required: true,
  },
  title: {
    type: string,
    required: true,
  },
  desc: {
    type: string,
    required: true,
  },
  imgUrl: {
    type: string,
    required: true,
  },
  videoUrl: {
    type: string,
    required: true,
  },
  views: {
    type: number,
    default: 0,
  },
  tags: {
    type: [string],
    default: [],
  },
  likes: {
    type: [string],
    default: [],
  },
  dislikes: {
    type: [string],
    default: [],
  },
});

export default mongoose.model("Video", videoSchema);
