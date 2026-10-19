import express from "express";
import { verifyToken, adminOnly } from "../utils/verifyuser.js";
import {
  getUser,
  getUserById,
  createUser,
  deleteUser,
} from "../controller/user.controller.js";

const router = express.Router();

router.get("/get-user", verifyToken, adminOnly, getUser);
router.get("/get-user/:userId", verifyToken, getUserById);
router.post("/create-User", verifyToken, adminOnly, createUser);
router.delete("/:userId", verifyToken, adminOnly, deleteUser);

export default router;
