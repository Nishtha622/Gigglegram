import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const verifyToken = async (req, res, next) => {
  try {
    // Retrieve the token from the Authorization header or cookies
    let token = req.header("Authorization") || req.cookies.token;

    // If no token is provided, deny access
    if (!token) {
      return res.status(403).json({ msg: "Access Denied" });
    }

    // Remove the "Bearer " prefix if it exists
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    // Verify the token using the JWT secret
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the verified user information to the request object
    req.user = verified;

    // Proceed to the next middleware function or route handler
    next();
  } catch (err) {
    console.error("Error in verifyToken middleware", err.message);
    return res.status(401).json({ msg: "Invalid Token" });
  }
};
