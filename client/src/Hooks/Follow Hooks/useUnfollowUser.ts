import Cookies from "js-cookie";
import { baseURL } from "../../constants/baseURL";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { displayNotification } from "../../Helpers/displayNotification";
import { useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../../Stores/userStore";
import { convertEmailToUsername } from "../../Helpers/convertEmailToUsername";

export const useUnfollowUser = (usernameToUnfollow: string) => {
	const firebaseToken = Cookies.get("firebaseToken");
	const { user } = useUserStore();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async () => {
			const { data } = await axios.post(
				`${baseURL}/user/${usernameToUnfollow}/unfollow`,
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
			queryClient.invalidateQueries({
				queryKey: ["profile", usernameToUnfollow],
			});
			queryClient.invalidateQueries({
				queryKey: [
					"profile",
					convertEmailToUsername(user?.email as string),
				],
			});
			queryClient.invalidateQueries({
				queryKey: ["tweets", usernameToUnfollow],
			});
			queryClient.invalidateQueries({
				queryKey: ["homefeed", user?.uid],
			});

			displayNotification(
				"Unfollow",
				`have successfully unfollowed ${usernameToUnfollow}.`,
				"#e03131",
				``,
				""
			);
		},
		onError: () => {
			displayNotification(
				"Error",
				"Failed to unfollow user",
				"#f87171",
				"",
				""
			);
		},
	});
};
