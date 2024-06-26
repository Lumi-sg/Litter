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
export const useCreateConversation = (recipientUsername: string) => {
	const firebaseToken = Cookies.get("firebaseToken");
	const queryClient = useQueryClient();
	const { user } = useUserStore();
	const navigate = useNavigate();
	const { socket } = useSocketStore();
	const { selectedConversationID, setSelectedConversationID } =
		useSelectedConversationStore();
	return useMutation({
		mutationFn: async () => {
			const { data } = await axios.post(
				`${baseURL}/conversation/create`,
				{
					recipientUsername,
				},
				{
					headers: {
						Authorization: `Bearer ${firebaseToken}`,
					},
				}
			);
			setSelectedConversationID(data._id);
			await socket?.connect();
			return data;
		},
		onSuccess: async () => {
			queryClient.invalidateQueries({
				queryKey: ["conversations", user?.uid as string],
			});

			navigate(`/dashboard/messages/${selectedConversationID}`);

			displayNotification(
				"Conversation",
				`have successfully created a conversation with ${recipientUsername}.`,
				"#4db5e5",
				``,
				""
			);
			modals.closeAll();

			socket?.emit("createConversation", user, recipientUsername);
		},

		onError: () => {
			displayNotification(
				"Error",
				"Failed to create conversation",
				"#f87171",
				"",
				""
			);
		},
	});
};
