import { AuthenticationForm } from "./AuthenticationForm/AuthenticationForm";
import { Center } from "@mantine/core";

const Login = () => {
	return (
		<div>
			<Center h={"100vh"}>
				<AuthenticationForm h={"auto"} w={"20vw"} />
			</Center>
		</div>
	);
};

export default Login;
