import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { followUnfollowUser, getSuggestedUsers, getUserProfile, updateUser, searchUser, getUserBookmarks } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile/:username", protectRoute, getUserProfile);
 router.get("/suggested", protectRoute, getSuggestedUsers);
 router.post("/follow/:id", protectRoute, followUnfollowUser);
router.post("/update", protectRoute, updateUser);
router.get("/search",searchUser);
router.get("/bookmarks", protectRoute, getUserBookmarks);

export default router;
