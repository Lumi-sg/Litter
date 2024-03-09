import { useUserStore } from "../../../../Stores/userStore";
import { Badge, Table, Group, Text } from "@mantine/core";
import LoadingTweet from "../../../Features/LoadingTweet/LoadingTweet";
import formatTimeStamp from "../../../../Helpers/formatTimeStamp";
import { useGetNotifications } from "../../../../Hooks/useGetNotifications";

const Notifications = () => {
	const { user } = useUserStore();
	const { data: notifications, isLoading } = useGetNotifications(
		user?.uid as string
	);

	const capitalizeFirstLetter = (str: string) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};

	function UsersRolesTable() {
		const rows = notifications!.map((notification) => (
			<Table.Tr key={notification.id}>
				<Table.Td>
					<Group gap="sm">
						<div>
							<Text fz="sm" fw={500} c={"white"}>
								{notification.senderUsername}
							</Text>
						</div>
					</Group>
				</Table.Td>

				<Table.Td>
					{capitalizeFirstLetter(notification.type.toString())}
				</Table.Td>
				<Table.Td>
					{formatTimeStamp(notification.timestamp.toString())}
				</Table.Td>
				<Table.Td>
					{notification.read ? (
						<Badge color={"violet"} variant="outline" fullWidth>
							Read
						</Badge>
					) : (
						<Badge color={"violet"} variant="outline" fullWidth>
							Unread
						</Badge>
					)}
				</Table.Td>
			</Table.Tr>
		));

		return (
			<Table.ScrollContainer minWidth="100%">
				<Table verticalSpacing="sm">
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Sender</Table.Th>
							<Table.Th>Notification Type</Table.Th>
							<Table.Th>Date Sent</Table.Th>
							<Table.Th>Read?</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>{rows}</Table.Tbody>
				</Table>
			</Table.ScrollContainer>
		);
	}
	return <>{isLoading ? <LoadingTweet /> : <UsersRolesTable />}</>;
};
export default Notifications;
