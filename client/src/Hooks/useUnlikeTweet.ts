import Cookies from "js-cookie";
import { baseURL } from "../constants/baseURL";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { displayNotification } from "../Helpers/displayNotification";
import { TweetType } from "../Types/Tweet";
import { useQueryClient } from "@tanstack/react-query";

export const useUnlikeTweet = (tweet: TweetType) => {
	const firebaseToken = Cookies.get("firebaseToken");
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async () => {
			console.log("Unliking tweet...");
			const { data } = await axios.post(
				`${baseURL}/tweet/${tweet._id}/unlike`,
				null,
				{
					headers: {
						Authorization: `Bearer ${firebaseToken}`,
					},
				}
			);
			return data;
		},

		onSuccess: () => {
			queryClient.invalidateQueries({
                queryKey: ["tweets", tweet.authorUsername],
            });
			displayNotification(
				"Unlike",
				"unliked",
				"#4db5e5",
				`${tweet.authorDisplayName}'s`,
				"tweet"
			);
		},
		onError: () => {
			displayNotification(
				"Error",
				"Failed to unlike tweet",
				"#f87171",
				"",
				""
			);
		},
		retry: 1,
	});
};
