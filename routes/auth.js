import express from "express";
import { signup } from "../controllers/auth.js";

const router = express.Router();

// Sign up a new user
router.post("/signup", signup);

// Sign in to the App

// SignUp via Google Account

export default router;
