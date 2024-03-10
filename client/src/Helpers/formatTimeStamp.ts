function formatTimestamp(timestamp: string): string {
	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "short",
		day: "2-digit",
		hour: "numeric",
		minute: "numeric",
	};
	const date = new Date(timestamp);
	return date.toLocaleDateString("en-US", options);
}

export default formatTimestamp;
