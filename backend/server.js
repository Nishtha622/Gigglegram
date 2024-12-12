import path from "path";
import express from "express";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import setupMiddleware from './middleware/index.middleware.js';
import setupRoutes from './routes/index.route.js';

import seedSubscriptions from "./seesubscription/seedsubscriptions.js";

import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config();

 cloudinary.config({
 	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
 	api_key: process.env.CLOUDINARY_API_KEY,
 	api_secret: process.env.CLOUDINARY_API_SECRET,
 });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
setupMiddleware(app);

// Routes
setupRoutes(app);

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(err.status || 500).json({
	  success: false,
	  message: err.message || "Internal Server Error",
	});
  });

app.listen(PORT, async () => {
	console.log(`Server is running on port ${PORT}`);

	await connectMongoDB();
	await seedSubscriptions();
});

// Graceful shutdown
process.on("SIGINT", async () => {
	console.log("Closing server...");
	try {
	  await connectMongoDB.disconnect(); 
	  console.log("Disconnected from MongoDB");
	  process.exit(0);
	} catch (error) {
	  console.error("Error during shutdown:", error.message);
	  process.exit(1);
	}
  });

