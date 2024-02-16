import { Divider, ScrollArea, Stack } from "@mantine/core";
import MessageCard from "../MessageCard/MessageCard";
import { useRef, useEffect } from "react";

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
		<ScrollArea h={"100%"} offsetScrollbars scrollbarSize={2}>
			<Stack mr={5}>
				<Stack align="flex-end">
					<MessageCard userMessage={false} />
				</Stack>
				<Stack align="flex-start">
					<MessageCard userMessage={true} />
				</Stack>{" "}
				<Stack align="flex-end">
					<MessageCard userMessage={false} />
				</Stack>{" "}
				<Stack align="flex-start">
					<MessageCard userMessage={true} />
				</Stack>{" "}
				<Stack align="flex-end">
					<MessageCard userMessage={false} />
				</Stack>{" "}
				<Stack align="flex-start">
					<MessageCard userMessage={true} />
				</Stack>{" "}
				<Stack align="flex-end">
					<MessageCard userMessage={false} />
				</Stack>
			</Stack>
			<div ref={scrollHere}></div>
			<Divider mt={10}/>
		</ScrollArea>
	);
};

export default MainConversation;
