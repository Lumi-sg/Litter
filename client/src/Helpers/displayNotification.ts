import { notifications } from "@mantine/notifications";

export const displayNotification = (
	title: string,
	messageType: string,
	color: string,
	username: string
) => {
    let message = `You ${messageType} ${username}'s tweet`; ;
	notifications.show({
		title: title,
		message: message,
		color: color,
		
	});
};
