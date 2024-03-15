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
	updatedAt: Date;
};

const conversationSchema = new Schema<ConversationType>(
	{
		participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
		messages: [{ type: Object, required: true }],
	},
	{ timestamps: true }
);

conversationSchema.virtual("url").get(function () {
	return `/conversation/${this._id}`;
});
conversationSchema.pre<ConversationType>('save', function (next) {
    if (this.isModified('messages')) {
        this.updatedAt = new Date();
    }
    next();
});
export const ConversationModel = mongoose.model<ConversationType>(
	"Conversation",
	conversationSchema
);

export default ConversationModel;
