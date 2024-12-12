import express from "express";
import { OAuth2Client } from 'google-auth-library'; // Use google-auth-library
import cors from 'cors'; // Import cors
import jwt from 'jsonwebtoken'; // Ensure you import jwt if you are using it
import { getMe, login, logout, signup, googlelogin } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
import User from "../models/user.model.js";

const router = express.Router();

// Initialize the Google OAuth client
const client = new OAuth2Client('908013228419-p2e00bl9io38qvm6l5dmacftv73du8kq.apps.googleusercontent.com'); 

// Apply CORS middleware to all routes
router.use(cors());

router.get("/me", protectRoute, getMe);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post('/google',googlelogin);

export default router;
