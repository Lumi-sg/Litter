import { Group, Button, Divider, Container } from "@mantine/core";

const ContentButtons = () => {
	return (
		<Group gap={0} mt={10} mb={10} w={"100%"} justify="center" align="center">
			<Button
				w={"49%"}
				radius="md"
				size="md"
				variant="subtle"
				color="violet"
			>
				Posts
			</Button>
			<Divider orientation="vertical" />
			<Button
				w={"49%"}
				radius="md"
				size="md"
				variant="subtle"
				color="violet"
			>
				Likes
			</Button>
		</Group>
	);
};

export default ContentButtons;
