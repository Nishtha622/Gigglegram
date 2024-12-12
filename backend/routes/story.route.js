// import express from 'express';
// import upload from '../config/multer.config.js';
// import { postStory, getUserStories, getStoriesFeed } from '../controllers/story.controller.js';

// const router = express.Router();

// // Route: Post a new story
// router.post('/',upload.single('image'), postStory);

// // Route: Get all stories for the current user
// router.get('/',getUserStories);

// // Route: Get all active stories (for feed purposes)
// router.get('/feed',getStoriesFeed);

// export default router;


import express from "express";
import upload from "../config/multer.config.js";
import {
  postStory,
  getUserStories,
  getStoriesFeed,
  deleteStory,
} from "../controllers/story.controller.js";

const router = express.Router();

// Route: Post a new story
router.post("/", upload.single("file"), postStory);

// Route: Get all stories for the current user
router.get("/", getUserStories);

// Route: Get all active stories (for feed purposes)
router.get("/feed", getStoriesFeed);

// Route: Delete a story
router.delete("/:storyId", deleteStory);

export default router;

