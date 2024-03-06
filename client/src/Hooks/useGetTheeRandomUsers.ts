import Cookies from "js-cookie";
import { baseURL } from "../constants/baseURL";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const useGetTheeRandomUsers = () => {
	const firebaseToken = Cookies.get("firebaseToken");

	return useQuery({
		queryKey: ["randomProfiles"],
		queryFn: async () => {
			const { data } = await axios.get(`${baseURL}/user/randomusers`, {
				headers: {
					Authorization: `Bearer ${firebaseToken}`,
				},
			});
			return data.arrayOfUsernames as string[];
		},
		staleTime: 30_000,
	});
};
