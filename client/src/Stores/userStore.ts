import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { auth, provider, signInWithPopup } from "../main";
import { User as FirebaseUser } from "firebase/auth";

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
				const credentials = await signInWithPopup(auth, provider);
				if (!credentials) return;
				set(
					{ user: credentials.user, isLoggedIn: true },
					false,
					"login"
				);
				localStorage.setItem(
					"firebaseToken",
					await credentials.user.getIdToken()
				);
			},
			logout: () => {
				set({ user: null, isLoggedIn: false }, false, "logout");
				localStorage.removeItem("firebaseToken");
			},
		})),
		{ name: "user-store" }
	)
);
