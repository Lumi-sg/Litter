import { Flex, Group, Textarea } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "tabler-icons-react";



const TopOfSinglePost = () => {
	const navigate = useNavigate();
	return (
		<Group mb={10}>
			<ArrowLeft
				onClick={() => navigate(-1)}
				color="#8d7ac8"
			></ArrowLeft>
		</Group>
	);
};

export default TopOfSinglePost;
