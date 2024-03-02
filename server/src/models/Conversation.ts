import mongoose, { Document, Schema, Types } from "mongoose";
import { UserType } from "./User";

export type MessageType = Document & {
	_id?: Types.ObjectId;
	content: string;
	sender: UserType;
	senderFirebaseID: string;
	receiver: UserType;
	receiverFirebaseID: string;
	timestamp: Date;
};

export type ConversationType = Document & {
	_id?: Types.ObjectId;
	participants: UserType[];
	messages: MessageType[];
};

const conversationSchema = new Schema<ConversationType>({
	participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
	messages: [{ type: Object, required: true }],
});

conversationSchema.virtual("url").get(function () {
    return `/conversation/${this._id}`;
});

export const ConversationModel = mongoose.model<ConversationType>(
	"Conversation",
	conversationSchema
);

export default ConversationModel;
