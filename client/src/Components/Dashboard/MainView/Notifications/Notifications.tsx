import { useUserStore } from "../../../../Stores/userStore";
import {
	Table,
	Group,
	Text,
	Avatar,
	Checkbox,
	Tooltip,
	Button,
} from "@mantine/core";
import LoadingTweet from "../../../Features/LoadingTweet/LoadingTweet";
import formatTimeStamp from "../../../../Helpers/formatTimeStamp";
import { useGetNotifications } from "../../../../Hooks/useGetNotifications";
import { useMarkNotificationsRead } from "../../../../Hooks/useMarkNotificationsRead";
import { useMarkSingleNotificationRead } from "../../../../Hooks/useMarkSingleNotificationRead";
import { NotificationType } from "../../../../Types/Notifications";
import { Link } from "react-router-dom";

const Notifications = () => {
	const { user } = useUserStore();
	const { data: notifications, isLoading } = useGetNotifications(
		user?.uid as string
	);

	const { mutate: markNotificationsRead } = useMarkNotificationsRead(
		notifications as NotificationType[]
	);

	// const capitalizeFirstLetter = (str: string) => {
	// 	return str.charAt(0).toUpperCase() + str.slice(1);
	// };

	const { mutate: markNotificationRead } = useMarkSingleNotificationRead();

	const areAllNotificationsRead = () => {
		return notifications?.every((notification) => notification.read);
	};

	function UsersRolesTable() {
		const rows = notifications!.map((notification) => (
			<Table.Tr key={notification.id}>
				<Table.Td>
					<Group>
						<Avatar
							src={notification.senderAvatarURL}
							component={Link}
							to={`/dashboard/profile/${notification.senderUsername}`}
						/>
						{notification.type === "like" && (
							<>
								<Text
									fz="md"
									fw={700}
									c={"white"}
									component={Link}
									to={`/dashboard/profile/${notification.senderUsername}`}
									ml={-14}
								>
									{notification.senderUsername}
								</Text>
								<Text fz="md" ml={-10}>
									liked your{" "}
									<Text
										c={"white"}
										fz="md"
										fw={700}
										component={Link}
										to={`/dashboard/tweet/${notification.tweetID}`}
									>
										tweet
									</Text>
								</Text>
							</>
						)}
						{notification.type === "reply" && (
							<>
								<Text
									fz="md"
									fw={700}
									c={"white"}
									component={Link}
									to={`/dashboard/profile/${notification.senderUsername}`}
									ml={-14}
								>
									{notification.senderUsername}
								</Text>
								<Text
									c={"white"}
									fz="md"
									fw={700}
									component={Link}
									to={`/dashboard/tweet/${notification.tweetID}`}
									ml={-10}
								>
									replied
								</Text>
								<Text fz="md" ml={-10}> to your tweet</Text>
							</>
						)}
						{notification.type === "follow" && (
							<>
								<Text
									fz="md"
									fw={700}
									c={"white"}
									component={Link}
									to={`/dashboard/profile/${notification.senderUsername}`}
									ml={-14}
								>
									{notification.senderUsername}
								</Text>
								<Text fz="md" ml={-10}>
									followed you
								</Text>
							</>
						)}
					</Group>
				</Table.Td>

				<Table.Td>
					{formatTimeStamp(notification.timestamp.toString())}
				</Table.Td>
				<Table.Td>
					<Tooltip
						label={notification.read ? "Read" : "Mark As Read"}
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
							onChange={() => {
								if (notification.read === false) {
									markNotificationRead(notification._id);
								}
							}}
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
					borderColor="rgba(150, 117, 250, 0.327)"
				>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>
								<Text fw={700}>Notification</Text>
							</Table.Th>

							<Table.Th>
								<Text fw={700}>Date Sent</Text>
							</Table.Th>
							<Table.Th>
								{!areAllNotificationsRead() ? (
									<Button
										variant="outline"
										color="violet"
										fullWidth
										onClick={() => markNotificationsRead()}
									>
										Mark All Read
									</Button>
								) : (
									<Text fw={700}>Status</Text>
								)}
							</Table.Th>
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
