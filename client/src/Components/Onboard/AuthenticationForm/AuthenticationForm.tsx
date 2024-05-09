import { Text, Paper, Group, PaperProps, Flex } from "@mantine/core";
import { GoogleButton } from "./GoogleButton/GoogleButton";
import { useUserStore } from "../../../Stores/userStore";
import { useNavigate } from "react-router-dom";
import styles from "./Authform.module.css";
import LoadingTweet from "../../Features/LoadingTweet/LoadingTweet";

export function AuthenticationForm(props: PaperProps) {
	const navigate = useNavigate();
	const { isLoading, setIsLoading } = useUserStore();

	const handleLoginClick = async () => {
		setIsLoading(true);
		const loginSuccess = await useUserStore.getState().login();
		if (loginSuccess) {
			navigate("/dashboard/home");
			return;
		}
		console.log("Login failed");
	};
	return isLoading ? (
		<LoadingTweet />
	) : (
		<Paper
			radius="md"
			p="xl"
			withBorder
			{...props}
			className={styles.authform}
		>
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
				</Group>
			</Flex>
		</Paper>
	);
}
