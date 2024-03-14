import Cookies from "js-cookie";
import { baseURL } from "../../constants/baseURL";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { displayNotification } from "../../Helpers/displayNotification";
import { modals } from "@mantine/modals";

export const useCreateNewMessage = (  conversationID: string,
    messageContent: string,
    recipientUsername: string) => {
	const firebaseToken = Cookies.get("firebaseToken");
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async () => {
			console.log("Creating message...");
            console.log(messageContent, recipientUsername, conversationID)
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
			queryClient.invalidateQueries({
				queryKey: ["conversation", conversationID],
			});

            displayNotification(
                "Message",
                "have successfully sent",
                "#4db5e5",
                ``,
                ""
            );
            modals.closeAll();
		},
		onError: () => {
			console.log("Failed to create message");
		},
	});
};
