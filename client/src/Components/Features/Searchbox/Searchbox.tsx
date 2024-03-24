import {
	ActionIcon,
	rem,
	Autocomplete,
	ComboboxStringItem,
	AutocompleteProps,
	Avatar,
	Group,
	Text
} from "@mantine/core";
import { IconSearch, IconArrowRight } from "@tabler/icons-react";
import styles from "./Searchbox.module.css";
import { useGetAllUsers } from "../../../Hooks/User Hooks/useGetAllUsers";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useUserStore } from "../../../Stores/userStore";

export function Searchbox() {
	const { user } = useUserStore();
	const { data: allUsers, isLoading } = useGetAllUsers();
	const navigate = useNavigate();
	const [searchInputText, setSearchInputText] = useState("");

	const inputRef = useRef<HTMLInputElement>(null);

	const [isSearchedUserClicked, setIsSearchedUserClicked] = useState(false);

	useEffect(() => {
		if (isSearchedUserClicked) {
			const selectedUserName = searchInputText;
			setSearchInputText("");
			navigate(`/dashboard/profile/${selectedUserName}`);
			setIsSearchedUserClicked(false);
		}
	}, [isSearchedUserClicked]);
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
			ref={inputRef}
			limit={5}
			data={options}
			renderOption={renderAutocompleteOption}
			onChange={setSearchInputText}
			onOptionSubmit={() => setIsSearchedUserClicked(true)}
			value={searchInputText}
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
