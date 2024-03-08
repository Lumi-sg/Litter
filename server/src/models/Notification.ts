import mongoose, { Document, Schema, Types } from "mongoose";
import { TweetType } from "./Tweet";
import { UserType } from "./User";
import { ConversationType } from "./Conversation";

export type NotificationType = Document & {
	_id?: Types.ObjectId;
	recipient: UserType;
    recipientUsername: string;
	sender: UserType;
    senderUsername: string;
	type: string;
	tweet?: TweetType;
	conversation?: ConversationType;
	read: boolean;
	createdAt: Date;
};

const notificationSchema = new Schema<NotificationType>({
	recipient: { type: Schema.Types.ObjectId, ref: "User" },
	sender: { type: Schema.Types.ObjectId, ref: "User" },
	type: { type: String, required: true },
	tweet: { type: Schema.Types.ObjectId, ref: "Tweet" },
	conversation: { type: Schema.Types.ObjectId, ref: "Conversation" },
	read: { type: Boolean, default: false },
	createdAt: { type: Date, default: Date.now },
});

export const NotificationModel = mongoose.model<NotificationType>(
	"Notification",
	notificationSchema
);

export default NotificationModel;
