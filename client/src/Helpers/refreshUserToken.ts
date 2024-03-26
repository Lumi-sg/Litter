import { auth } from "../main";
import Cookies from "js-cookie";
import { useUserStore } from "../Stores/userStore";
import { signInWithCustomToken } from "firebase/auth";

export const refreshUserToken = async () => {
	const currentUser = auth.currentUser;
	if (currentUser) {
		const newToken = await currentUser.getIdToken();
		Cookies.set("firebaseToken", newToken);
		console.log("Token refresh via function");
		return;
	}
	const firebaseToken = Cookies.get("firebaseToken");
	signInWithCustomToken(auth, firebaseToken as string)
		.then((userCredential) => {
			const user = userCredential.user;
			useUserStore.getState().setUser(user);
			console.log("Token refresh via cookie");
			console.log(user);
		})
		.catch((error) => {
			console.log(error);
			useUserStore.getState().logout();
		});
};
