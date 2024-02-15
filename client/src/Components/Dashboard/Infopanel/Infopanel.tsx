import { Flex, Stack } from "@mantine/core";
import { Searchbox } from "../../Features/Searchbox/Searchbox";
import AccountsShowcase from "../../Features/AccountsShowcase/AccountsShowcase";

const Infopanel = () => {
	return (
		<>
			<Flex h={"100%"} w={300} direction="column" gap={20}>
				<Searchbox />
				<Stack justify="center" h={"100%"}>
					<AccountsShowcase />
				</Stack>
			</Flex>
		</>
	);
};

export default Infopanel;
