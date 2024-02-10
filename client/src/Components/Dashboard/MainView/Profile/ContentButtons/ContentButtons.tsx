import { Group, Button, UnstyledButton } from "@mantine/core";

const ContentButtons = () => {
	return (
		<>
			<Group gap={100} m={10} w={"100%"} justify="center">
				<Button
					w={"42%"}
					radius="md"
					size="md"
					variant="subtle"
					color="violet"
				>
					Posts
				</Button>

				<Button
					w={"42%"}
					radius="md"
					size="md"
					variant="subtle"
					color="violet"
				>
					Likes
				</Button>
			</Group>
		</>
	);
};

export default ContentButtons;
