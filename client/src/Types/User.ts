import { Document, Types } from "mongoose";

export type UserType = Document & {
	_id?: Types.ObjectId;
	firebaseID: string;
	email: string;
	username: string;
	displayName: string;
	followers: UserType[];
	followCount: number;
	following: UserType[];
	followerCount: number;
	tweetCount: number;
	bookmarks: Types.ObjectId[];
	pictureURL: string;
};

export default UserType