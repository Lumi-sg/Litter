import Cookies from "js-cookie";
import { baseURL } from "../constants/baseURL";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { displayNotification } from "../Helpers/displayNotification";
import { TweetType } from "../Types/Tweet";
import { useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../Stores/userStore";

export const useRemoveBookmarkTweet = (tweet: TweetType) => {
	const firebaseToken = Cookies.get("firebaseToken");
    const { user } = useUserStore();

	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async () => {
			console.log("Bookmarking tweet...");
			const { data } = await axios.post(
				`${baseURL}/tweet/${tweet._id}/removebookmark`,
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
			queryClient.invalidateQueries({
				queryKey: ["tweets", tweet._id],
			})
			displayNotification(
				"Bookmark",
				"unbookmarked",
				"#4db5e5",
				`${tweet.authorDisplayName}'s`,
				"tweet"
			);
		},
		onError: () => {
			displayNotification(
				"Error",
				"Failed to remove tweet from bookmarks",
				"#f87171",
				"",
				""
			);
		},
		retry: 1,
	});
};