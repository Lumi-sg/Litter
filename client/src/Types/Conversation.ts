import { Document,Types } from "mongoose";
import { UserType } from "./User";
import { MessageType } from "./Message";

export type ConversationType = Document & {
	_id?: Types.ObjectId;
	participants: UserType[];
	messages: MessageType[];
	createdAt: Date;
	updatedAt: Date;
};