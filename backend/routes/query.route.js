import express from "express";
import helpdeskController from "../controllers/query.controller.js";

const router = express.Router();

// Route to submit a query
router.post("/submit", helpdeskController.submitQuery);

// Route to get all queries (optional, for admin or debugging)
router.get("/queries", helpdeskController.getAllQueries);

export default router;