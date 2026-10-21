import User from "../models/user.model.js";
import Task from "../models/task.model.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export const getUser = async (req, res, next) => {
  try {
    const users = await User.find({ role: "user" }).select("-password");

    const userTaskWithCount = await Promise.all(
      users.map(async (user) => {
        const pendingTask = await Task.countDocuments({
          assignee: user._id,
          status: "pending",
        });
        const inProgressTask = await Task.countDocuments({
          assignee: user._id,
          status: "in-progress",
        });

        const completedTask = await Task.countDocuments({
          assignee: user._id,
          status: "completed",
        });

        return {
          ...user._doc,
          pendingTask,
          inProgressTask,
          completedTask,
        };
      }),
    );

    res.status(200).json(userTaskWithCount);
  } catch (error) {
    return next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const id = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

export const createUser = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const finalrole = role === "admin" ? "admin" : "user";
  try {
    const clean = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: clean });
    if (existingUser) {
      return res.status(409).json({ message: "User already exist" });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: name,
      email: clean,
      password: hashedpassword,
      role: finalrole,
    });
    await newUser.save();
    return res.status(201).json({
      success: true,
      role: finalrole,
      message: "User Created successfully",
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.userId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }
    if (id === req.user._id) {
      return res.status(400).json({ message: "Cannot delete your own id" });
    }
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(409).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return next(error);
  }
};
