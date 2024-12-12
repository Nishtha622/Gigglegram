import Reel  from '../models/reel.model.js';
import express from 'express';
import mongoose from 'mongoose';

export const createReel = async (req, res) => {
  try {
    const { videoUrl, caption, postedBy } = req.body;

    // Ensure the payload is fully validated
    if (!videoUrl || !caption || !postedBy) {
      console.error("Missing required fields.");
      return res.status(400).json({ message: 'All fields are required.' });
    }

    if (!mongoose.Types.ObjectId.isValid(postedBy)) {
      console.error("Invalid postedBy ID:", postedBy);
      return res.status(400).json({ message: 'Invalid userId' });
    }

    const newReel = new Reel({
      videoUrl,
      caption,
      postedBy,
    });

    const savedReel = await newReel.save();
    return res.status(201).json(savedReel);
  } catch (error) {
    console.error('Error creating reel:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


// Fetch all reels
export const getReels = async (req, res) => {
  try {
    const reels = await Reel.find()
      .sort({ createdAt: -1 })
      .populate('postedBy', 'username'); // Populate username of the user who posted the reel
    res.status(200).json({ success: true, data: reels });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Fetch a single reel by ID
export const getReelById = async (req, res) => {
  try {
    const reel = await Reel.findById(req.params.id).populate('postedBy', 'username');
    if (!reel) {
      return res.status(404).json({ success: false, message: 'Reel not found' });
    }
    res.status(200).json({ success: true, data: reel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a reel
export const updateReel = async (req, res) => {
  try {
    const updatedReel = await Reel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedReel) {
      return res.status(404).json({ success: false, message: 'Reel not found' });
    }
    res.status(200).json({ success: true, data: updatedReel });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a reel
export const deleteReel = async (req, res) => {
  try {
    const deletedReel = await Reel.findByIdAndDelete(req.params.id);
    if (!deletedReel) {
      return res.status(404).json({ success: false, message: 'Reel not found' });
    }
    res.status(200).json({ success: true, message: 'Reel deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



