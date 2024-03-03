import { Document, Types } from "mongoose";
import { UserType } from "./User";

export type TweetType = Document & {
	_id?: Types.ObjectId;
    firebaseID?: string;
	author: UserType;
	authorUsername: string;
	authorDisplayName: string;
	authorPictureURL: string;
	text: string;
	likes: string[];
	likesCount: number;
	parent: string;
	children: string[];
	childrenCount: number;
	timestamp: Date;
	bookmarkCount: number;
};

export default TweetType;
