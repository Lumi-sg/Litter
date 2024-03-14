import { Text, Box, Center } from "@mantine/core";
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
				bg={!isLoggedInUserMessage ? "#2e2e2e" : "#2C2A32"}
				p={15}
				style={{
					border: !isLoggedInUserMessage
						? "1px solid gray"
						: "1px solid #8d7ac8",
					borderRadius: "20px",
					borderBottomLeftRadius: !isLoggedInUserMessage
						? "5px"
						: "20px",
					borderBottomRightRadius: !isLoggedInUserMessage
						? "20px"
						: "5px",
					borderTopLeftRadius: "20px",
					borderTopRightRadius: "20px",
				}}
				w={"fit-content"}
				mt={10}
				maw={"50%"}
			>
				<Center>
					<Text size="md" c={"white"} ta="left">
						{message.content}
					</Text>
				</Center>
			</Box>
			<Text size="xs" c="dimmed" mt={-15} mb={10}>
				{formatTimeStamp(message.timestamp.toString())}
			</Text>
		</>
	);
};

export default MessageCard;
