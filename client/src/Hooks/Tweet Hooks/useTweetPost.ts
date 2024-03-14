import Cookies from "js-cookie";
import { baseURL } from "../../constants/baseURL";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { displayNotification } from "../../Helpers/displayNotification";
import { modals } from "@mantine/modals";
import { useQueryClient } from "@tanstack/react-query";

export const useTweetPost = (tweetContent: string, tweetAuthor: string) => {
	const firebaseToken = Cookies.get("firebaseToken");
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async () => {
			console.log("Creating tweet...");
			const { data } = await axios.post(
				`${baseURL}/tweet/create`,
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

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["tweets", tweetAuthor],
			});
			queryClient.invalidateQueries({
				queryKey: ["profile", tweetAuthor],
			});

			displayNotification(
				"Tweet",
				"have successfully tweeted",
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
