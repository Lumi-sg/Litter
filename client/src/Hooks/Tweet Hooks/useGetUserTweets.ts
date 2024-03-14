import Cookies from "js-cookie";
import { baseURL } from "../../constants/baseURL";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TweetType } from "../../Types/Tweet";

export const useGetUserTweets = (username: string) => {
	const firebaseToken = Cookies.get("firebaseToken");
	return useQuery({
		queryKey: ["tweets", username],
		queryFn: async () => {
			const { data } = await axios.get(
				`${baseURL}/user/${username}/tweets`,
				{
					headers: {
						Authorization: `Bearer ${firebaseToken}`,
					},
				}
			);
			return data.tweets as TweetType[];
		},
		staleTime: 60000,
	});
};
