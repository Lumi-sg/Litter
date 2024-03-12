import { auth } from "../main";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const refreshFirebaseToken = async () => {
	const user = auth.currentUser;

	if (user) {
		try {
			const newToken = await user.getIdToken(true); // Force refresh the token
			Cookies.set("firebaseToken", newToken, { expires: 7 });
			const expirationDate = getTokenExpirationDate(newToken);
			if (expirationDate) {
				console.log(
					"New token expiration date:",
					expirationDate.toLocaleString()
				);
			} else {
				console.log(
					"New token does not have an expiration date or is invalid."
				);
			}
			console.log("refreshFireBaseToken fired!");
		} catch (error) {
			console.error("Error refreshing Firebase token:", error);
		}
	}
};
const getTokenExpirationDate = (token: string): Date | null => {
	const decodedToken: { exp?: number } = jwtDecode(token);
	if (!decodedToken.exp) return null;

	// Convert the expiration timestamp to a JavaScript Date object
	const expirationDate = new Date(decodedToken.exp * 1000);
	return expirationDate;
};

export default refreshFirebaseToken;
