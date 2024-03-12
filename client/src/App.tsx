import { Dashboard } from "./Components/Dashboard/Dashboard";
import Login from "./Components/Onboard/Login";
import {
	Navigate,
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom";
import { useUserStore } from "./Stores/userStore";
import "@mantine/notifications/styles.css";
import refreshFirebaseToken from "./Helpers/refreshFirebaseToken";
import { useEffect } from "react";

const InitialRoute: React.FC = () => {
	const { isLoggedIn } = useUserStore();

	// Redirect to the appropriate route based on the login status
	return isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};

const ProtectedDashboardRoute = () => {
	const { isLoggedIn } = useUserStore();

	if (!isLoggedIn) {
		return <Navigate to="/login" />;
	}

	return <Dashboard />;
};

const router = createBrowserRouter([
	{
		path: "/",
		element: <InitialRoute />,
	},
	{
		path: "/login",
		element: <Login />,
	},

	{
		path: "/dashboard/*",
		element: <ProtectedDashboardRoute />,
	},
]);

function App() {
	useEffect(() => {
		refreshFirebaseToken();

		// Set up an interval to refresh the token every 45 minutes
		const refreshTokenInterval = setInterval(
			refreshFirebaseToken,
			55 * 60 * 1000
		);

		return () => clearInterval(refreshTokenInterval);
	}, []);
	return (
		<RouterProvider router={router} future={{ v7_startTransition: true }} />
	);
}

export default App;
