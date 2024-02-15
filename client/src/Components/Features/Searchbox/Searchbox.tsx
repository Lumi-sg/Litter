import {
	TextInput,
	ActionIcon,
	rem,
} from "@mantine/core";
import { IconSearch, IconArrowRight } from "@tabler/icons-react";

export function Searchbox() {

	return (
		<TextInput
			radius="xl"
			w={"100%"}
			size="md"
			placeholder="Search questions"
			rightSectionWidth={42}
            style={{
                backgroundColor: "#242424",
            }}
			leftSection={
				<IconSearch
					style={{ width: rem(18), height: rem(18) }}
					stroke={1.5}
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
						stroke={1.5}
					/>
				</ActionIcon>
			}
		/>
	);
}
