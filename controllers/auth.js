import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import User from "../models/User.js";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

export const SignUp = async (req, res, next) => {
  try {
    // Decrypting the Password using Bcrypt.js
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    // Getting the User Data from the request
    const newUser = new User({ ...req.body, password: hashedPassword });
    // Save the User
    await newUser.save();
    res.status(200).json({ message: "User has been created!" });
  } catch (error) {
    next(error);
  }
};

export const SignIn = async (req, res, next) => {
  try {
    // Checking whether the user exists or not
    const user = await User.findOne({ name: req.body.name });
    if (!user) return next(createError(404, "User does not exist!"));

    // Checking the User Credentials (in this case UserId)
    const isCorrectUser = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isCorrectUser) return next(createError(400, "Wrong Credentials!"));

    // Logging in and Saving the Access Token inside the cookie
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

    // Excluding the password field from the user object
    const { password, ...remainingData } = user._doc;

    // Storing the Token in the Cookies and returning the User Data without the password field
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(remainingData);
  } catch (error) {
    next(error);
  }
};
