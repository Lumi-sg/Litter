import { SingleAccountComponent } from "./SingleAccountComponent/SingleAccountComponent";
import { Text } from "@mantine/core";

const AccountsShowcase = () => {
	return (
		<>
    <Text c={"white"} size="lg" ta={"center"}>Who To Follow</Text>
			<SingleAccountComponent />
			<SingleAccountComponent />
			<SingleAccountComponent />

		</>
	);
};

export default AccountsShowcase;
