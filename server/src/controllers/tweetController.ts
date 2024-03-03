import express, { response } from "express";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import { UserModel } from "../models/User";
import { convertEmailToUsername } from "../helpers/convertEmailToUsername";
import { trimDisplayName } from "../helpers/trimDisplayName";
import { TweetModel } from "../models/Tweet";

export const createTweet = [
	body("tweetContent")
		.trim()
		.notEmpty()
		.withMessage("Tweet content cannot be empty.")
		.isLength({ max: 280 })
		.withMessage("Tweet cannot exceed 280 characters.")
		.isLength({ min: 1 })
		.withMessage("Tweet cannot be less than 1 character."),

	asyncHandler(async (req: express.Request, res: express.Response) => {
		const session = await UserModel.startSession();
		session.startTransaction();
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				console.log("Validation errors", errors.array());
				res.status(400).send(errors);
				session.abortTransaction();
				return;
			}
			console.log("Creating tweet...");
			const { uid, email, name, picture } = (req as any).currentUser;
			const { tweetContent } = req.body;

			const author = await UserModel.findOne({ email });
			if (!author) {
				res.status(404).json({ message: "User not found" });
			}

			const convertedUsername = convertEmailToUsername(email);
			const trimmedDisplayName = trimDisplayName(name);

			const tweet = new TweetModel({
				author: author,
				firebaseID: uid,
				authorUsername: convertedUsername,
				authorDisplayName: trimmedDisplayName,
				authorPictureURL: picture,
				text: tweetContent,
				likes: [],
				likesCount: 0,
				parent: null,
				children: [],
				childrenCount: 0,
				timestamp: new Date(),
				bookmarkCount: 0,
			});
			const createdTweet = await tweet.save();
			author!.tweetCount = author!.tweetCount + 1;
			await author!.save();
			await session.commitTransaction();
			session.endSession();
			console.log("Created tweet:", createdTweet._id);
			res.status(201).json({
				message: "Tweet created successfully",
				tweet: createdTweet,
			});
			return;
		} catch (error) {
			await session.abortTransaction();
			session.endSession();
			console.error("Transaction failed:", error);
			res.status(500).json({ message: "Internal Server Error" });
		}
	}),
];

export const getTweet = asyncHandler(
	async (req: express.Request, res: express.Response) => {
		console.log("Fetching tweet...");
		try {
			const tweet = await TweetModel.findOne({ _id: req.params.tweetID });
			if (!tweet) {
				res.status(404).json({ message: "Tweet not found" });
				return;
			}
			res.status(200).json({ tweet: tweet });
		} catch (error: any) {
			res.status(500).json({ message: error.message });
		}
	}
);

export const likeTweet = asyncHandler(
	async (req: express.Request, res: express.Response) => {
		console.log("Like tweet...");
		try {
			const tweet = await TweetModel.findOne({ _id: req.params.tweetID });
			const { uid } = (req as any).currentUser;
			if (!tweet) {
				res.status(404).json({ message: "Tweet not found" });
				return;
			}

			console.log("Adding like...");
			await TweetModel.updateOne(
				{ _id: req.params.tweetID },
				{ $addToSet: { likes: uid }, $inc: { likesCount: 1 } }
			);
			res.status(200).json({ message: "Tweet liked successfully" });
			return;
		} catch (error: any) {
			res.status(500).json({ message: error.message });
		}
	}
);

export const unlikeTweet = asyncHandler(
	async (req: express.Request, res: express.Response) => {
		console.log("Unlike tweet...");
		try {
			const tweet = await TweetModel.findOne({ _id: req.params.tweetID });
			const { uid } = (req as any).currentUser;
			if (!tweet) {
				res.status(404).json({ message: "Tweet not found" });
				return;
			}

			console.log("Removing like...");
			await TweetModel.updateOne(
				{ _id: req.params.tweetID },
				{ $pull: { likes: uid }, $inc: { likesCount: -1 } }
			);
			res.status(200).json({ message: "Tweet unliked successfully" });
			return;
		} catch (error: any) {
			res.status(500).json({ message: error.message });
		}
	}
);

export const bookmarkTweet = asyncHandler(
	async (req: express.Request, res: express.Response) => {
		console.log("Bookmark tweet...");
		try {
			const tweet = await TweetModel.findOne({ _id: req.params.tweetID });
			const { uid } = (req as any).currentUser;
			if (!tweet) {
				res.status(404).json({ message: "Tweet not found" });
				return;
			}
			tweet.bookmarks.push(uid);
			tweet.bookmarkCount = tweet.bookmarkCount + 1;
			await tweet.save();
			res.status(200).json({ message: "Tweet bookmarked successfully" });
			return;
		} catch (error: any) {
			res.status(500).json({ message: error.message });
		}
	}
);
