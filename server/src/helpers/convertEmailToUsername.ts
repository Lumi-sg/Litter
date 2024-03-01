export const convertEmailToUsername = (email: string) => {
	if (!email) {
		console.log("No email provided");
		return;
	}
	const username = email.split("@")[0];
	return "@" + username;
};
