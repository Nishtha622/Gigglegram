// import Story from '../models/story.model.js';

// // Controller: Post a new story
// export const postStory = async (req, res) => {
//   try {
//     const { userId } = req.user; // User's ID from authentication middleware
//     const imageUrl = `../../frontend/public/uploads/${req.file.filename}`;

//     // Save story to the database
//     const story = new Story({ userId, imageUrl });
//     await story.save();

//     res.status(201).json({ message: 'Story posted successfully', story });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to post story' });
//   }
// };

// // Controller: Get all stories for the current user
// export const getUserStories = async (req, res) => {
//   try {
//     const { userId } = req.user;

//     // Fetch the stories for the user
//     const stories = await Story.find({ userId }).sort({ createdAt: -1 });

//     res.status(200).json({ stories });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to fetch stories' });
//   }
// };

// // Controller: Get all active stories (for feed purposes)
// export const getStoriesFeed = async (req, res) => {
//   try {
//     const stories = await Story.find().populate('userId', 'username'); // Fetch all stories
//     res.status(200).json({ stories });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to fetch stories' });
//   }
// };



import Story from "../models/story.model.js";

// Controller: Post a new story
export const postStory = async (req, res) => {
  try {
    const { userId } = req.user; // User's ID from authentication middleware
    const mediaType = req.file.mimetype.startsWith("image") ? "image" : "video";
    const mediaUrl = `/uploads/${req.file.filename}`;

    // Save story to the database
    const story = new Story({ userId, mediaUrl, mediaType });
    await story.save();

    res.status(201).json({ message: "Story posted successfully", story });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to post story" });
  }
};

// Controller: Get all stories for the current user
export const getUserStories = async (req, res) => {
  try {
    const { userId } = req.user;

    // Fetch the stories for the user
    const stories = await Story.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({ stories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch stories" });
  }
};

// Controller: Get all active stories (for feed purposes)
export const getStoriesFeed = async (req, res) => {
  try {
    const stories = await Story.find()
      .populate("userId", "username")
      .sort({ createdAt: -1 });

    res.status(200).json({ stories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch stories" });
  }
};

// Controller: Delete a story
export const deleteStory = async (req, res) => {
  try {
    const { storyId } = req.params;
    const { userId } = req.user;

    // Ensure the story belongs to the user
    const story = await Story.findOneAndDelete({ _id: storyId, userId });
    if (!story) {
      return res.status(404).json({ error: "Story not found or not authorized" });
    }

    res.status(200).json({ message: "Story deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete story" });
  }
};
