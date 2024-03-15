import Cookies from "js-cookie";
import { baseURL } from "../../constants/baseURL";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "../../Stores/userStore";
import { NotificationType } from "../../Types/Notifications";

export const useGetNotifications = (username: string) => {
	const { user } = useUserStore();
	const firebaseToken = Cookies.get("firebaseToken");
	return useQuery({
		queryKey: ["notifications", user?.uid as string],
		queryFn: async () => {
			const { data } = await axios.get(
				`${baseURL}/user/${username}/notifications`,
				{
					headers: {
						Authorization: `Bearer ${firebaseToken}`,
					},
				}
			);
			return data.notifications as NotificationType[];
		},
		refetchInterval: 60000,
	});
};
