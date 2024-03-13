import Cookies from "js-cookie";
import { baseURL } from "../constants/baseURL";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ConversationType } from "../Types/Conversation";

export const useGetConversation = (conversationID: string) => {
	const firebaseToken = Cookies.get("firebaseToken");
	console.log("Fetching conversation...");
	return useQuery({
		queryKey: ["conversation", conversationID],
		queryFn: async () => {
			const { data } = await axios.get(
				`${baseURL}/conversation/${conversationID}`,
				{
					headers: {
						Authorization: `Bearer ${firebaseToken}`,
					},
				}
			);
			console.table(data.conversation);
			return data.conversation as ConversationType;
		},
	});
};
