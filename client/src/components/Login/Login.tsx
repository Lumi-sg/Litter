import React from "react";
import { AuthenticationForm } from "./AuthenticationForm/AuthenticationForm";
import { Center } from "@mantine/core";

const Login = () => {
	return (
		<div>
			<Center h={"100vh"}>
				<AuthenticationForm h={"50vh"} />
			</Center>
		</div>
	);
};

export default Login;
