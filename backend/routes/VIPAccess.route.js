import express from "express";
import { submitVIPAccessRequest, getAllVIPAccessRequests } from "../controllers/VIPAccess.controller.js";

const router = express.Router();

// Public route for submitting requests
router.post("/", submitVIPAccessRequest);

// Admin route for fetching all requests
router.get("/", getAllVIPAccessRequests);

export default router;