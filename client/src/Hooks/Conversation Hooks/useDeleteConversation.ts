import Cookies from "js-cookie";
import { baseURL } from "../../constants/baseURL";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { displayNotification } from "../../Helpers/displayNotification";
import { modals } from "@mantine/modals";
import { useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../../Stores/userStore";
import { useNavigate } from "react-router-dom";
import { useSelectedConversationStore } from "../../Stores/selectedConversationStore";
import { useSocketStore } from "../../Stores/socketStore";

export const useDeleteConversation = (conversationID: string) => {
	const firebaseToken = Cookies.get("firebaseToken");
    const { setSelectedConversationID } = useSelectedConversationStore();
	const queryClient = useQueryClient();
    const navigate = useNavigate();
	const { user } = useUserStore();
	const { socket } = useSocketStore();
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
            setSelectedConversationID("")
			console.log(user?.displayName)
			socket?.emit("deleteConversation", conversationID, user)
            navigate("/dashboard/messages")
            
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
