import { useUserStore } from "../../../Stores/userStore";
import {
	Avatar,
	Group,
	Paper,
	Textarea,
	RingProgress,
	Text,
	Divider,
	Button,
	Loader,
} from "@mantine/core";
import "./test.css";
import { useEffect, useState } from "react";
import { useParentTweetStoreAuthor } from "../../../Stores/parentTweetStoreAuthor";
import { convertEmailToUsername } from "../../../Helpers/convertEmailToUsername";
import { modals } from "@mantine/modals";
import { useTweetPost } from "../../../Hooks/useTweetPost";
import { useTweetReply } from "../../../Hooks/useTweetReply";
import { TweetType } from "../../../Types/Tweet";
type TweetInputProps = {
	placeholderMessage: string;
	isReply: boolean;
	parentTweet?: TweetType;
};

const TweetInput = ({
	placeholderMessage,
	isReply,
	parentTweet,
}: TweetInputProps) => {
	const { user } = useUserStore();
	const [tweetInput, setTweetInput] = useState("");
	const [tweetCharacterLength, setTweetCharacterLength] = useState(0);
	const closeModal = () => modals.closeAll();
	const { mutate, isPending } = useTweetPost(
		tweetInput,
		convertEmailToUsername(user?.email as string)
	);

	const { mutate: mutateReply, isPending: isPendingReply } = useTweetReply(
		tweetInput,
		convertEmailToUsername(user?.email as string),
		parentTweet?._id
	);

	const handleSubmitTweet = () => {
		mutate();
	};

	const handleSubmitReply = async () => {
		await mutateReply();
		setTweetInput("");
	};

	useEffect(() => {
		setTweetCharacterLength(tweetInput.length);
	}, [tweetInput]);

	return (
		<div>
			<Paper withBorder radius="md" p={10} w={"100%"} h={"100%"} mb={10}>
				{parentTweet && (
					<Group ml={88} w={"50%"} gap={0}>
						<Text size="xs">Replying to</Text>
						<Text ml={3} c={"#8d7ac8"} size="xs">
							{parentTweet.authorUsername}
						</Text>
					</Group>
				)}

				<Group h={"100%"} align="center">
					<Avatar
						src={user?.photoURL}
						size={40}
						radius="xl"
						m={10}
						ml={21}
					/>
					<Textarea
						data-autofocus
						variant="unstyled"
						autosize
						h={"100%"}
						w={"80%"}
						maxRows={6}
						placeholder={placeholderMessage}
						size="lg"
						style={{
							backgroundColor: "#242424",
						}}
						value={tweetInput}
						onChange={(e) => setTweetInput(e.target.value)}
						c={"white"}
					></Textarea>
				</Group>
				<Group justify="flex-end">
					<RingProgress
						size={35}
						thickness={4}
						label={
							<Text
								size="xs"
								ta={"center"}
								c={
									tweetCharacterLength > 280
										? "rgba(255, 10, 10, 0.7)"
										: "white"
								}
							>
								{280 - tweetCharacterLength <= 20
									? 280 - tweetCharacterLength
									: null}
							</Text>
						}
						sections={[
							{
								value: tweetCharacterLength / 2.8, //This is because the spinner's max value is 100
								color:
									tweetCharacterLength > 280
										? "#242424"
										: "#8769dd",
							},
						]}
					/>
					<Divider orientation="vertical" ml={5} mr={5} size="xs" />
					<Button
						onClick={
							isReply ? handleSubmitReply : handleSubmitTweet
						}
						color="violet"
						variant="outline"
						disabled={
							!tweetCharacterLength ||
							tweetCharacterLength > 280 ||
							isPending
						}
					>
						{isReply ? (
							isPendingReply ? (
								<Loader color="violet" size={20} />
							) : (
								"Reply"
							)
						) : isPending ? (
							<Loader color="violet" size={20} />
						) : (
							"Post"
						)}
					</Button>
				</Group>
			</Paper>
		</div>
	);
};

export default TweetInput;
