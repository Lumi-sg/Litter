import { Textarea} from "@mantine/core";
const ConversationInput = () => {
	return (
		<>
			<Textarea
				placeholder="Start a new meessage"
				mb={-10}
				minRows={1}
				maxRows={4}
				autosize
			/>
		</>
	);
};

export default ConversationInput;
