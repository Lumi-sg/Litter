import { Text, Paper, Group, PaperProps, Flex } from "@mantine/core";
import { GoogleButton } from "./GoogleButton/GoogleButton";
import { TwitterButton } from "./TwitterButton/TwitterButton";

export function AuthenticationForm(props: PaperProps) {
	return (
		<Paper radius="md" p="xl" withBorder {...props}>
			<Flex
				direction={"column"}
				align={"center"}
				justify={"center"}
				gap={"lg"}
			>
				<Text size="lg" fw={500}>
					Welcome to Litter, please login.
				</Text>

				<Group>
					<GoogleButton radius="xl">Google</GoogleButton>
					<TwitterButton radius="xl">Twitter</TwitterButton>
				</Group>
			</Flex>
		</Paper>
	);
}
