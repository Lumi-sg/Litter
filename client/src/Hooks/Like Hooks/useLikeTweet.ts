import Cookies from "js-cookie";
import { baseURL } from "../../constants/baseURL";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { displayNotification } from "../../Helpers/displayNotification";
import { TweetType } from "../../Types/Tweet";
import { useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../../Stores/userStore";

export const useLikeTweet = (tweet: TweetType) => {
	const { user } = useUserStore();
	const firebaseToken = Cookies.get("firebaseToken");

	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async () => {
			console.log("Liking tweet...");
			const { data } = await axios.post(
				`${baseURL}/tweet/${tweet._id}/like`,
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
				queryKey: ["bookmarks", user!.uid],
			});
			queryClient.invalidateQueries({
				queryKey: ["likes", user!.uid],
			});
			queryClient.invalidateQueries({
				queryKey: ["tweets", tweet.authorUsername],
			});
			queryClient.invalidateQueries({
				queryKey: ["tweets", tweet._id],
			});
			queryClient.invalidateQueries({
				queryKey: ["tweets", tweet.parent],
			});
			queryClient.invalidateQueries({
				queryKey: ["homefeed", user?.uid],
			});
			displayNotification(
				"Like",
				"liked",
				"#3cc94d",
				`${tweet.authorDisplayName}'s`,
				"tweet"
			);
		},
		onError: () => {
			displayNotification(
				"Error",
				"Failed to like tweet",
				"#f87171",
				"",
				""
			);
		},
		retry: 1,
	});
};
