import React from "react";
import { TweetComponent } from "../../../ModularComponents/TweetComponent/TweetComponent";
import TweetInput from "./TweetInput/TweetInput";

const Home = () => {
	return (
		<>
			<TweetInput />
			<TweetComponent />
			<TweetComponent />
			<TweetComponent />
			<TweetComponent />
			<TweetComponent />
			<TweetComponent />
		</>
	);
};

export default Home;
