import { Group, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import {  MessagePlus } from "tabler-icons-react";
import styles from "./TopMessageBar.module.css";
import NewMessageModal from "../../../../../Features/NewMessageModal/NewMessageModal";

const TopMessageBar = () => {
	const handleNewMessageClick = () => {
		modals.open({
			title: "New Message",
			styles: {
				title: {
					color: "white",
					fontWeight: 700,
					fontSize: "lg",
				},
			},
			children: <NewMessageModal />,
			size: 400,
			radius: "md",
		});
	};
	return (
		<Group w={"100%"} justify={"space-between"}>
			<Text c={"white"} fz={"xl"} fw={700}>
				Messages
			</Text>
			<Group>
				{/* <Settings className={styles.settingsIcon} /> */}
				<MessagePlus
					className={styles.messageIcon}
					onClick={handleNewMessageClick}
				/>
			</Group>
		</Group>
	);
};

export default TopMessageBar;
