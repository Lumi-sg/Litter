import ConversationHeader from "../../../../Features/ConversationHeader/ConversationHeader";
import MainConversation from "../../../../Features/MainConversation/MainConversation";
import ConversationInput from "../../../../Features/ConversationInput/ConversationInput";
import { Stack} from "@mantine/core";

const RightMessageContainer = () => {
	return (
		<Stack
			h={"calc(100vh - 5.7rem)"}
			flex={1}
		>
			<ConversationHeader />
			<MainConversation />
			<ConversationInput />
		</Stack>
	);
};

export default RightMessageContainer;
