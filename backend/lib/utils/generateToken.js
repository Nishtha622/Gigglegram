import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res,isAdmin=false) => {
	const token = jwt.sign({ userId , isAdmin}, process.env.JWT_SECRET, {
		expiresIn: "1h",
	});

	res.cookie("jwt", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000, //MS
		httpOnly: true, // prevent XSS attacks cross-site scripting attacks
		sameSite: "strict", // CSRF attacks cross-site request forgery attacks
		secure: process.env.NODE_ENV !== "production",
	});
	res.setHeader('Authorization', `Bearer ${token}`);
};
