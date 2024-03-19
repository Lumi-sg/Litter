import mongoose, { Document, Schema, Types } from "mongoose";
export type TokenType = Document & {
    user: Types.ObjectId;
    token: string;
}
const TokenSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    token: { type: String, required: true },
});