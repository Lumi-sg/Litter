import Cookies from "js-cookie";
import { baseURL } from "../constants/baseURL";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TweetType } from "../Types/Tweet";

export const useBookmarksGet = (username: string) => {
	const firebaseToken = Cookies.get("firebaseToken");

	return useQuery({
		queryKey: ["bookmarks", username],
		queryFn: async () => {
			const { data } = await axios.get(`${baseURL}/bookmarks/${username}`, {
				headers: {
					Authorization: `Bearer ${firebaseToken}`,
				},
			});
			return data.tweets as TweetType;
		},
		staleTime: 3000,
	});
};
