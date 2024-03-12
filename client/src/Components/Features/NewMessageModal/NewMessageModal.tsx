import { Searchbox } from "../Searchbox/Searchbox";
import MessageRecipientPreview from "../MessageRecipientPreview/MessageRecipientPreview";
import { ScrollArea, Stack } from "@mantine/core";
import styles from "./NewMessageModal.module.css";
import { BrowserRouter } from "react-router-dom";



const NewMessageModal = () => {
	return (
		<BrowserRouter>
		<Stack>
			<Searchbox />
			<ScrollArea h={325} scrollbarSize={4} scrollbars="y" classNames={styles} style={{
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5
            }}>
				<MessageRecipientPreview />
				<MessageRecipientPreview />
				<MessageRecipientPreview />
				<MessageRecipientPreview />
				<MessageRecipientPreview />
				<MessageRecipientPreview />
				<MessageRecipientPreview />
				<MessageRecipientPreview />
				<MessageRecipientPreview />
				<MessageRecipientPreview />
			</ScrollArea>
		</Stack>
		</BrowserRouter>
	);
};

export default NewMessageModal;
