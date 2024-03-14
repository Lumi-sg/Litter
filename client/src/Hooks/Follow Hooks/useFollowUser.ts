import Cookies from "js-cookie";
import { baseURL } from "../../constants/baseURL";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { displayNotification } from "../../Helpers/displayNotification";
import { useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../../Stores/userStore";
import { convertEmailToUsername } from "../../Helpers/convertEmailToUsername";

export const useFollowUser = (usernameToFollow: string) => {
	const firebaseToken = Cookies.get("firebaseToken");
	const { user } = useUserStore();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async () => {
			console.log("Following user...");
			const { data } = await axios.post(
				`${baseURL}/user/${usernameToFollow}/follow`,
				{},
				{
					headers: {
						Authorization: `Bearer ${firebaseToken}`,
					},
				}
			);
			return data;
		},
		onSuccess: async () => {
			console.log(`invalidating queries... ${usernameToFollow}`);
			queryClient.invalidateQueries({
				queryKey: ["profile", usernameToFollow],
			});
			queryClient.invalidateQueries({
				queryKey: [
					"profile",
					convertEmailToUsername(user?.email as string),
				],
			});
			queryClient.invalidateQueries({
				queryKey: ["tweets", usernameToFollow],
			});
			queryClient.invalidateQueries({
				queryKey: ["homefeed", user?.uid],
			});
			queryClient.invalidateQueries({
				queryKey: ["followedUsers", user?.uid],
			});

			displayNotification(
				"Follow",
				`have successfully followed ${usernameToFollow}.`,
				"#3cc94d",
				``,
				""
			);
		},
		onError: () => {
			displayNotification(
				"Error",
				"Failed to follow user",
				"#f87171",
				"",
				""
			);
		},
	});
};
