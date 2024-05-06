import { Document, Types } from "mongoose";
import { UserType } from "./User";
export type MessageType = Document & {
	_id?: Types.ObjectId;
	content: string;
	sender?: UserType;
	senderFirebaseID: string;
	receiver?: UserType;
	receiverFirebaseID?: string;
	timestamp: Date;
};
