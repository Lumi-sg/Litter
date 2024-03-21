import Cookies from "js-cookie";
import { baseURL } from "../../constants/baseURL";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { UserType } from "../../Types/User";
import { useUserStore } from "../../Stores/userStore";
import { auth } from "../../main";

export const useProfileGet = (username: string) => {
	const {userIDToken} = useUserStore();
	const newFirebaseToken = userIDToken
	const firebaseToken = Cookies.get("firebaseToken");

	return useQuery({
		queryKey: ["profile", username],
		queryFn: async () => {
			const { data } = await axios.get(`${baseURL}/user/${username}`, {
				headers: {
					Authorization: `Bearer ${newFirebaseToken}`,
				},
			});
			return data.user as UserType;
		},
		staleTime: 3000,
	});
};
