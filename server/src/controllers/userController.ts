import express, { response } from "express";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import { UserModel } from "../models/User";
import { convertEmailToUsername } from "../helpers/convertEmailToUsername";

export const registerUser = asyncHandler(
	async (req: express.Request, res: express.Response) => {
		try {
			const { firebaseID, email, displayName } = req.body;

			const existingAccount = await UserModel.findOne({ email });
			if (existingAccount) {
                res.status(201).json({
                    message: "Account already exists.",
                    account: existingAccount,
                });
			}

			const convertedUsername = convertEmailToUsername(email);
			const newUser = new UserModel({
				firebaseID,
				email,
				convertedUsername,
				displayName,
			});
			const user = await newUser.save();
			res.status(201).json({
				message: "User registration successful",
				user: user,
			});
		} catch (error: any) {
			res.status(400).json({
				message: error.message,
			});
		}
	}
);
