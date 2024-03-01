export const trimDisplayName = (displayName: string) => {
	if (!displayName) {
		console.log("No display name provided");
		return;
	}

	return displayName.split(" ")[0];
};
