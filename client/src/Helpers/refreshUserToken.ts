import { auth } from "../main";
import Cookies from "js-cookie";
import { useUserStore } from "../Stores/userStore";

export const refreshUserToken = async () => {
	const currentUser = auth.currentUser;
	if (currentUser) {
		const newToken = await currentUser.getIdToken();
		Cookies.set("firebaseToken", newToken);
		console.log("Token refresh via function");
		return;
	}
	console.log("No current user");
	useUserStore.getState().logout();
	return;
};
