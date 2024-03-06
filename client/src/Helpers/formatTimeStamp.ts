function formatTimestamp(timestamp: string): string {
	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "short",
		day: "2-digit",
	};
	const date = new Date(timestamp);
	return date.toLocaleDateString("en-US", options);
}

export default formatTimestamp;
