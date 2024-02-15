import React from "react";
import { Flex } from "@mantine/core";
import { Searchbox } from "../../Features/Searchbox/Searchbox";

const Infopanel = () => {
	return (
		<>
			<Flex h={"100%"} w={"55%"} direction="column" gap={20}>
				<Searchbox />
			</Flex>
		</>
	);
};

export default Infopanel;
