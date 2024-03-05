import Cookies from "js-cookie";
import { baseURL } from "../constants/baseURL";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { displayNotification } from "../Helpers/displayNotification";
import { modals } from "@mantine/modals";
import { useQueryClient } from "@tanstack/react-query";

export const useTweetReply = (
	tweetContent: string,
	tweetAuthor: string,
	parentTweetID: string
) => {
	const firebaseToken = Cookies.get("firebaseToken");
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async () => {
			console.log("Creating reply...");
			const { data } = await axios.post(
				`${baseURL}/tweet/${parentTweetID}/reply`,
				{
					tweetContent,
				},
				{
					headers: {
						Authorization: `Bearer ${firebaseToken}`,
					},
				}
			);
			return data;
		},

		onSuccess: async () => {
			queryClient.invalidateQueries({
				queryKey: ["tweets", tweetAuthor],
			});
			queryClient.invalidateQueries({
				queryKey: ["profile", tweetAuthor],
			});

			queryClient.invalidateQueries({
				queryKey: ["tweets", parentTweetID],
			});

			displayNotification(
				"Tweet",
				"have successfully replied",
				"#4db5e5",
				``,
				""
			);
			modals.closeAll();
			
		},

		onError: () => {
			displayNotification("Error", "Failed to tweet", "#f87171", "", "");
		},
		retry: 1,
	});
};
