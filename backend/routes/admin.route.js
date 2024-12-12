import express from "express";
import { protectRoute, isAdmin } from "../middleware/protectRoute.js";
import {
  getUsers,
  getPosts,
  blockUser,
  unblockUser,
  getCounts
} from "../controllers/admin.controller.js";

const router = express.Router();

// Protect all admin routes with authentication and check if user is an admin
router.use(protectRoute, isAdmin);

// Admin routes
router.get("/users", getUsers);
router.get("/posts", getPosts);
router.post("/users/block/:id", blockUser);
router.post("/users/unblock/:id", unblockUser);
router.get("/counts", getCounts);

export default router;
