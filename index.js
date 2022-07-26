import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

//Express Middleware
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

const connectMongoDB = () => {
  mongoose
    .connect(process.env.MONGODB_CONNECTION_URL)
    .then(() => {
      console.log("MongoDB connected!");
    })
    .catch((error) => {
      console.log(error);
    });
};

// Routes Middleware
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/auth", authRoutes);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(8080, () => {
  connectMongoDB();
  console.log(`Server is running on port 8080`);
});
