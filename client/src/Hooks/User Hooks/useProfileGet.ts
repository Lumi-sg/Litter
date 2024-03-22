import Cookies from "js-cookie";
import { baseURL } from "../../constants/baseURL";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { UserType } from "../../Types/User";
import { refreshUserToken } from "../../Helpers/refreshUserToken";

export const useProfileGet = (username: string) => {
	const firebaseToken = Cookies.get("firebaseToken");

	return useQuery({
		queryKey: ["profile", username],
		queryFn: async () => {
			try {
				const { data } = await axios.get(
					`${baseURL}/user/${username}`,
					{
						headers: {
							Authorization: `Bearer ${firebaseToken}`,
						},
					}
				);
				return data.user as UserType;
			} catch (error: any) {
				if (error.response.status === 401) {
					await refreshUserToken();

				}
			}
		},
		staleTime: 30000,
	});
};
