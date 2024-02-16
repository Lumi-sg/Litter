import { Text,Box } from "@mantine/core";

type MessageCardProps = {
	userMessage: boolean;
};
const MessageCard = ({ userMessage }: MessageCardProps) => {
	return (
		<>
			<Box
				bg={userMessage ? "#2e2e2e" : "#2C2A32"}
				p={10}
				style={{ borderRadius: 10, border: "1px solid #8d7ac8" }}
				w={"35%"}
			>
				<Text size="sm" c={"white"}>
					This Pokémon likes to lick its palms that are sweetened by
					being soaked in honey.
				</Text>
			</Box>
			<Text size="xs" c="dimmed" mt={-15}>
				10 minutes ago
			</Text>
		</>
	);
};

export default MessageCard;
