import { Dashboard } from "./Components/Dashboard/Dashboard";
import Login from "./Components/Onboard/Login";
import {
	Navigate,
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom";
import { useUserStore } from "./Stores/userStore";

const InitialRoute: React.FC = () => {
	const { isLoggedIn } = useUserStore();

	// Redirect to the appropriate route based on the login status
	return isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
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
		element: <Dashboard />,
	},
]);

function App() {
	return (
		<RouterProvider router={router} future={{ v7_startTransition: true }} />
	);
}

export default App;
