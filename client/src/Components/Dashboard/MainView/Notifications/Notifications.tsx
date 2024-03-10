import { useUserStore } from "../../../../Stores/userStore";
import {
	Table,
	Group,
	Text,
	Divider,
	Avatar,
	Checkbox,
	Tooltip,
} from "@mantine/core";
import LoadingTweet from "../../../Features/LoadingTweet/LoadingTweet";
import formatTimeStamp from "../../../../Helpers/formatTimeStamp";
import { useGetNotifications } from "../../../../Hooks/useGetNotifications";
// import { useMarkNotificationsRead } from "../../../../Hooks/useMarkNotificationsRead";
import { useMarkSingleNotificationRead } from "../../../../Hooks/useMarkSingleNotificationRead";
import { Link } from "react-router-dom";

const Notifications = () => {
	const { user } = useUserStore();
	const { data: notifications, isLoading } = useGetNotifications(
		user?.uid as string
	);

	const capitalizeFirstLetter = (str: string) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};

	const { mutate: markNotificationRead } = useMarkSingleNotificationRead();

	function UsersRolesTable() {
		const rows = notifications!.map((notification) => (
			<Table.Tr key={notification.id}>
				<Table.Td>
					<Group gap="sm">
						<Avatar src={notification.senderAvatarURL} />
						<Text
							fz="sm"
							fw={700}
							c={"white"}
							component={Link}
							to={`/dashboard/profile/${notification.senderUsername}`}
						>
							{notification.senderUsername}
						</Text>
					</Group>
				</Table.Td>

				<Table.Td>
					<Text>
						{notification.type === "like" && (
							<Group justify="center">
								<Text miw={"30%"}>
									{capitalizeFirstLetter(
										notification.type.toString()
									)}
								</Text>
								<Divider orientation="vertical" />
								<Text
									fz="sm"
									fw={700}
									c={"white"}
									component={Link}
									to={`/dashboard/tweet/${notification.tweetID}`}
								>
									View
								</Text>
							</Group>
						)}
						{notification.type === "follow" && (
							<Group justify="center">
								<Text miw={"30%"}>
									{capitalizeFirstLetter(
										notification.type.toString()
									)}
								</Text>
								<Divider orientation="vertical" />
								<Text
									fz="sm"
									fw={700}
									c={"white"}
									component={Link}
									to={`/dashboard/tweet/${notification.senderUsername}`}
								>
									View
								</Text>
							</Group>
						)}
						{notification.type === "reply" && (
							<Group justify="center">
								<Text miw={"30%"}>
									{capitalizeFirstLetter(
										notification.type.toString()
									)}
								</Text>
								<Divider orientation="vertical" />
								<Text
									fz="sm"
									fw={700}
									c={"white"}
									component={Link}
									to={`/dashboard/tweet/${notification.tweetID}`}
								>
									View
								</Text>
							</Group>
						)}
					</Text>
				</Table.Td>
				<Table.Td>
					{formatTimeStamp(notification.timestamp.toString())}
				</Table.Td>
				<Table.Td>
					{/* {notification.read ? (
						<Badge color={"violet"} variant="outline" fullWidth>
							Read
						</Badge>
					) : (
						<Badge color={"violet"} variant="outline" fullWidth>
							Unread
						</Badge>
					)} */}

					<Tooltip
						label="Mark as read"
						refProp="rootRef"
						bg={"#202020"}
						c={"white"}
					>
						<Checkbox
							miw={"5rem"}
							color="violet"
							checked={notification.read}
							variant="outline"
							label={notification.read ? "Read" : "Unread"}
							onChange={() =>
								markNotificationRead(notification._id)
							}
							disabled={notification.read}
						/>
					</Tooltip>
				</Table.Td>
			</Table.Tr>
		));

		return (
			<Table.ScrollContainer minWidth="100%">
				<Table
					verticalSpacing="md"
					striped
					highlightOnHover
					highlightOnHoverColor="#9272f411"
					withTableBorder
					withColumnBorders
					stickyHeader
				>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Sender</Table.Th>
							<Table.Th>Notification Type</Table.Th>
							<Table.Th>Date Sent</Table.Th>
							<Table.Th>Status</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>{rows}</Table.Tbody>
				</Table>
			</Table.ScrollContainer>
		);
	}
	return (
		<>
			{isLoading ? (
				<LoadingTweet />
			) : notifications && notifications.length > 0 ? (
				<UsersRolesTable />
			) : (
				"No Notifications"
			)}
		</>
	);
};
export default Notifications;
