import { Text, Box } from "@mantine/core";

type MessageCardProps = {
	userMessage: boolean;
};
const MessageCard = ({ userMessage }: MessageCardProps) => {
	return (
		<>
			<Box
				bg={userMessage ? "#2e2e2e" : "#2C2A32"}
				p={10}
				style={{
					borderRadius: 10,
					border: userMessage
						? "1px solid #424242"
						: "1px solid #8d7ac8",
				}}
				w={"35%"}
			>
				<Text size="sm" c={"white"}>
					my fiancee and I went to a live show and saw this guy's
					balls, as far as balls go they're pretty good
				</Text>
			</Box>
			<Text size="xs" c="dimmed" mt={-15}>
				10 minutes ago
			</Text>
		</>
	);
};

export default MessageCard;
