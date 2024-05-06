import Cookies from "js-cookie";
import { baseURL } from "../../constants/baseURL";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { displayNotification } from "../../Helpers/displayNotification";

export const useCreateNewMessage = (
	conversationID: string,
	messageContent: string,
	recipientUsername: string
) => {
	const firebaseToken = Cookies.get("firebaseToken");
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async () => {
			const { data } = await axios.post(
				`${baseURL}/conversation/newmessage/${conversationID}`,
				{
					recipientUsername: recipientUsername,
					messageContent: messageContent,
				},
				{
					headers: {
						Authorization: `Bearer ${firebaseToken}`,
					},
				}
			);
			return data;
		},
		onSuccess: () => {
			// queryClient.invalidateQueries({
			// 	queryKey: ["conversation", conversationID],
			// });
		},
		onError: () => {
			displayNotification(
				"Error",
				"Failed to send message",
				"#f87171",
				"",
				""
			);
		},
	});
};
