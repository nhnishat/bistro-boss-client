import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layout/Main';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Log/Login';
import Menu from '../Pages/Menu/Menu';
import Order from '../Pages/OrderFood/Order/Order';
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
		],
	},
]);
export default Router;
