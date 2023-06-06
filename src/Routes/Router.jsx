import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layout/Main';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Log/Login';
import Menu from '../Pages/Menu/Menu';
import Order from '../Pages/OrderFood/Order/Order';
import SignUp from '../Pages/SignUp/SignUp';
import Secret from '../Shared/Secret/Secret';
import PrivateRoute from './PrivateRoute';
const Router = createBrowserRouter([
	{
		path: '/',
		element: <Main />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: 'menu',
				element: <Menu />,
			},

			{
				path: 'order/:category',
				element: <Order />,
			},
			{
				path: 'login',
				element: <Login />,
			},
			{
				path: 'Signup',
				element: <SignUp />,
			},
			{
				path: 'secret',
				element: (
					<PrivateRoute>
						<Secret />
					</PrivateRoute>
				),
			},
		],
	},
]);
export default Router;
