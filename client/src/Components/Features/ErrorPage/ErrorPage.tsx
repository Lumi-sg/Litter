import {
	Container,
	Title,
	Text,
	Button,
	Group,
	Center,
	Stack,
} from "@mantine/core";
import { Illustration } from "./Illustration";
import classes from "./ErrorPage.module.css";
import { Link } from "react-router-dom";
import { useComponentStore } from "../../../Stores/componentStore";

type errorProps = {
	errorMessage?: string;
};

export function ErrorPage(props: errorProps) {
	const { setSelectedComponent } = useComponentStore();

	const handleHomeClick = () => {
		setSelectedComponent("Home");
	};
	return (
		<Container className={classes.root}>
			<div className={classes.inner}>
				<Illustration className={classes.image} />
				<div className={classes.content}>
					<Title className={classes.title}>Nothing to see here</Title>
					<Stack>
						<Center>
							<Text
								c="dimmed"
								size="lg"
								ta="center"
								className={classes.description}
								m={30}
							>
								Page you are trying to open does not exist. You
								may have mistyped the address, or the page has
								been moved to another URL. If you think this is
								an error contact support.
							</Text>
						</Center>
						<Center>
							<Text>Error: {props.errorMessage}</Text>
						</Center>
					</Stack>
					<Group justify="center" mt={30}>
						<Button
							size="md"
							variant="outline"
							color="violet"
							radius={"xl"}
							component={Link}
							to="/dashboard/home"
							onClick={handleHomeClick}
						>
							Take me back to home page
						</Button>
					</Group>
				</div>
			</div>
		</Container>
	);
}
