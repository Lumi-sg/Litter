import mongoose, { Document, Schema, Types } from "mongoose";
import { UserType } from "./User";

export type TweetType = Document & {
    _id?: Types.ObjectId;
    author: UserType;
    text: string;
    likes: Types.ObjectId[];
    likesCount: number;
    parent: Types.ObjectId;
    children: Types.ObjectId[];
    childrenCount: number;
    timestamp: Date;
    bookmarkCount: number;
};

const tweetSchema = new Schema<TweetType>({
    author: { type: Schema.Types.ObjectId, ref: "User" },
    text: { type: String, minlength: 1, maxlength: 280, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    likesCount: { type: Number, default: 0 },
    parent: { type: Schema.Types.ObjectId, ref: "Tweet" },
    children: [{ type: Schema.Types.ObjectId, ref: "Tweet" }],
    childrenCount: { type: Number, default: 0 },
    timestamp: { type: Date, default: Date.now },
    bookmarkCount: { type: Number, default: 0 },
});

tweetSchema.virtual("url").get(function () {
    return `/tweet/${this._id}`;
});

export const TweetModel = mongoose.model<TweetType>("Tweet", tweetSchema);

export default TweetModel;