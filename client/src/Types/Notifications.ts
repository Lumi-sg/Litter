import { Document, Types } from "mongoose";
import { UserType } from "./User";
export enum NotificationTypeEnum {
	LIKE = "like",
	REPLY = "reply",
	FOLLOW = "follow",
	MESSAGE = "message",
}
export type NotificationType = Document & {
	_id?: Types.ObjectId;
	recipient: UserType;
	recipientFirebaseID: string;
	recipientUsername: string;
	sender: UserType;
	senderUsername: string;
	senderAvatarURL: string;
	type: NotificationTypeEnum;
	tweetID?: string;
	conversationID?: string;
	read: boolean;
	timestamp: Date;
};
