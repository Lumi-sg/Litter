import Cookies from "js-cookie";
import { baseURL } from "../constants/baseURL";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { NotificationType } from "../Types/Notifications";
import { useUserStore } from "../Stores/userStore";

export const useMarkNotificationsRead = (notifications: NotificationType[]) => {
	const firebaseToken = Cookies.get("firebaseToken");
	const queryClient = useQueryClient();
	const { user } = useUserStore();

	return useMutation({
		mutationFn: async () => {
			const notificationsIDToBeMarkedRead = notifications
				.filter((notification) => !notification.read)
				.map((notification) => notification._id);
			if (notificationsIDToBeMarkedRead.length === 0) return;
			const { data } = await axios.post(
				`${baseURL}/user/mark-notifications-read`,
				{ notificationIDArray: notificationsIDToBeMarkedRead },
				{
					headers: {
						Authorization: `Bearer ${firebaseToken}`,
					},
				}
			);
			return data.notifications as NotificationType[];
		},

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["notifications", user?.uid as string],
			});
		},
	});
};
