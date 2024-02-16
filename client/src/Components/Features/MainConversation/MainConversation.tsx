import { Divider, Flex, ScrollArea, Stack } from "@mantine/core";
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
		<Flex mr={5} gap={20} direction="column-reverse" h={"100%"} c={"white"}>
			<ScrollArea
				offsetScrollbars
				scrollbarSize={2}
				mah={"calc(100vh - 13.25rem)"}
			>
				<Stack align="flex-end" mr={5}>
					<MessageCard userMessage={false} />
				</Stack>
				<Stack align="flex-start" mr={5}>
					<MessageCard userMessage={true} />
				</Stack>{" "}
				<Stack align="flex-end" mr={5}>
					<MessageCard userMessage={false} />
				</Stack>{" "}
				<Stack align="flex-start" mr={5}>
					<MessageCard userMessage={true} />
				</Stack>{" "}
				<Stack align="flex-end"mr={5}>
					<MessageCard userMessage={false} />
				</Stack>{" "}
				<Stack align="flex-start"mr={5}>
					<MessageCard userMessage={true} />
				</Stack>{" "}
				<Stack align="flex-end"mr={5}>
					<MessageCard userMessage={false} />
				</Stack>
				<Stack align="flex-start"mr={5}>
					<MessageCard userMessage={true} />
				</Stack>{" "}
				<Stack align="flex-end"mr={5}>
					<MessageCard userMessage={false} />
				</Stack>
				<Stack align="flex-start"mr={5}>
					<MessageCard userMessage={true} />
				</Stack>{" "}
				<Stack align="flex-end"mr={5}>
					<MessageCard userMessage={false} />
				</Stack>
				<Stack align="flex-start"mr={5}>
					<MessageCard userMessage={true} />
				</Stack>{" "}
				<Stack align="flex-end"mr={5}>
					<MessageCard userMessage={false} />
				</Stack>
				<Stack align="flex-start"mr={5}>
					<MessageCard userMessage={true} />
				</Stack>{" "}
				<Stack align="flex-end"mr={5}>
					<MessageCard userMessage={false} />
				</Stack>
				<Stack align="flex-start"mr={5}>
					<MessageCard userMessage={true} />
				</Stack>{" "}
				<Stack align="flex-end"mr={5}>
					<MessageCard userMessage={false} />
				</Stack>
				<Stack align="flex-start"mr={5}>
					<MessageCard userMessage={true} />
				</Stack>{" "}
				<Stack align="flex-end"mr={5}>
					<MessageCard userMessage={false} />
				</Stack>
				<Stack align="flex-start"mr={5}>
					<MessageCard userMessage={true} />
				</Stack>{" "}
				<Stack align="flex-end"mr={5}>
					<MessageCard userMessage={false} />
				</Stack>
				<div ref={scrollHere}></div>
			</ScrollArea>
		</Flex>
	);
};

export default MainConversation;
