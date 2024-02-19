import { Text, Paper, Group, PaperProps, Flex } from "@mantine/core";
import { GoogleButton } from "./GoogleButton/GoogleButton";
import { useUserStore } from "../../../Stores/userStore";
import { useNavigate } from "react-router-dom";
import styles from "./Authform.module.css";
import Cookies from "js-cookie";
import { useEffect } from "react";

export function AuthenticationForm(props: PaperProps) {
	useEffect(() => {
		if (Cookies.get("user")) {
			useUserStore
				.getState()
				.setUser(JSON.parse(Cookies.get("user") as string));
		}
		console.log("User already logged in on machine.");
		navigate("/dashboard");
		return () => {};
	}, []);

	const navigate = useNavigate();

	const handleLoginClick = async () => {
		const loginSuccess = await useUserStore.getState().login();
		if (loginSuccess) {
			navigate("/dashboard");
			return;
		}
		console.log("Login failed");
	};
	return (
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
