import Cookies from "js-cookie";
import { baseURL } from "../constants/baseURL";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { displayNotification } from "../Helpers/displayNotification";
import { useQueryClient } from "@tanstack/react-query";

export const useFollowUser = (usernameToFollow: string) => {
	const firebaseToken = Cookies.get("firebaseToken");
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
            queryClient.invalidateQueries({
                queryKey: ["profile", usernameToFollow],
            });
            displayNotification(
                "Follow",
                `have successfully followed ${usernameToFollow}.`,
                "#4db5e5",
                ``,
                ""
            );
        }
	});
};