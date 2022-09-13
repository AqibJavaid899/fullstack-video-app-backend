import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  userId: {
    type: string,
    required: true,
  },
  videoId: {
    type: string,
    required: true,
  },
  desc: {
    type: string,
    required: true,
  },
});

export default mongoose.model("Comment", commentSchema);
