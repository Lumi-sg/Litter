import { Flex, Group, Text } from "@mantine/core";
import { Settings, MessagePlus } from "tabler-icons-react";
import styles from "./TopMessageBar.module.css";

const TopMessageBar = () => {
	return (
		<Group w={"100%"} justify={"space-between"}>
			<Text c={"white"} fz={"xl"} fw={700}>
				Messages
			</Text>
			<Group>
				<Settings className={styles.settingsIcon} />
				<MessagePlus className={styles.messageIcon} />
			</Group>
		</Group>
	);
};

export default TopMessageBar;
