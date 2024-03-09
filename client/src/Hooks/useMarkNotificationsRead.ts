import Cookies from "js-cookie";
import { baseURL } from "../constants/baseURL";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { NotificationType } from "../Types/Notifications";
import { useUserStore } from "../Stores/userStore";

export const useMarkNotificationsRead = (notifications: NotificationType[]) => {
	const firebaseToken = Cookies.get("firebaseToken");
    const {user} = useUserStore();

	return useMutation({
		mutationFn: async () => {
			const notificationsIDToBeMarkedRead = notifications.map(
				(notification) => notification._id
			);
            console.table(notificationsIDToBeMarkedRead)
			const { data } = await axios.post(
				`${baseURL}/user/mark-notifications-read`,
				{ notificationIds: notificationsIDToBeMarkedRead },
				{
					headers: {
						Authorization: `Bearer ${firebaseToken}`,
					},
				}
			);
			return data.notifications as NotificationType[];
		},
        
        onSuccess: () => {
            const queryClient = useQueryClient();
            queryClient.invalidateQueries({
                queryKey: ["notifications", user?.uid as string],
            })
        }
	});
};
