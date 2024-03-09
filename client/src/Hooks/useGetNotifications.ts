import Cookies from "js-cookie";
import { baseURL } from "../constants/baseURL";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TweetType } from "../Types/Tweet";
import { useUserStore } from "../Stores/userStore";

export const useGetNotifications = (username: string) => {
	const { user } = useUserStore();
	const firebaseToken = Cookies.get("firebaseToken");
	console.log("Fetching bookmarks...");
	return useQuery({
		queryKey: ["notifications", username],
		queryFn: async () => {
			const { data } = await axios.get(
				`${baseURL}/user/${username}/notifications`,
				{
					headers: {
						Authorization: `Bearer ${firebaseToken}`,
					},
				}
			);
            console.table(data.notifications)
			return data.notifications;
		},
		staleTime: 3000,
	});
};
