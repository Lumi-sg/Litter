import mongoose, { Document, Schema, Types } from "mongoose";
import { TweetType } from "./Tweet";
import { UserType } from "./User";
import { ConversationType } from "./Conversation";

export enum NotificationTypeEnum {
	LIKE = "like",
	REPLY = "reply",
	FOLLOW = "follow",
}

export type NotificationType = Document & {
	_id?: Types.ObjectId;
	recipient: UserType;
	recipientFirebaseID: string;
	recipientUsername: string;
	sender: UserType;
	senderUsername: string;
	type: NotificationTypeEnum;
	tweetID?: string;
	conversationID?: string;
	read: boolean;
	timestamp: Date;
};

const notificationSchema = new Schema<NotificationType>({
	recipient: { type: Schema.Types.ObjectId, ref: "User", required: true },
	recipientFirebaseID: { type: String, required: true },
	recipientUsername: { type: String, required: true },
	sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
	senderUsername: { type: String, required: true },
	type: {
		type: String,
		enum: Object.values(NotificationTypeEnum),
		required: true,
	},
	tweetID: { type: String },
	conversationID: { type: String },
	read: { type: Boolean, default: false },
	timestamp: { type: Date, default: Date.now, required: true },
});

export const NotificationModel = mongoose.model<NotificationType>(
	"Notification",
	notificationSchema
);

export default NotificationModel;
