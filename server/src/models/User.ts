import mongoose, { Document, Schema, Types } from "mongoose";

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
};

const UserSchema = new Schema({
	firebaseID: { type: String, required: true },
	email: { type: String, required: true },
	username: { type: String, required: true },
	displayName: { type: String, required: true },
	followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
	followCount: { type: Number, default: 0 },
	following: [{ type: Schema.Types.ObjectId, ref: "User" }],
	followerCount: { type: Number, default: 0 },
	tweetCount: { type: Number, default: 0 },
	bookmarks: [{ type: Schema.Types.ObjectId, ref: "Tweet" }],
});

UserSchema.virtual("url").get(function () {
	return `/user/${this._id}`;
});

export const UserModel = mongoose.model<UserType>("User", UserSchema);

export default UserModel;
