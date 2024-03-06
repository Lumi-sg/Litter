import Cookies from "js-cookie";
import { baseURL } from "../constants/baseURL";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { UserType } from "../Types/User";

export const useProfileGet = () => {
	const firebaseToken = Cookies.get("firebaseToken");

	return useQuery({
		queryKey: ["allUsers"],
		queryFn: async () => {
			const { data } = await axios.get(`${baseURL}/allusers`, {
				headers: {
					Authorization: `Bearer ${firebaseToken}`,
				},
			});
			return data.users as UserType[];
		},
		staleTime: 3000,
	});
};