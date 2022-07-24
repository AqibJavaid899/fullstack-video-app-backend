import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { handleError } from "../error.js";

export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });
    await newUser.save();
    res.status(200).json({ message: "User is created successfully!" });
  } catch (error) {
    next(error);
  }
};
