import Cookies from "js-cookie";
import { baseURL } from "../constants/baseURL";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TweetType } from "../Types/Tweet";
import { useUserStore } from "../Stores/userStore";

export const useGetUserBookmarks = (username: string) => {
	const { user } = useUserStore();
	const firebaseToken = Cookies.get("firebaseToken");
	console.log("Fetching bookmarks...");
	return useQuery({
		queryKey: ["bookmarks", user?.uid],
		queryFn: async () => {
			const { data } = await axios.get(
				`${baseURL}/user/${username}/bookmarks`,
				{
					headers: {
						Authorization: `Bearer ${firebaseToken}`,
					},
				}
			);
			return data.tweets as TweetType[];
		},
		staleTime: 3000,
	});
};
