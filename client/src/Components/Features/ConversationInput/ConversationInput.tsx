import { ActionIcon, Textarea, rem } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import styles from "./ConversationInput.module.css";
import { useState } from "react";

const ConversationInput = () => {
	const [message, setMessage] = useState("");
	return (
		<>
			<Textarea
				placeholder="Start a new meessage"
				mb={-10}
				minRows={1}
				maxRows={4}
				autosize
				value={message}
				onChange={(event) => setMessage(event.currentTarget.value)}
				rightSection={
					<ActionIcon
						size={28}
						radius="xl"
						color={"#8d7ac8"}
						variant="filled"
						disabled={message === ""}
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
