import { Text, Paper, Group, PaperProps, Flex } from "@mantine/core";
import { GoogleButton } from "./GoogleButton/GoogleButton";
import { TwitterButton } from "./TwitterButton/TwitterButton";
import { useUserStore } from "../../../Stores/userStore";
import { useNavigate } from "react-router-dom";

export function AuthenticationForm(props: PaperProps) {
	const navigate = useNavigate();

	const handleLoginClick = async () => {
		const loginSuccess = await useUserStore.getState().login();
		if (loginSuccess) {
			console.log("Login successful");
			navigate("/dashboard");
			console.table(useUserStore.getState().user);
			return;
		}
		console.log("Login failed");
	};
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
					<GoogleButton radius="xl" onClick={handleLoginClick}>
						Google
					</GoogleButton>
					<TwitterButton radius="xl">Twitter</TwitterButton>
				</Group>
			</Flex>
		</Paper>
	);
}
