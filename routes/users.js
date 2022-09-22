import express from "express";
import {
  deleteUser,
  getUser,
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

// Delete the User
router.put("/unsubscribe/:id", verifyToken, unsubscribeUser);

export default router;
