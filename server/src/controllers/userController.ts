import express, { response } from "express";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import { UserModel } from "../models/User";
import { convertEmailToUsername } from "../helpers/convertEmailToUsername";
import { trimDisplayName } from "../helpers/trimDisplayName";

export const registerUser = asyncHandler(
	async (req: express.Request, res: express.Response) => {
		console.log("Registering user...");
		try {
			const { uid, email, name } = (req as any).currentUser;

			const existingAccount = await UserModel.findOne({ email });
			if (existingAccount) {
				console.log("Account already exists.");
				res.status(201).json({
					message: "Account already exists.",
					account: existingAccount,
				});
				return;
			}

			const convertedUsername = convertEmailToUsername(email);
			const trimmedDisplayName = trimDisplayName(name);
			const newUser = new UserModel({
				firebaseID: uid,
				email: email,
				username: convertedUsername,
				displayName: trimmedDisplayName,
			});
			const user = await newUser.save();
			console.log("Registered user:", user.username);
			res.status(201).json({
				message: "User registration successful",
				user: user,
			});
		} catch (error: any) {
			res.status(400).json({
				message: error.message,
			});
			console.log(error);
		}
	}
);
