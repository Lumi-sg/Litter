import Cookies from "js-cookie";
import { baseURL } from "../../constants/baseURL";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { displayNotification } from "../../Helpers/displayNotification";
import { modals } from "@mantine/modals";
import { useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../../Stores/userStore";

export const useDeleteConversation = (conversationID: string) => {
	const firebaseToken = Cookies.get("firebaseToken");
	const queryClient = useQueryClient();
	const { user } = useUserStore();
	return useMutation({
		mutationFn: async () => {
			const { data } = await axios.delete(
				`${baseURL}/conversation/delete/${conversationID}`,
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
				queryKey: ["conversations", user?.uid as string],
			});
			displayNotification(
				"Conversation",
				`have successfully deleted the conversation.`,
				"red",
				``,
				""
			);
			modals.closeAll();
		},

		onError: () => {
			displayNotification(
				"Error",
				"Failed to delete conversation",
				"#f87171",
				"",
				""
			);
		},
	});
};
