import VIPAccessRequest from "../models/VIPAccessRequest.model.js";

// @desc    Submit a VIP Access Request
// @route   POST /api/vipaccess
// @access  Public
const submitVIPAccessRequest = async (req, res) => {
  const { username, userId, email } = req.body;

  if (!username || !userId || !email) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const existingRequest = await VIPAccessRequest.findOne({ userId });
    if (existingRequest) {
      return res
        .status(400)
        .json({ message: "A request for this user ID already exists." });
    }

    const request = await VIPAccessRequest.create({ username, userId, email });
    res.status(201).json({ message: "Request submitted successfully.", request });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// @desc    Get All VIP Access Requests (Admin)
// @route   GET /api/vipaccess
// @access  Admin
const getAllVIPAccessRequests = async (req, res) => {
  try {
    const requests = await VIPAccessRequest.find();
    res.status(200).json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export { submitVIPAccessRequest, getAllVIPAccessRequests };