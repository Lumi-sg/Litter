import admin from "firebase-admin";
import { NextFunction, Request, Response } from "express";

const serviceAccount = require("../litterFirebaseConfig.json");
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

export const verifyFirebaseToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const firebaseToken = req.headers.authorization?.split("Bearer ")[1];

	if (!firebaseToken) {
		return res.status(401).send("Unauthorized - Missing Firebase Token");
	}

	try {
		const decodedToken = await admin.auth().verifyIdToken(firebaseToken);
		(req as any).currentUser = decodedToken;
		next();
	} catch (error) {
		console.log("Error verifying Firebase token:", error);
		return res
			.status(401)
			.json({ error: "Unauthorized - Invalid Firebase token" });
	}
};
