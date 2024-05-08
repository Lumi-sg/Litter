import Cookies from "js-cookie";
import { baseURL } from "../../constants/baseURL";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { NotificationType } from "../../Types/Notifications";
import { useUserStore } from "../../Stores/userStore";
import { displayNotification } from "../../Helpers/displayNotification";

export const useMarkSingleNotificationRead = () => {
	const firebaseToken = Cookies.get("firebaseToken");
	const { user } = useUserStore();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (notificationID: string) => {
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

		onMutate: (notificationID: string) => {
			queryClient.setQueryData(
				["notifications", user?.uid as string],
				(prevNotifications: NotificationType[]) => {
					const updatedNotifications = prevNotifications.map(
						(notification) => {
							if (notification._id === notificationID) {
								return {
									...notification,
									read: true,
								};
							}
							return notification;
						}
					);
					return updatedNotifications;
				}
			);
		},

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["notifications", user?.uid as string],
			});
		},
		onError: (notificationID: string) => {
			queryClient.setQueryData(
				["notifications", user?.uid as string],
				(prevNotifications: NotificationType[]) => {
					const updatedNotifications = prevNotifications.map(
						(notification) => {
							if (notification._id === notificationID) {
								return {
									...notification,
									read: false,
								};
							}
							return notification;
						}
					);
					return updatedNotifications;
				}
			);
			displayNotification(
				"Error",
				"Failed to mark notification as read",
				"#f87171",
				"",
				""
			);
		},
	});
};
