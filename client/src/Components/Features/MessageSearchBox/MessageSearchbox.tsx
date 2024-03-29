import {
	ActionIcon,
	rem,
	Autocomplete,
	AutocompleteProps,
	Avatar,
	Group,
	Text,
	ComboboxStringItem,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import styles from "./MessageSearchbox.module.css";
import { MessagePlus } from "tabler-icons-react";
import UserType from "../../../Types/User";
import { useUserStore } from "../../../Stores/userStore";
import { useEffect, useState } from "react";
import { useCreateConversation } from "../../../Hooks/Conversation Hooks/useCreateConversation";
import { useSelectedConversationStore } from "../../../Stores/selectedConversationStore";
import { useNavigate } from "react-router-dom";

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
	const { setSelectedConversationID } = useSelectedConversationStore();

	const navigate = useNavigate();

	// const createConversation = useCreateConversation();

	const {
		mutate: createConversation,
		isPending,
		isSuccess,
		data,
	} = useCreateConversation(selectedUsername);

	const handleNewConversationClick = () => {
		if (!selectedUsername || selectedUsername === "") {
			return;
		}
		createConversation();
	};

	useEffect(() => {
		if (isSuccess) {
			setSelectedUsername("");
			setSelectedConversationID(data._id);
			navigate(`/dashboard/messages/${data._id}`);
		}
	}, [isSuccess]);

	const options = isLoading
		? []
		: allUsers
				?.filter((userFromData) => userFromData.email !== user?.email)
				.map((user) => ({
					value: user.username,
					label: user.username,
					email: user.email,
					pictureURL: user.pictureURL,
					displayName: user.displayName,
					username: user.username,
				}));

	interface CustomAutocompleteOption extends ComboboxStringItem {
		pictureURL: string;
		displayName: string;
		username: string;
	}

	const renderAutocompleteOption: AutocompleteProps["renderOption"] = ({
		option,
	}) => (
		<Group gap="sm">
			<Avatar
				src={(option as CustomAutocompleteOption).pictureURL}
				size={36}
				radius="xl"
			/>
			<div>
				<Text size="md">
					{(option as CustomAutocompleteOption).username}
				</Text>
				<Text size="sm" opacity={0.5}>
					{(option as CustomAutocompleteOption).displayName}
				</Text>
			</div>
		</Group>
	);

	return isLoading ? null : (
		<Autocomplete
			radius="xl"
			w={"100%"}
			size="md"
			placeholder="Search Users"
			onOptionSubmit={(username: string) => setSelectedUsername(username)}
			value={selectedUsername}
			onChange={(username: string) => setSelectedUsername(username)}
			rightSectionWidth={42}
			styles={{
				input: {
					color: "white",
				},
			}}
			comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
			maxDropdownHeight={500}
			renderOption={renderAutocompleteOption}
			data={options}
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
					disabled={
						!selectedUsername ||
						selectedUsername === "" ||
						isPending
					}
					loading={isPending}
					loaderProps={{ color: "#242424" }}
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
