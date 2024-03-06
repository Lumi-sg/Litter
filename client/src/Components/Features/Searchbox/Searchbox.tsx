import { ActionIcon, rem, Autocomplete } from "@mantine/core";
import { IconSearch, IconArrowRight } from "@tabler/icons-react";
import styles from "./Searchbox.module.css";
import { useGetAllUsers } from "../../../Hooks/useGetAllUsers";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function Searchbox() {
	const { data: allUsers } = useGetAllUsers();
	const navigate = useNavigate();
	const [searchInputText, setSearchInputText] = useState("");

	const [isSearchedUserClicked, setIsSearchedUserClicked] = useState(false);

	useEffect(() => {
		if (isSearchedUserClicked) {
			const selectedUserName = searchInputText;
			setSearchInputText("");
			navigate(`/dashboard/profile/${selectedUserName}`);
			setIsSearchedUserClicked(false);
			
		}
	}, [isSearchedUserClicked]);

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
			limit={5}
			data={allUsers?.map((user) => user.username)}
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
