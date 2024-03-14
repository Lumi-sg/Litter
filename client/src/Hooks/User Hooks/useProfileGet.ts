import Cookies from "js-cookie";
import { baseURL } from "../../constants/baseURL";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { UserType } from "../../Types/User";

export const useProfileGet = (username: string) => {
	const firebaseToken = Cookies.get("firebaseToken");

	return useQuery({
		queryKey: ["profile", username],
		queryFn: async () => {
			const { data } = await axios.get(`${baseURL}/user/${username}`, {
				headers: {
					Authorization: `Bearer ${firebaseToken}`,
				},
			});
			return data.user as UserType;
		},
		staleTime: 3000,
	});
};
