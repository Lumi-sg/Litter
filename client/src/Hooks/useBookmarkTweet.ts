import Cookies from "js-cookie";
import { baseURL } from "../constants/baseURL";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { displayNotification } from "../Helpers/displayNotification";
import { TweetType } from "../Types/Tweet";
import { useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../Stores/userStore";

export const useBookmarkTweet = (tweet: TweetType) => {
	const firebaseToken = Cookies.get("firebaseToken");
    const { user } = useUserStore();

	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async () => {
			console.log("Bookmarking tweet...");
			const { data } = await axios.post(
				`${baseURL}/tweet/${tweet._id}/bookmark`,
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
                queryKey: ["tweets", tweet.authorUsername],
            })
			displayNotification(
				"Bookmark",
				"bookmarked",
				"#4db5e5",
				`${tweet.authorDisplayName}'s`,
				"tweet"
			);
		},
		onError: () => {
			displayNotification(
				"Error",
				"Failed to bookmark tweet",
				"#f87171",
				"",
				""
			);
		},
		retry: 1,
	});
};