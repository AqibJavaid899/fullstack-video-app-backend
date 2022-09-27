import { createError } from "../error.js";
import Comment from "../models/Comment.js";
import Video from "../models/Video.js";

export const postComment = async (req, res, next) => {
  try {
    // Creating a Comment object from the data that we have in the Request Objects and saving it in the DB
    const comment = new Comment({ ...req.body, userId: req.user.id });
    await comment.save();
    res.status(200).json({ message: "Comment has been added successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    // Extracting the Comment object using the Comment Id from the Request Params
    const comment = await Comment.findById(req.params.commentId);
    // Extracting the Video object using the Video Id from the Comment Object
    const video = await Video.findById(comment.videoId);
    // Checking if the Comment belongs to the Signed In User or either the Signed In User is the owner of the Video
    if (video.userId === req.user.id || req.user.id === comment.userId) {
      await Comment.findByIdAndDelete(req.params.commentId);
      res
        .status(200)
        .json({ message: "Comment has been deleted successfully!" });
    } else {
      next(createError(403, "You can only delete your comment on a Video!"));
    }
  } catch (error) {
    next(error);
  }
};

export const getComments = async (req, res, next) => {
  try {
    // Fetch all the Comment related to a Video using the Video Id from the Request Params
    const comments = await Comment.find({ videoId: req.params.videoId });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};
