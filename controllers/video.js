import Video from "../models/Video.js";
import { createError } from "../error.js";
import User from "../models/User.js";

export const createVideo = async (req, res, next) => {
  // Get the User Id from the User Cookie and create a new video
  const newVideo = new Video({ userId: req.user.id, ...req.body });
  try {
    // Saving the Video to the database
    const video = await newVideo.save();
    res.status(200).json(video);
  } catch (error) {
    next(error);
  }
};

export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);
  } catch (error) {
    next(error);
  }
};

export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found!"));
    // Update Only if the Video belongs to the Signed-In user
    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(updatedVideo);
    } else {
      next(createError(403, "You can only update your own video!"));
    }
  } catch (error) {
    next(error);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found!"));
    // Delete Only if the Video belongs to the Signed-In user
    if (req.user.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Video has been deleted successfully!" });
    } else {
      next(createError(403, "You can only delete your own video!"));
    }
  } catch (error) {
    next(error);
  }
};

export const getTrendingVideos = async (req, res, next) => {
  try {
    // Get the Videos sorted by their View Count
    const videos = await Video.find().sort({ views: -1 });
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

export const getRandomVideos = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

export const incrementVideoViewCount = async (req, res, next) => {
  try {
    // Increment the Video View Count by 1 on that route
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res
      .status(200)
      .json({ message: "The View Count has been incremented successfully" });
  } catch (error) {
    next(error);
  }
};

export const getSubscribedChannelVideos = async (req, res, next) => {
  try {
    //   Get the Signed-In User
    const user = await User.findById(req.user.id);
    // Extract the list of Videos from all the Subscribed Channels
    const list = await Promise.all(
      user.subscribedUsers.map((channelId) => {
        return Video.find({ userId: channelId });
      })
    );
    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (error) {
    next(error);
  }
};

export const getVideosByTags = async (req, res, next) => {
  // Fetching the Tags from the Query Params
  const videoTags = req?.query?.tags?.split(",");
  if (videoTags) {
    try {
      // Extracting Videos where the any of the Query Params Tags matched with any of the Video Tags
      const videos = await Video.find({ tags: { $in: videoTags } });
      res.status(200).json(videos);
    } catch (error) {
      next(error);
    }
  } else {
    next(createError(404, "Video Tags are missing!"));
  }
};

export const getVideosByTitle = async (req, res, next) => {
  // Fetching the Title from the Query Params
  const videoTitle = req?.query?.title;
  if (videoTitle) {
    try {
      // Extracting Videos where Query Params Title matched with any of the Video Title completely or partially
      const videos = await Video.find({
        title: { $regex: videoTitle, $options: "i" },
      });
      res.status(200).json(videos);
    } catch (error) {
      next(error);
    }
  } else {
    next(createError(404, "Video Title is missing!"));
  }
};
