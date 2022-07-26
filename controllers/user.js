import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

export const updateUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      // Extract the User from the DB using the User Id
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      const { password, ...remainingData } = user._doc;
      res.status(200).json(remainingData);
    } catch (error) {
      next(error);
    }
  } else {
    next(createError(403, "You can only update your own account!"));
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      // Extract the User from the DB using the User Id
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "User has been deleted successfully!" });
    } catch (error) {
      next(error);
    }
  } else {
    next(createError(403, "You can only delete your own account!"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    // Extract the User from the DB using the User Id
    const user = await User.findById(req.params.id);
    const { password, ...otherData } = user._doc;
    res.status(200).json(otherData);
  } catch (error) {
    next(error);
  }
};

export const subscribeUser = async (req, res, next) => {
  try {
    // Extract the User from the DB using the User Id and add the Subscription ID to the list
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });
    //   Increment the Subscription count of the subscribed user
    await User.findByIdAndUpdate(req.params.id, { $inc: { subscribers: 1 } });
    res.status(200).json({ message: "Successfully subscribe the channel!" });
  } catch (error) {
    next(error);
  }
};

export const unsubscribeUser = async (req, res, next) => {
  try {
    // Extract the User from the DB using the User Id and remove the Subscription ID to the list
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUsers: req.params.id },
    });
    //   Decrement the Subscription count of the subscribed user
    await User.findByIdAndUpdate(req.params.id, { $inc: { subscribers: -1 } });
    res.status(200).json({ message: "Successfully unsubscribe the channel!" });
  } catch (error) {
    next(error);
  }
};

export const likeVideo = async (req, res, next) => {
  try {
    // Use the Video Id from the Request Params and Push the User Id into the Found Video Liked Array
    await Video.findByIdAndUpdate(req.params.videoId, {
      // AddToSet method will make sure that the User Id has only been added once into the likes array
      $addToSet: { likes: req.user.id },
      $pull: { dislikes: req.user.id },
    });
    res.status(200).json({ message: "The video has been liked!" });
  } catch (error) {
    next(error);
  }
};

export const dislikeVideo = async (req, res, next) => {
  try {
    // Use the Video Id from the Request Params and Pull the User Id from the Found Video Liked Array
    await Video.findByIdAndUpdate(req.params.videoId, {
      // AddToSet method will make sure that the User Id has only been added once into the likes array
      $addToSet: { dislikes: req.user.id },
      $pull: { likes: req.user.id },
    });
    res.status(200).json({ message: "The video has been disliked!" });
  } catch (error) {
    next(error);
  }
};
