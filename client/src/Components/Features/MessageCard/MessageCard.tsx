import { Text, Box } from "@mantine/core";
import { MessageType } from "../../../Types/Message";
import formatTimeStamp from "../../../Helpers/formatTimeStamp";

type MessageCardProps = {
	message: MessageType;
	isLoggedInUserMessage: boolean;
};
const MessageCard = ({ message, isLoggedInUserMessage }: MessageCardProps) => {
	return (
		<>
			<Box
				bg={isLoggedInUserMessage ? "#2e2e2e" : "#2C2A32"}
				p={20}
				style={{
					borderRadius: 10,
					border: isLoggedInUserMessage
						? "1px solid #424242"
						: "1px solid #8d7ac8",
				}}
				w={"40%"}
			>
				<Text size="sm" c={"white"}>
					{message.content}
				</Text>
			</Box>
			<Text size="xs" c="dimmed" mt={-15}>
				{formatTimeStamp(message.timestamp.toString())}
			</Text>
		</>
	);
};

export default MessageCard;
