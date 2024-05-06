import ConversationHeader from "../../../../Features/ConversationHeader/ConversationHeader";
import MainConversation from "../../../../Features/MainConversation/MainConversation";
import ConversationInput from "../../../../Features/ConversationInput/ConversationInput";
import { Center, Stack } from "@mantine/core";
import { useParams } from "react-router-dom";
import { useGetConversation } from "../../../../../Hooks/Conversation Hooks/useGetConversation";
import LoadingTweet from "../../../../Features/LoadingTweet/LoadingTweet";
import { ConversationType } from "../../../../../Types/Conversation";
import { ErrorPage } from "../../../../Features/ErrorPage/ErrorPage";
import { useEffect } from "react";
import {useSelectedConversationStore} from "../../../../../Stores/selectedConversationStore"


const RightMessageContainer = () => {
	const { conversationID } = useParams();
	const { setSelectedConversationID } = useSelectedConversationStore();
	const {
		data: conversation,
		isLoading: isConversationLoading,
		error,
	} = useGetConversation(conversationID as string);
	const showConversation = conversationID && !isConversationLoading;

	if (error) {
		return <ErrorPage errorMessage={error.message} />;
	}

	useEffect(() => {
		if (conversationID){
			setSelectedConversationID(conversationID);
		}	
	},[])

	return (
		<Stack h={"calc(100vh - 5.7rem)"} flex={1}>
			{" "}
			{!showConversation && !isConversationLoading ? (
				<Center h={"100%"} w={"100%"}>
					Start a new conversation!
				</Center>
			) : isConversationLoading ? (
				<Center>
					<LoadingTweet />
				</Center>
			) : (
				<>
					<ConversationHeader
						conversation={conversation as ConversationType}
					/>
					<MainConversation
						conversation={conversation as ConversationType}
					/>
					<ConversationInput
						conversation={conversation as ConversationType}
					/>
				</>
			)}
		</Stack>
	);
};

export default RightMessageContainer;
