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
		console.log("Creating tweet...");
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				console.log("Validation errors", errors.array());
				res.status(400).send(errors);
				return;
			}
			const { email } = (req as any).currentUser;
			const { tweetContent } = req.body;

			const author = await UserModel.findOne({ email });
			if (!author) {
				res.status(404).json({ message: "User not found" });
			}

			const tweet = new TweetModel({
				author: author,
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
			console.log("Created tweet:", createdTweet._id);
			res.status(201).json({
				message: "Tweet created successfully",
				tweet: createdTweet,
			});
			return;
		} catch (error: any) {
			res.status(400).json({
				message: error.message,
			});
			console.log(error);
			return;
		}
	}),
];
