import express from 'express';
import upload from '../config/multer.config.js';
import { createReel, getReels, getReelById, updateReel, deleteReel }  from "../controllers/reel.controller.js";

const router = express.Router();

// Add a new reel
router.post('/', createReel);

// Fetch all reels
router.get('/', getReels);

// Fetch a single reel by ID
router.get('/:id', getReelById);

// Update a reel by ID
router.put('/:id', updateReel);

// Delete a reel by ID
router.delete('/:id', deleteReel);

export default router;

