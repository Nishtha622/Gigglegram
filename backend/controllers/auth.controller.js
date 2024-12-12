import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
import User from "../models/user.model.js";
import { OAuth2Client } from 'google-auth-library'; // Use google-auth-library
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
	try {
		const { firstName,lastName, username, email, password,isAdmin} = req.body;

		// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		// if (!emailRegex.test(email)) {
		// 	return res.status(400).json({ error: "Invalid email format" });
		// }

		const existingUser = await User.findOne({ username });
		if (existingUser) {
			return res.status(400).json({ error: "Username is already taken" });
		}

		const existingEmail = await User.findOne({ email });
		if (existingEmail) {
			return res.status(400).json({ error: "Email is already taken" });
		}

		if (password.length < 6) {
			return res.status(400).json({ error: "Password must be at least 6 characters long" });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			firstName,
			lastName,
			username,
			email,
			password: hashedPassword,
			isLocalUser: true,
			isAdmin: isAdmin || false,
		});

		if (newUser) {
			generateTokenAndSetCookie(newUser._id, res, newUser.isAdmin);
			await newUser.save();

			res.status(201).json({
				_id: newUser._id,
				firstName: newUser.firstName,
				lastName: newUser.lastName,
				username: newUser.username,
				email: newUser.email,
				isAdmin: newUser.isAdmin,
				followers: newUser.followers,
				following: newUser.following,
				profileImg: newUser.profileImg,
				coverImg: newUser.coverImg,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};






export const login = async (req, res) => {
	try {
		const { username, password,isAdmin } = req.body;
		const user = await User.findOne({ username });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			username: user.username,
			email: user.email,
			followers: user.followers,
			following: user.following,
			profileImg: user.profileImg,
			coverImg: user.coverImg,
			isAdmin: user.isAdmin
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
export const googlelogin = async (req, res) => {
    const { id_token } = req.body;
  
    try {
      // Verify the Google ID token
      const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: process.env.GOOGLE_CLIENT_ID, // Replace with your actual Google Client ID
      });
      const payload = ticket.getPayload();
      
      // Check or create user in your database
	  let user = await User.findOne({ email: payload.email });
	  if (!user) {
		  user = await User.create({
			  firstName: payload.given_name,
			  lastName: payload.family_name,
			  username: payload.email.split('@')[0], // or some other logic to create a username
			  email: payload.email,
			  profileImg: payload.picture,
			  isLocalUser: false,
			  isAdmin: payload.isAdmin
		  });
		  await user.save();
		  generateTokenAndSetCookie(user._id, res);

		  res.status(200).json({
			  _id: user._id,
			  firstName: user.firstName,
			  lastName: user.lastName,
			  username: user.username,
			  email: user.email,
			  followers: user.followers,
			  following: user.following,
			  profileImg: user.profileImg,
			  coverImg: user.coverImg,
		  });
		}
    } catch (error) {
      console.error('Error verifying Google token:', error);
      res.status(400).json({ error: 'Invalid token' });
    }
  };

export const logout = async (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

// export const getMe = async (req, res) => {
// 	try {
// 		const user = await User.findById(req.user._id).select("-password");
// 		res.status(200).json(req.user);
// 	} catch (error) {
// 		console.log("Error in getMe controller", error.message);
// 		res.status(500).json({ error: "Internal Server Error" });
// 	}
// };


export const getMe = async (req, res) => {
    console.log(req.headers); // Log headers to check for the token
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.status(200).json(user);
    } catch (error) {
        console.error("Error in getMe controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const findOrCreateUser = async (payload) => {
    // Check if the user already exists
    let user = await User.findOne({ email: payload.email });
    if (!user) {
        // Create a new user if not found
        user = new User({
            firstName: payload.given_name,
            lastName: payload.family_name,
            email: payload.email,
            profileImg: payload.picture,
        });
        await user.save();
    }
    return user;
};

export default {signup,login,logout,getMe,googlelogin,findOrCreateUser};