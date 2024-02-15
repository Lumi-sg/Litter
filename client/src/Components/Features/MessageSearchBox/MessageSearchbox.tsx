import { ActionIcon, rem, Autocomplete } from "@mantine/core";
import { IconSearch, IconArrowRight } from "@tabler/icons-react";
import styles from "./MessageSearchbox.module.css";

export function MessageSearchBox() {
	return (
		<Autocomplete
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
			data={["Henry", "George", "Gina", "Kelly"]}
			classNames={{
				input: styles.input,
				options: styles.options,
				dropdown: styles.dropdown,
				option: styles.option,
			}}
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
						color="#242424"
					/>
				</ActionIcon>
			}
		/>
	);
}
