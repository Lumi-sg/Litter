import Cookies from "js-cookie";
import { baseURL } from "../constants/baseURL";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { NotificationType } from "../Types/Notifications";
import { useUserStore } from "../Stores/userStore";

export const useMarkSingleNotificationRead = () => {
	const firebaseToken = Cookies.get("firebaseToken");
	const { user } = useUserStore();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (notificationID: string) => {
			console.log("notificationID", notificationID);

			const { data } = await axios.post(
				`${baseURL}/user/marknotificationread/${notificationID}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${firebaseToken}`,
					},
				}
			);
			return data.notification as NotificationType;
		},

		onSuccess: () => {
			console.log("Notification marked read successfully");

			queryClient.invalidateQueries({
				queryKey: ["notifications", user?.uid as string],
			});
		},
	});
};
