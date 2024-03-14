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
import { ConversationModel, MessageType } from "../models/Conversation";

export const createConversation = asyncHandler(
	async (req: express.Request, res: express.Response) => {
		const session = await ConversationModel.startSession();
		session.startTransaction();
		try {
			const user = await UserModel.findOne({
				firebaseID: (req as any).currentUser.uid,
			});
			const receiver = await UserModel.findOne({
				username: req.body.recipientUsername,
			});

			if (!user || !receiver) {
				session.abortTransaction();
				session.endSession();
				res.status(404).json({
					message: "One or both users not found",
				});
			}
			const existingConversation = await ConversationModel.findOne({
				participants: { $all: [user!._id, receiver!._id] },
			});

			if (existingConversation) {
				session.endSession();
				console.log("Conversation already exists");
				res.status(200).json(existingConversation);
				return;
			}

			console.log("Creating conversation...");

			const conversation = new ConversationModel({
				participants: [user, receiver],
				messages: [],
			});
			await conversation.save();
			session.commitTransaction();
			session.endSession();
			res.status(200).json(conversation);
			console.log("Conversation created: ", conversation._id);
		} catch (error) {
			console.log(error);
			session.abortTransaction();
			session.endSession();
			res.status(500).send(error);
		}
	}
);

export const getConversation = asyncHandler(
	async (req: express.Request, res: express.Response) => {
		console.log("Fetching conversation...");
		try {
			const conversation = await ConversationModel.findOne({
				_id: req.params.conversationID,
			}).populate("participants");
			if (!conversation) {
				res.status(404).json({ message: "Conversation not found" });
			}
			res.status(200).json(conversation);
			console.log("Conversation fetched: ", conversation?._id);
		} catch (error) {
			res.status(500).send(error);
		}
	}
);

export const createNewMessage = [
	body("content")
		.trim()
		.notEmpty()
		.withMessage("Please enter a message")
		.isLength({ max: 500 })
		.withMessage("Message must be 500 characters or less")
		.isLength({ min: 1 })
		.withMessage("Message must be at least 1 character long"),

	asyncHandler(async (req: express.Request, res: express.Response) => {
		const session = await ConversationModel.startSession();
		session.startTransaction();
		try {
			console.log("Creating message...");
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				session.abortTransaction();
				session.endSession();
				res.status(400).json({ errors: errors.array() });
				return;
			}
			const user = await UserModel.findOne({
				firebaseID: (req as any).currentUser.uid,
			});
			const receiver = await UserModel.findOne({
				recipientUsername: req.body.recipientUsername,
			});
			if (!user || !receiver) {
				session.abortTransaction();
				session.endSession();
				res.status(404).json({
					message: "One or both users not found",
				});
				return;
			}

			const conversation = await ConversationModel.findOne({
				_id: req.params.conversationID,
			});
			if (!conversation) {
				session.abortTransaction();
				session.endSession();
				res.status(404).json({ message: "Conversation not found" });
				return;
			}

			const newMessage = {
				content: req.body.messageContent,
				sender: user,
				senderFirebaseID: (req as any).currentUser.uid,
				receiver: receiver,
				receiverFirebaseID: receiver.firebaseID,
				timestamp: new Date(),
			};
			conversation.messages.push(newMessage as MessageType);
			await conversation.save();
			session.commitTransaction();
			session.endSession();
			res.status(200).json(conversation);
			console.log("New message created: ", conversation._id);
		} catch (error) {
			console.log(error);
			session.abortTransaction();
			session.endSession();
			res.status(500).send(error);
		}
	}),
];
