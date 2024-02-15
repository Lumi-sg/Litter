import { TextInput, ActionIcon, rem } from "@mantine/core";
import { IconSearch, IconArrowRight } from "@tabler/icons-react";
import { useState } from "react";
import styles from "./Searchbox.module.css";

export function Searchbox() {
	const [searchTerm, setSearchTerm] = useState("");
	return (
		<TextInput
			radius="xl"
			w={"100%"}
			size="md"
			placeholder="Search users"
			rightSectionWidth={42}
			styles={{
				input: {
					color: "white",
				},
			}}
			classNames={{ input: styles.input }}
			value={searchTerm}
			onChange={(e) => setSearchTerm(e.target.value)}
			leftSection={
				<IconSearch
					style={{ width: rem(18), height: rem(18) }}
					stroke={1.5}
					color="#b197fc"
				/>
			}
			rightSection={
				<ActionIcon
					size={32}
					radius="xl"
					color={"#8d7ac8"}
					variant="filled"
				>
					<IconArrowRight
						style={{ width: rem(18), height: rem(18) }}
						stroke={2}
						color="white"
					/>
				</ActionIcon>
			}
		/>
	);
}
