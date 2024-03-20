import express, { response } from "express";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import { UserModel } from "../models/User";
import { convertEmailToUsername } from "../helpers/convertEmailToUsername";
import { trimDisplayName } from "../helpers/trimDisplayName";
import { TweetModel } from "../models/Tweet";
import {
	NotificationModel,
	NotificationTypeEnum,
} from "../models/Notification";
import ConversationModel from "../models/Conversation";
import TokenModel from "../models/Token";
import admin from "firebase-admin";

export const registerUser = asyncHandler(
	async (req: express.Request, res: express.Response) => {
		console.log("Registering user...");
		const session = await UserModel.startSession();
		session.startTransaction();
		try {
			const { uid, email, name, picture } = (req as any).currentUser;

			const refreshToken = req.body.refreshToken;

			const firebaseToken = await admin.auth().createCustomToken(uid);

			const existingAccount = await UserModel.findOne({ email });
			if (existingAccount) {
				console.log("Account already exists.");
				res.status(201).json({
					message: "Account already exists.",
					account: existingAccount,
					// token: firebaseToken,
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
			const newTokenObject = new TokenModel({
				user: user._id,
				refreshToken: refreshToken,
			});
			await newTokenObject.save();
			console.log(`Saved token for user ${user.username}`);
			await session.commitTransaction();
			session.endSession();
			res.status(201).json({
				message: "User registration successful",
				user: user,
				token: firebaseToken,
			});
		} catch (error: any) {
			console.log(error);
			await session.abortTransaction();
			session.endSession();
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
				parent: { $eq: null },
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
			if (
				currentUser._id.toString() === userToBeFollowed._id.toString()
			) {
				await session.abortTransaction();
				session.endSession();
				res.status(400).json({
					message: "You cannot follow yourself",
				});
				console.log("Cannot follow yourself");
				return;
			}

			//Update currentUser
			await UserModel.updateOne(
				{ firebaseID: (req as any).currentUser.uid },
				{
					$addToSet: { following: userToBeFollowed.id },
					$inc: { followCount: 1 },
				}
			);

			//Update userToBeFollowed
			await UserModel.updateOne(
				{ firebaseID: userToBeFollowed.firebaseID },
				{
					$addToSet: { followers: currentUser.id },
					$inc: { followerCount: 1 },
				}
			);
			console.log("Creating notification...");
			const newNotification = new NotificationModel({
				recipient: userToBeFollowed,
				recipientFirebaseID: userToBeFollowed.firebaseID,
				recipientUsername: userToBeFollowed.username,
				sender: currentUser,
				senderUsername: currentUser.username,
				senderAvatarURL: currentUser.pictureURL,
				type: NotificationTypeEnum.FOLLOW,
				read: false,
				timestamp: new Date(),
			});
			await newNotification.save();
			console.log("Created notification:", newNotification._id);
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
		const session = await UserModel.startSession();
		session.startTransaction();
		console.log("Unfollowing user...");

		try {
			const userToBeUnfollowed = await UserModel.findOne({
				username: req.params.username,
			});

			const currentUser = await UserModel.findOne({
				firebaseID: (req as any).currentUser.uid,
			});

			if (!userToBeUnfollowed || !currentUser) {
				await session.abortTransaction();
				session.endSession();
				res.status(404).json({ message: "User not found" });
				return;
			}

			if (currentUser._id === userToBeUnfollowed._id) {
				await session.abortTransaction();
				session.endSession();
				res.status(400).json({
					message: "You cannot unfollow yourself",
				});
				return;
			}

			// Update currentUser
			await UserModel.updateOne(
				{ firebaseID: (req as any).currentUser.uid },
				{
					$pull: { following: userToBeUnfollowed.id },
					$inc: { followCount: -1 },
				}
			);

			// Update userToBeUnfollowed
			await UserModel.updateOne(
				{ firebaseID: userToBeUnfollowed.firebaseID },
				{
					$pull: { followers: currentUser.id },
					$inc: { followerCount: -1 },
				}
			);

			await session.commitTransaction();
			session.endSession();

			res.status(200).json({ message: "User unfollowed successfully" });
		} catch (error: any) {
			console.error("Error unfollowing user:", error);
			await session.abortTransaction();
			session.endSession();
			res.status(500).json({ message: error.message });
		}
	}
);

export const getThreeRandomUsers = asyncHandler(
	async (req: express.Request, res: express.Response) => {
		console.log("Getting three random users...");
		try {
			const loggedInUser = await UserModel.findOne({
				firebaseID: (req as any).currentUser.uid,
			});
			if (!loggedInUser) {
				res.status(404).json({ message: "User not found" });
				return;
			}
			const users = await UserModel.aggregate([
				{
					$match: { _id: { $ne: loggedInUser._id } }, // Exclude the logged-in user
				},
				{
					$sample: { size: 3 },
				},
			]);

			const arrayOfUsernames = users.map((user: any) => user.username);
			res.status(200).json({ arrayOfUsernames });
		} catch (error: any) {
			console.log("Error getting three random users:", error);
			res.status(500).json({ message: error.message });
		}
	}
);

export const getAllUsers = asyncHandler(
	async (req: express.Request, res: express.Response) => {
		console.log("Getting all users...");

		try {
			const users = await UserModel.find();
			res.status(200).json({ users });
		} catch (error: any) {
			console.log("Error getting all users:", error);
			res.status(500).json({ message: error.message });
		}
	}
);

export const getHomeFeed = asyncHandler(
	async (req: express.Request, res: express.Response) => {
		console.log("Getting home feed...");
		try {
			const currentUser = await UserModel.findOne({
				firebaseID: (req as any).currentUser.uid,
			});

			if (!currentUser) {
				console.log("User not found");
				res.status(404).json({ message: "User not found" });
				return;
			}
			const followedUsers = await UserModel.find({
				_id: { $in: currentUser.following },
			});
			const followedUserTweets = await TweetModel.find({
				author: { $in: followedUsers },
				parent: null,
			});
			const allTweets = followedUserTweets
				.map((tweet) => tweet.toObject())
				.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
			res.status(200).json({ allTweets });
		} catch (error: any) {
			console.log("Error getting home feed:", error);
			res.status(500).json({ message: error.message });
		}
	}
);

export const getUserNotifications = asyncHandler(
	async (req: express.Request, res: express.Response) => {
		console.log("Fetching user notifications...");
		try {
			const currentUser = await UserModel.findOne({
				firebaseID: (req as any).currentUser.uid,
			});
			if (!currentUser) {
				res.status(404).json({ message: "User not found" });
				return;
			}
			const allUserNotifications = await NotificationModel.find({
				recipientUsername: currentUser.username,
			}).sort({ timestamp: -1 });
			res.status(200).json({ notifications: allUserNotifications });
		} catch (error: any) {
			console.log("Error fetching user notifications:", error);
			res.status(500).json({ message: error.message });
		}
	}
);

export const markNotificationsRead = asyncHandler(
	async (req: express.Request, res: express.Response) => {
		console.log("Marking notifications read...");
		try {
			const { notificationIDArray } = req.body;
			if (notificationIDArray.length === 0) {
				res.status(404).json({ message: "Notifications not provided" });
				return;
			}
			const result = await NotificationModel.updateMany(
				{ _id: { $in: notificationIDArray } },
				{ $set: { read: true } }
			);
			console.log("Marked notifications read:", result);
			res.status(200).json({
				message: "Notifications marked read successfully",
			});
		} catch (error: any) {
			console.log("Error marking notifications read:", error);
			res.status(500).json({ message: error.message });
		}
	}
);

export const markSingleNotificationRead = asyncHandler(
	async (req: express.Request, res: express.Response) => {
		console.log("Marking single notification read...");
		try {
			const { notificationID } = req.params;
			const notifcationToBeMarked = await NotificationModel.findOne({
				_id: notificationID,
			});
			if (!notifcationToBeMarked) {
				console.log("Notification not found");
				res.status(404).json({ message: "Notification not found" });
				return;
			}
			notifcationToBeMarked.read = true;
			await notifcationToBeMarked.save();
			console.log("Marked notification read:", notificationID);
			res.status(200).json({
				message: "Notification marked read successfully",
			});
		} catch (error: any) {
			console.log("Error marking notification read:", error);
			res.status(500).json({ message: error.message });
		}
	}
);

export const getUserFollowedUsers = asyncHandler(
	async (req: express.Request, res: express.Response) => {
		console.log("Fetching followed users...");
		try {
			const currentUser = await UserModel.findOne({
				firebaseID: (req as any).currentUser.uid,
			});
			if (!currentUser) {
				res.status(404).json({ message: "User not found" });
				return;
			}
			const followedUsers = await UserModel.find({
				_id: { $in: currentUser.following },
			});
			res.status(200).json(followedUsers);
		} catch (error: any) {
			console.log("Error fetching user followers:", error);
			res.status(500).json({ message: error.message });
		}
	}
);

export const getUserConversations = asyncHandler(
	async (req: express.Request, res: express.Response) => {
		const user = await UserModel.findOne({
			firebaseID: (req as any).currentUser.uid,
		});
		if (!user) {
			res.status(404).json({ message: "User not found" });
		}
		const conversations = await ConversationModel.find({
			participants: { $in: [user] },
		})
			.populate("participants")
			// .sort("-messages.timestamp");
			.sort({ updatedAt: -1 });

		res.status(200).json({ conversations });
	}
);
