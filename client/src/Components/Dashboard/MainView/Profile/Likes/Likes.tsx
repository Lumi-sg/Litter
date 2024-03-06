import { TweetComponent } from "../../../../Features/TweetComponent/TweetComponent";
import { TweetVariant } from "../../../../../constants/TweetVariant";
import { useGetUserLikes } from "../../../../../Hooks/useGetUserLikes";
import { useParams } from "react-router-dom";
import LoadingTweet from "../../../../Features/LoadingTweet/LoadingTweet";
import { Alert, Center } from "@mantine/core";

const Likes = () => {
	const { username } = useParams();
	const { data, isLoading } = useGetUserLikes(username as string);

	const userHasLikes = data && data.length > 0;

	return (
		<>
			{isLoading ? (
				<LoadingTweet />
			) : userHasLikes ? (
				data?.map((tweet) => (
					<TweetComponent
						passedInStyles={TweetVariant.like}
						key={tweet._id}
						tweet={tweet}
					/>
				))
			) : (
				<Center mt={50}>
					<Alert
						variant="outline"
						color="violet"
						radius="md"
						title=""
						w="50%"
						fz={"5rem"}
						ta={"center"}
						p={"xl"}
					>
						{`${username} has no likes.`}
					</Alert>
				</Center>
			)}
		</>
	);
};

export default Likes;
