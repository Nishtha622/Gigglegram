import express from 'express';
import { getMessages, sendMessage } from '../controllers/messages.controller.js';
import validateMessage from '../middleware/validateMessage.js';
import validatePagination from '../middleware/validatePagination.js';

const router = express.Router();

/**
 * @route GET /api/messages
 * @desc Fetch messages, optionally filtered by sender and receiver
 * @query sender (optional) - ID of the sender
 * @query receiver (optional) - ID of the receiver
 * @query page (optional) - Page number for pagination
 * @query limit (optional) - Number of messages per page
 * @access Public
 */
router.get('/', [validatePagination], getMessages);

/**
 * @route POST /api/messages
 * @desc Send a new message
 * @body { sender, receiver, content }
 * @access Public
 */
router.post('/', [validateMessage], sendMessage);

export default router;