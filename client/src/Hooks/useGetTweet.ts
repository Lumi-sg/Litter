import Cookies from "js-cookie";
import { baseURL } from "../constants/baseURL";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TweetType } from "../Types/Tweet";

export const getTweet = (tweetID: string) => {
	const firebaseToken = Cookies.get("firebaseToken");
    console.log(tweetID)
	return useQuery({
		queryKey: ["tweets", tweetID],
		queryFn: async () => {
			const { data } = await axios.get(
				`${baseURL}/tweet/${tweetID}`,
				{
					headers: {
						Authorization: `Bearer ${firebaseToken}`,
					},
				}
			);
			return data.tweet as TweetType;
		},
		staleTime: 30000,
	});
};