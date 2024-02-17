import { Flex, ScrollArea, Stack } from "@mantine/core";
import MessageCard from "../MessageCard/MessageCard";
import { useRef, useEffect } from "react";
import styles from "./MainConversation.module.css";

const MainConversation = () => {
	const scrollHere = useRef<HTMLDivElement>(null);

	const handleScroll = () => {
		if (scrollHere.current) {
			scrollHere.current.scrollIntoView({ behavior: "smooth" });
		}
	};

	useEffect(() => {
		handleScroll();
	}, []);
	return (
		<Flex mr={5} gap={20} direction="column-reverse" h={"100%"} c={"white"}>
			<ScrollArea
				offsetScrollbars
				scrollbarSize={4}
				mah={"calc(100vh - 13.25rem)"}
				classNames={styles}
			>
				<Stack align="flex-end" mr={10}>
					<MessageCard userMessage={false} />
				</Stack>
				<Stack align="flex-start" mr={10}>
					<MessageCard userMessage={true} />
				</Stack>{" "}
				<Stack align="flex-end" mr={10}>
					<MessageCard userMessage={false} />
				</Stack>
				<Stack align="flex-start" mr={10}>
					<MessageCard userMessage={true} />
				</Stack>{" "}
				<Stack align="flex-end" mr={10}>
					<MessageCard userMessage={false} />
				</Stack>
				<Stack align="flex-start" mr={10}>
					<MessageCard userMessage={true} />
				</Stack>{" "}
				<Stack align="flex-end" mr={10}>
					<MessageCard userMessage={false} />
				</Stack>
				<Stack align="flex-start" mr={10}>
					<MessageCard userMessage={true} />
				</Stack>{" "}
				<Stack align="flex-end" mr={10}>
					<MessageCard userMessage={false} />
				</Stack>
				<Stack align="flex-start" mr={10}>
					<MessageCard userMessage={true} />
				</Stack>{" "}
				<Stack align="flex-end" mr={10}>
					<MessageCard userMessage={false} />
				</Stack>
				<Stack align="flex-start" mr={10}>
					<MessageCard userMessage={true} />
				</Stack>{" "}
				<Stack align="flex-end" mr={10}>
					<MessageCard userMessage={false} />
				</Stack>
				<Stack align="flex-start" mr={10}>
					<MessageCard userMessage={true} />
				</Stack>{" "}
				<Stack align="flex-end" mr={10}>
					<MessageCard userMessage={false} />
				</Stack>
				<Stack align="flex-start" mr={10}>
					<MessageCard userMessage={true} />
				</Stack>{" "}
				<Stack align="flex-end" mr={10}>
					<MessageCard userMessage={false} />
				</Stack>
				<Stack align="flex-start" mr={10}>
					<MessageCard userMessage={true} />
				</Stack>{" "}
				<Stack align="flex-end" mr={10}>
					<MessageCard userMessage={false} />
				</Stack>
				<Stack align="flex-start" mr={10}>
					<MessageCard userMessage={true} />
				</Stack>{" "}
				<Stack align="flex-end" mr={10}>
					<MessageCard userMessage={false} />
				</Stack>
				<div ref={scrollHere}></div>
			</ScrollArea>
		</Flex>
	);
};

export default MainConversation;
