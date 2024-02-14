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
} from "@mantine/core";
import "./test.css";
import { useEffect, useState } from "react";
import { useParentTweetStoreAuthor } from "../../../Stores/parentTweetStoreAuthor";
import { convertEmailToUsername } from "../../../Helpers/convertEmailToUsername";

type TweetInputProps = {
	placeholderMessage: string;
};

const TweetInput = ({ placeholderMessage }: TweetInputProps) => {
	const { user } = useUserStore();
	const { parentTweetAuthor } = useParentTweetStoreAuthor();
	const [tweetInput, setTweetInput] = useState("");
	const [tweetCharacterLength, setTweetCharacterLength] = useState(0);

	useEffect(() => {
		setTweetCharacterLength(tweetInput.length);
	}, [tweetInput]);

	return (
		<div>
			<Paper withBorder radius="md" p={10} w={"100%"} h={"100%"} mb={10}>
				{parentTweetAuthor && (
					<Group ml={88} w={"100%"} gap={0}>
						Replying to{" "}
						<Text ml={3} c={"#8d7ac8"}>
							{convertEmailToUsername(
								parentTweetAuthor.email as string
							)}
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
						color="violet"
						variant="outline"
						disabled={
							!tweetCharacterLength || tweetCharacterLength > 280
						}
					>
						Post
					</Button>
				</Group>
			</Paper>
		</div>
	);
};

export default TweetInput;
