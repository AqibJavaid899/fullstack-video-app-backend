import express from "express";
import {
  deleteComment,
  getComments,
  postComment,
} from "../controllers/comment.js";

import verifyToken from "../tokenVerification.js";

const router = express.Router();

// Post a Comment
router.post("/post", verifyToken, postComment);

// Delete the Signed In User Comment
router.delete("/delete/:commentId", verifyToken, deleteComment);

// Get all the Comments related to the Video using VideoId
router.get("/get/:videoId", verifyToken, getComments);

export default router;
