import mongoose, { Document, Schema, Types } from "mongoose";
export type TokenType = Document & {
    user: Types.ObjectId;
    refreshToken: string;
}
const TokenSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    refreshToken: { type: String, required: true },
});

export const TokenModel = mongoose.model<TokenType>("Token", TokenSchema)

export default TokenModel