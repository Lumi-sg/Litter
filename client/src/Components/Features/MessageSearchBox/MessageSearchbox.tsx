import { ActionIcon, rem, Autocomplete } from "@mantine/core";
import { IconSearch, IconArrowRight } from "@tabler/icons-react";
import styles from "./MessageSearchbox.module.css";
import { MessagePlus } from "tabler-icons-react";
import UserType from "../../../Types/User";
import { useUserStore } from "../../../Stores/userStore";
import { convertEmailToUsername } from "../../../Helpers/convertEmailToUsername";
import { useState } from "react";

type MessageSearchBoxProps = {
	allUsers: UserType[] | undefined;
	isLoading: boolean;
};

export function MessageSearchBox({
	allUsers,
	isLoading,
}: MessageSearchBoxProps) {
	const { user } = useUserStore();
	const [selectedUsername, setSelectedUsername] = useState("");

	const handleNewConversationClick = () => {
		console.log(selectedUsername);
		setSelectedUsername("");
	};
	return (
		<Autocomplete
			radius="xl"
			w={"100%"}
			size="md"
			placeholder="Search Users"
			onOptionSubmit={(username) => setSelectedUsername(username)}
			value={selectedUsername}
			onChange={(username) => setSelectedUsername(username)}
			rightSectionWidth={42}
			styles={{
				input: {
					color: "white",
				},
			}}
			data={allUsers
				?.filter(
					(userFromData) =>
						userFromData.username !==
						convertEmailToUsername(user?.email as string)
				)
				.map((userFromData) => ({
					value: userFromData.username,
					label: userFromData.username,
				}))}
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
					<MessagePlus
						style={{ width: rem(26), height: rem(26) }}
						// stroke={2}
						color="#242424"
						onClick={() => {
							handleNewConversationClick();
						}}
					/>
				</ActionIcon>
			}
		/>
	);
}
