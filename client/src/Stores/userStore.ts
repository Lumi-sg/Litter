import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { auth, provider, signInWithPopup } from "../main";
import { User as FirebaseUser } from "firebase/auth";
import Cookies from "js-cookie";

type userStoreType = {
	user: FirebaseUser | null;
	setUser: (user: FirebaseUser | null) => void;
	isLoggedIn: boolean;
	setIsLoggedIn: (isLoggedIn: boolean) => void;
	login: () => void;
	logout: () => void;
};

export const useUserStore = create<userStoreType>()(
	persist(
		devtools((set) => ({
			user: null,
			setUser: (user) => set({ user }, false, "setUser"),
			isLoggedIn: false,
			setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
			login: async () => {
				try {
					const credentials = await signInWithPopup(auth, provider);
					if (!credentials) {
						console.error("Login failed: No credentials received");
						return;
					}

					set(
						{ user: credentials.user, isLoggedIn: true },
						false,
						"login"
					);

					// Save ID token to a cookie
					Cookies.set(
						"firebaseToken",
						await credentials.user.getIdToken(),
						{ expires: 7 }
					);
				} catch (error) {
					console.error("Login error:", error);
					// Handle error
				}
			},
			logout: () => {
				set({ user: null, isLoggedIn: false }, false, "logout");

				// Clear cookie
				Cookies.remove("firebaseToken");
			},
		})),
		{ name: "user-store" }
	)
);
