// userStore.ts
import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import Cookies from "js-cookie";
import { signInWithPopup, auth, provider } from "../main";
import { User as FirebaseUser } from "firebase/auth";

type userStoreType = {
	user: FirebaseUser | null;
	setUser: (user: FirebaseUser | null) => void;
	isLoggedIn: boolean;
	setIsLoggedIn: (isLoggedIn: boolean) => void;
	login: () => Promise<boolean>;
	logout: () => Promise<boolean>;
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
						return false;
					}

					set(
						{ user: credentials.user, isLoggedIn: true },
						false,
						"login"
					);

					// Save the Firebase ID token to a cookie
					Cookies.set(
						"firebaseToken",
						await credentials.user.getIdToken(),
						{ expires: 7 }
					);

					// Example: Navigate to the dashboard after successful login
					return true;
				} catch (error) {
					console.error("Login error:", error);
					// Handle the error (e.g., display a user-friendly error message)
					return false;
				}
			},
			logout: async () => {
				try {
					set({ user: null, isLoggedIn: false }, false, "logout");

					// Clear the Firebase ID token cookie
					Cookies.remove("firebaseToken");

					// Example: Navigate to the home page after logout
					return true;
				} catch (error) {
					console.error("Logout error:", error);
					// Handle the error (e.g., display a user-friendly error message)
					return false;
				}
			},
		})),
		{ name: "user-store" }
	)
);
