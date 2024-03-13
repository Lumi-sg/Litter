import { useUserStore } from "../Stores/userStore";
import { UserType } from "../Types/User";

const user = useUserStore.getState().user;

export const getOtherUserInConversation = (conversationUsers: UserType[]) => {
	return conversationUsers.find(
		(conversationUser) => conversationUser.firebaseID !== user?.uid
	);
};
