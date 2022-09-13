import express from "express";
import { SignIn, SignUp } from "../controllers/auth.js";

const router = express.Router();

router.use("/signup", SignUp);

router.use("/signin", SignIn);

export default router;
