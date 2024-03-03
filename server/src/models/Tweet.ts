import mongoose, { Document, Schema, Types } from "mongoose";
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
    parent: Types.ObjectId;
    children: Types.ObjectId[];
    childrenCount: number;
    timestamp: Date;
    bookmarks: string[];
    bookmarkCount: number;
};

const tweetSchema = new Schema<TweetType>({
    author: { type: Schema.Types.ObjectId, ref: "User" },
    firebaseID: { type: String, required: true },
    authorUsername: { type: String, required: true },
    authorDisplayName: { type: String, required: true },
    authorPictureURL: { type: String, required: true },
    text: { type: String, minlength: 1, maxlength: 280, required: true },
    likes: [{ type: String, required: true }],
    likesCount: { type: Number, default: 0 },
    parent: { type: Schema.Types.ObjectId, ref: "Tweet" },
    children: [{ type: Schema.Types.ObjectId, ref: "Tweet" }],
    childrenCount: { type: Number, default: 0 },
    timestamp: { type: Date, default: Date.now },
    bookmarks: [{ type: String, required: true }],
    bookmarkCount: { type: Number, default: 0 },
});

tweetSchema.virtual("url").get(function () {
    return `/tweet/${this._id}`;
});

export const TweetModel = mongoose.model<TweetType>("Tweet", tweetSchema);

export default TweetModel;