import express from 'express';
import asyncHandler from 'express-async-handler';
import rateLimit from 'express-rate-limit';
import { body, param } from 'express-validator';
import { getAllSubscriptions, subscribeToPlan, getUserSubscriptions } from '../controllers/subscription.controller.js';
import validate from '../middleware/validate.js'

const router = express.Router();

// Rate limiter for subscription routes
const subscriptionRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests
  message: 'Too many requests, please try again later.',
});

// Validation rules
const validateSubscribe = [
  body('userId').isMongoId().withMessage('Invalid userId'),
  body('subscriptionId').isMongoId().withMessage('Invalid subscriptionId'),
  validate,
];

const validateUserId = [
  param('id').isMongoId().withMessage('Invalid userId'),
  validate,
];

// Get all subscription plans
router.get('/', asyncHandler(getAllSubscriptions));

// Subscribe a user to a plan
router.post('/subscribe', subscriptionRateLimiter, validateSubscribe, asyncHandler(subscribeToPlan));

// Get a user's subscriptions
router.get('/users/:id/subscriptions', validateUserId, asyncHandler(getUserSubscriptions));

export default router;
