import express, { response } from "express";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import { UserModel } from "../models/User";
import { convertEmailToUsername } from "../helpers/convertEmailToUsername";
import { trimDisplayName } from "../helpers/trimDisplayName";
import { TweetModel } from "../models/Tweet";

export const registerUser = asyncHandler(
	async (req: express.Request, res: express.Response) => {
		console.log("Registering user...");
		try {
			const { uid, email, name, picture } = (req as any).currentUser;

			const existingAccount = await UserModel.findOne({ email });
			if (existingAccount) {
				console.log("Account already exists.");
				res.status(201).json({
					message: "Account already exists.",
					account: existingAccount,
				});
				return;
			}

			const convertedUsername = convertEmailToUsername(email);
			const trimmedDisplayName = trimDisplayName(name);
			const newUser = new UserModel({
				firebaseID: uid,
				email: email,
				username: convertedUsername,
				displayName: trimmedDisplayName,
				pictureURL: picture,
			});
			const user = await newUser.save();
			console.log("Registered user:", user.username);
			res.status(201).json({
				message: "User registration successful",
				user: user,
			});
		} catch (error: any) {
			res.status(400).json({
				message: error.message,
			});
			console.log(error);
		}
	}
);

export const getUser = asyncHandler(
	async (req: express.Request, res: express.Response) => {
		console.log("Fetching user...");
		try {
			const user = await UserModel.findOne({
				username: req.params.username,
			});
			if (!user) {
				res.status(404).json({ message: "User not found" });
				return;
			}
			res.status(200).json({ user: user });
		} catch (error: any) {
			res.status(500).json({ message: error.message });
		}
	}
);

export const getUserTweets = asyncHandler(
	async (req: express.Request, res: express.Response) => {
		console.log("Fetching user tweets...");
		try {
			const user = await UserModel.findOne({
				username: req.params.username,
			});
			if (!user) {
				res.status(404).json({ message: "User not found" });
				return;
			}
			const allUserTweets = await TweetModel.find({
				authorUsername: user.username,
			})
				.sort({ timestamp: -1 })
				.populate("author");

			res.status(200).json({ tweets: allUserTweets });
		} catch (error: any) {
			res.status(500).json({ message: error.message });
		}
	}
);

export const getUserBookmarks = asyncHandler(
	async (req: express.Request, res: express.Response) => {
		console.log("Fetching user bookmarks...");
		try {
			const user = await UserModel.findOne({
				username: req.params.username,
			});

			if (!user) {
				res.status(404).json({ message: "User not found" });
				return;
			}
			const allUserBookmarks = await TweetModel.find({
				bookmarks: user.firebaseID,
			})
				.sort({ timestamp: -1 })
				.populate("author");
			res.status(200).json({ tweets: allUserBookmarks });
		} catch (error: any) {
			res.status(500).json({ message: error.message });
		}
	}
);

export const getUserLikes = asyncHandler(
	async (req: express.Request, res: express.Response) => {
		console.log("Fetching user likes...");
		try {
			const user = await UserModel.findOne({
				username: req.params.username,
			});

			if (!user) {
				res.status(404).json({ message: "User not found" });
				return;
			}
			const allUserLikes = await TweetModel.find({
				likes: user.firebaseID,
			})
				.sort({ timestamp: -1 })
				.populate("author");
			res.status(200).json({ tweets: allUserLikes });
		} catch (error: any) {
			res.status(500).json({ message: error.message });
		}
	}
);

export const followUser = asyncHandler(
	async (req: express.Request, res: express.Response) => {
		const session = await UserModel.startSession();
		session.startTransaction();
		console.log("Following user...");
		try {
			const userToBeFollowed = await UserModel.findOne({
				username: req.params.username,
			});
			const currentUser = await UserModel.findOne({
				firebaseID: (req as any).currentUser.uid,
			});
			if (!userToBeFollowed) {
				await session.abortTransaction();
				session.endSession();
				res.status(404).json({ message: "User not found" });
				console.log("User to be followed not found");
				return;
			}
			if (!currentUser) {
				await session.abortTransaction();
				session.endSession();
				res.status(404).json({ message: "User not found" });
				console.log("Current user not found");
				return;
			}

			//update currentUser 
			await UserModel.updateOne(
				{ firebaseID: (req as any).currentUser.uid },
				{
					$addToSet: { following: userToBeFollowed.firebaseID },
					$inc: { followCount: 1 },
				}
			);

			//update userToBeFollowed
			await UserModel.updateOne(
				{ firebaseID: userToBeFollowed.firebaseID },
				{ $addToSet: { followers: currentUser.firebaseID },
					$inc: { followerCount: 1 } }

			)
			await session.commitTransaction();
			session.endSession();
			res.status(200).json({ message: "User followed successfully" });
		} catch (error: any) {
			res.status(500).json({ message: error.message });
		}
	}
);

export const unfollowUser = asyncHandler(
	async (req: express.Request, res: express.Response) => {
		console.log("Unfollowing user...");
		try {
		} catch (error: any) {
			res.status(500).json({ message: error.message });
		}
	}
);
