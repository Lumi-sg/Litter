import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type SelectedConversationStoreType = {
	selectedConversationID: string;
	setSelectedConversationID: (conversationID: string) => void;
};

export const useSelectedConversationStore =
	create<SelectedConversationStoreType>()(
		persist(
			devtools((set) => ({
				selectedConversationID: "",
				setSelectedConversationID: (conversationID) => {
					set({ selectedConversationID: conversationID });
				},
			})),
			{
				name: "selected-conversation",
			}
		)
	);
