import Cookies from "js-cookie";
import { baseURL } from "../constants/baseURL";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TweetType } from "../Types/Tweet";
import { useUserStore } from "../Stores/userStore";
import { NotificationType } from "../Types/Notifications";

export const useGetNotifications = (username: string) => {
	const { user } = useUserStore();
	const firebaseToken = Cookies.get("firebaseToken");
	console.log("Fetching bookmarks...");
	return useQuery({
		queryKey: ["notifications", user?.uid as string],
		queryFn: async () => {
			const { data } = await axios.get(
				`${baseURL}/user/${username}/notifications`,
				{
					headers: {
						Authorization: `Bearer ${firebaseToken}`,
					},
				}
			);
			return data.notifications as NotificationType[];
		},
		staleTime: 30000,
        refetchInterval: 60000
	});
};
