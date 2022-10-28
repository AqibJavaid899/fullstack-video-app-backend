import express from "express";
import {
  createVideo,
  deleteVideo,
  getRandomVideos,
  getSubscribedChannelVideos,
  getTrendingVideos,
  getVideo,
  getVideosByTags,
  getVideosByTitle,
  incrementVideoViewCount,
  updateVideo,
} from "../controllers/video.js";

import verifyToken from "../tokenVerification.js";

const router = express.Router();

// Create the Video
router.post("/create", verifyToken, createVideo);

// Get the Video
router.get("/get/:id", getVideo);

// Update the Video
router.put("/update/:id", verifyToken, updateVideo);

// Delete the Video
router.delete("/delete/:id", verifyToken, deleteVideo);

// Get the Trending Videos
router.get("/trending", getTrendingVideos);

// Get the Random Videos
router.get("/random", getRandomVideos);

// Increment the View Count of the Video
router.put("/view/:id", incrementVideoViewCount);

// Get the list of Videos from all the Subscribed Channels
router.get("/subscription", verifyToken, getSubscribedChannelVideos);

// Get the Videos based on the Specified Tags in the Query Parameters
router.get("/searchByTags", getVideosByTags);

// Get the Videos based on the Specified Title (Completely or Partially matched) in the Query Parameters
router.get("/searchByTitle", getVideosByTitle);

export default router;
