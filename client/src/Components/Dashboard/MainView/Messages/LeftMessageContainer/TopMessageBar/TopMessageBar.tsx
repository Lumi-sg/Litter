import { Group, Text } from "@mantine/core";




const TopMessageBar = () => {
	// const handleNewMessageClick = () => {
	// 	modals.open({
	// 		title: "New Message",
	// 		styles: {
	// 			title: {
	// 				color: "white",
	// 				fontWeight: 700,
	// 				fontSize: "lg",
	// 			},
	// 		},
	// 		children: <NewMessageModal />,
	// 		size: 400,
	// 		radius: "md",
	// 	});
	// };
	return (
		<Group w={"100%"} justify={"space-between"}>
			<Text c={"white"} fz={"xl"} fw={700}>
				Messages
			</Text>
			{/* <Group>
				
				<MessagePlus
					className={styles.messageIcon}
					onClick={handleNewMessageClick}
				/>
			</Group> */}
		</Group>
	);
};

export default TopMessageBar;
