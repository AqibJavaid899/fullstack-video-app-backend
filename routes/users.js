import express from "express";
import {
  deleteUser,
  dislikeVideo,
  getUser,
  likeVideo,
  subscribeUser,
  unsubscribeUser,
  updateUser,
} from "../controllers/user.js";
import verifyToken from "../tokenVerification.js";

const router = express.Router();

// Update the User
router.put("/update/:id", verifyToken, updateUser);

// Delete the User
router.delete("/delete/:id", verifyToken, deleteUser);

// Delete the User
router.get("/get/:id", getUser);

// Subscribe the User
router.put("/subscribe/:id", verifyToken, subscribeUser);

// Unsubscribe the User
router.put("/unsubscribe/:id", verifyToken, unsubscribeUser);

// Like a Video
router.put("/like/:videoId", verifyToken, likeVideo);

// Dislike a Video
router.put("/dislike/:videoId", verifyToken, dislikeVideo);

export default router;
