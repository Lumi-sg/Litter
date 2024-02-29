import { ActionIcon, TextInput, Textarea, rem } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import styles from "./ConversationInput.module.css";
import { useState } from "react";

const ConversationInput = () => {
	const [message, setMessage] = useState("");

	const handleSubmit = () => {
		setMessage("");
	};
	return (
		<>
			<TextInput
				placeholder="Start a new meessage"
				mb={-10}
				value={message}
				size="md"
				onChange={(event) => setMessage(event.currentTarget.value)}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						handleSubmit();
					}
				}}
				rightSection={
					<ActionIcon
						size={28}
						radius="xl"
						color={"#8d7ac8"}
						variant="filled"
						disabled={message === ""}
						onClick={handleSubmit}
					>
						<IconArrowRight
							style={{ width: rem(18), height: rem(18) }}
							stroke={2}
							color="#242424"
						/>
					</ActionIcon>
				}
				radius={"md"}
				classNames={{
					input: styles.input,
				}}
			/>
		</>
	);
};

export default ConversationInput;
