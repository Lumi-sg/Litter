import Cookies from "js-cookie";
import { baseURL } from "../../constants/baseURL";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

export const useCreateNewMessage = (  conversationID: string,
    messageContent: string,
    recipientUsername: string) => {
	const firebaseToken = Cookies.get("firebaseToken");
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async () => {
			console.log("Creating message...");
			const { data } = await axios.post(
				`${baseURL}/conversastion/${conversationID}/newMessage`,
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
			queryClient.invalidateQueries({
				queryKey: ["conversation", conversationID],
			});
		},
		onError: () => {
			console.log("Failed to create message");
		},
	});
};
