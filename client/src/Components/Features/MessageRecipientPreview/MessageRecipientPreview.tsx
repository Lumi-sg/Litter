import {
	UnstyledButton,
	Flex,
	Avatar,
	Group,
	Divider,
	Stack,
	Text,
} from "@mantine/core";
import { convertEmailToUsername } from "../../../Helpers/convertEmailToUsername";
import { useUserStore } from "../../../Stores/userStore";
import classes from "./MessageRecipientPreview.module.css";
import { modals } from "@mantine/modals";
const MessageRecipientPreview = () => {
	const { user } = useUserStore();

	const handleSelectRecipient = () => {
		modals.closeAll();
	};
	return (
		<>
			<UnstyledButton
				className={classes.user}
				h={80}
				onClick={handleSelectRecipient}
			>
				<Flex
					ml={10}
					w={"100%"}
					gap={0}
					align={"center"}
					justify={"space-between"}
				>
					<Flex>
						<Avatar
							src={user?.photoURL}
							radius="xl"
							size={45}
							mr={10}
						/>

						<Stack gap={-"50%"}>
							<Group justify="space-around">
								<Text size="md" fw={700} c={"white"}>
									{user?.displayName}
									<Text span c={"dimmed"} size="sm" ml={3}>
										{convertEmailToUsername(
											user?.email as string
										)}
									</Text>
								</Text>
							</Group>
						</Stack>
					</Flex>
				</Flex>
			</UnstyledButton>
			<Divider />
		</>
	);
};

export default MessageRecipientPreview;
