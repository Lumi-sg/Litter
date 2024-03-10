import { Group, Loader } from "@mantine/core";

const LoadingTweet = () => {
	return (
		<Group justify="center" align="center">
			<Loader color="#7f64cf" size="xl" mt={50} />
		</Group>
	);
};

export default LoadingTweet;
