import Cookies from "js-cookie";
import { baseURL } from "../../constants/baseURL";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ConversationType } from "../../Types/Conversation";
import { useUserStore } from "../../Stores/userStore";

export const useGetUserConversations = (username: string) => {
	const { user } = useUserStore();
	const firebaseToken = Cookies.get("firebaseToken");
	console.log("Fetching conversations...");
	return useQuery({
		queryKey: ["conversations", user?.uid as string],
		queryFn: async () => {
			const { data } = await axios.get(
				`${baseURL}/user/${username}/conversations`,
				{
					headers: {
						Authorization: `Bearer ${firebaseToken}`,
					},
				}
			);
			return data.conversations as ConversationType[];
		},
		staleTime: 3000,
	});
};
