import Cookies from "js-cookie";
import { baseURL } from "../constants/baseURL";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { UserType } from "../Types/User";

export const useGetTheeRandomUsers = () => {
	const firebaseToken = Cookies.get("firebaseToken");

	return useQuery({
		queryKey: ["profile"],
		queryFn: async () => {
			const { data } = await axios.get(
				`${baseURL}/user/randomusers`,
				{
					headers: {
						Authorization: `Bearer ${firebaseToken}`,
					},
				}
			);
            console.table(data.users)
			return data.users as UserType[];
		},
        
	});
};
