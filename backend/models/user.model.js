import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
        vipStatus: { 
			type: Boolean, 
			default: false 
		},
		password: {
			type: String,
			validate: {
				validator: function(value) {
					// Only require password if isLocalUser is true
					return !this.isLocalUser || (value && value.length >= 6);
				},
				message: 'Password must be at least 6 characters long'
			}
		},
		isAdmin: {
			type: Boolean,
			required: true,
		},	
		isBlocked: { type: Boolean, default: false },	  	  
		email: {
			type: String,
			required: true,
			unique: true,
		},
		followers: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
				default: [],
			},
		],
		following: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
				default: [],
			},
		],
		profileImg: {
			type: String,
			default: "",
		},
		coverImg: {
			type: String,
			default: "",
		},
		bio: {
			type: String,
			default: "",
		},

		link: {
			type: String,
			default: "",
		},
		likedPosts: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Post",
				default: [],
			},
		],
		bookmarkPosts: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Post",
				default: [],
			}
		]
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
