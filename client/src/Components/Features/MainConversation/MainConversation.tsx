import { Center, Flex, ScrollArea, Stack } from "@mantine/core";
import MessageCard from "../MessageCard/MessageCard";
import { useRef, useEffect } from "react";
import styles from "./MainConversation.module.css";
import { ConversationType } from "../../../Types/Conversation";
import { useUserStore } from "../../../Stores/userStore";

type MainConversationProps = {
	conversation: ConversationType;
};

const MainConversation = ({ conversation }: MainConversationProps) => {
	const scrollHere = useRef<HTMLDivElement>(null);
	const { user } = useUserStore();

	const handleScroll = () => {
		if (scrollHere.current) {
			scrollHere.current.scrollIntoView({ behavior: "smooth" });
		}
	};

	useEffect(() => {
		handleScroll();
	}, []);

	useEffect(() => {
		handleScroll();
	}, [conversation]);
	return (
		<Flex mr={5} gap={20} direction="column-reverse" h={"100%"} c={"white"}>
			<ScrollArea
				offsetScrollbars
				scrollbarSize={4}
				mah={"calc(100vh - 13.25rem)"}
				classNames={styles}
			>
				{conversation.messages.length === 0 && (
					<Center h={"100%"} w={"100%"}>
						Start your conversation!
					</Center>
				)}
				{conversation.messages.map((message) => (
					<Stack
						key={message.timestamp.toString()}
						align={
							message.senderFirebaseID === user?.uid
								? "flex-end"
								: "flex-start"
						}
						mr={10}
					>
						<MessageCard
						key={message._id}
							message={message}
							isLoggedInUserMessage={
								message.senderFirebaseID === user?.uid
							}
						/>
					</Stack >
				))}

				<div ref={scrollHere}></div>
			</ScrollArea>
		</Flex>
	);
};

export default MainConversation;
