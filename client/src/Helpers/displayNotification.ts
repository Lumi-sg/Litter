import { notifications } from "@mantine/notifications";

export const displayNotification = (
	title: string,
	messageType: string,
	color: string,
	username: string,
    target: string
) => {
	let message = `You ${messageType} ${username} ${target}`;
	notifications.show({
		title: title,
		message: message,
		color: color,
	});
};
