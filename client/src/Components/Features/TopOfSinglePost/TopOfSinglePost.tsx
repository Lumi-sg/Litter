import { Group } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "tabler-icons-react";
import "./TopOfSinglePost.css";

const TopOfSinglePost = () => {
	const navigate = useNavigate();
	return (
		<Group mb={10}>
			<ArrowLeft
				size={30}
				className="cursor-pointer"
				onClick={() => navigate(-1)}
				color="#8d7ac8"
			></ArrowLeft>
		</Group>
	);
};

export default TopOfSinglePost;
