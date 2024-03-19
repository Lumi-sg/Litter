import Cookies from "js-cookie";
import { baseURL } from "../../constants/baseURL";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TweetType } from "../../Types/Tweet";

export const getTweet = (tweetID: string) => {
	const firebaseToken = Cookies.get("firebaseToken");
	console.log("firing getTweet")
	return useQuery({
		queryKey: ["tweets", tweetID],
		queryFn: async () => {
			try{
			const { data } = await axios.get(`${baseURL}/tweet/${tweetID}`, {
				headers: {
					Authorization: `Bearer ${firebaseToken}`,
				},
			});
			return data as TweetType;
		}catch(error){
			console.log(error)
		}
		},
	});
};
