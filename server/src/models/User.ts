import mongoose, { Document, Schema, Types } from "mongoose";

export type UserType = Document & {
	_id?: Types.ObjectId;
    firebaseID: string;
    Email: string;
	username: string;
	followers: UserType[];
	followCount: number;
	following: UserType[];
	followerCount: number;
	tweetCount: number;
    bookmarks: Types.ObjectId[];
};
