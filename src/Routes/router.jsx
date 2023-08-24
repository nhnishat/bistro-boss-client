import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../Layout/Dashboard';
import Main from '../Layout/Main';
import AddItem from '../Pages/DashBoard/AddItem/AddItem';
import AdminHome from '../Pages/DashBoard/AdminHome/AdminHome';
import AllUsers from '../Pages/DashBoard/AllUsers/AllUsers';
import ManageBooking from '../Pages/DashBoard/ManageBooking/ManageBooking';
import ManageItems from '../Pages/DashBoard/Manageitems/ManageItems';
import MyBooking from '../Pages/DashBoard/MyBookings/MyBooking';
import MyCart from '../Pages/DashBoard/MyCart';
import Payment from '../Pages/DashBoard/Payment/Payment';
import PaymentHistory from '../Pages/DashBoard/PaymentHistory/PaymentHistory';
import Reservatios from '../Pages/DashBoard/Reservations/Reservatios';
import UpdateItem from '../Pages/DashBoard/UpdateItem/UpdateItem';
import UserHome from '../Pages/DashBoard/UserHome/UserHome';
import Home from '../Pages/Home/Home/Home';
import Login from '../Pages/Log/Login';
import Menu from '../Pages/Menu/Menu/Menu';
import Order from '../Pages/Order/Order/Order';
import Register from '../Pages/Register/Register';
import Secret from '../Pages/Secret/Secret';
import AdminRoute from './Admin/AdminRoute';
import PrivateRoute from './PrivateRoute/PrivateRoute';
const router = createBrowserRouter([
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
				path: '/register',
				element: <Register />,
			},
			{
				path: '/secret',
				element: (
					<PrivateRoute>
						<Secret />
					</PrivateRoute>
				),
			},
		],
	},
	{
		path: 'dashboard',
		element: (
			<PrivateRoute>
				<Dashboard />
			</PrivateRoute>
		),
		children: [
			{
				path: 'mycart',
				element: (
					<PrivateRoute>
						<MyCart />
					</PrivateRoute>
				),
			},
			{
				path: 'reservations',
				element: <Reservatios />,
			},
			{
				path: 'userhome',
				element: (
					<PrivateRoute>
						<UserHome />
					</PrivateRoute>
				),
			},
			{
				path: 'payment',
				element: <Payment />,
			},
			{
				path: 'paymenthistory',
				element: <PaymentHistory />,
			},
			{
				path: 'mybooking',
				element: <MyBooking />,
			},
			// admin route
			{
				path: 'adminhome',
				element: (
					<AdminRoute>
						<AdminHome />
					</AdminRoute>
				),
			},
			{
				path: 'allusers',
				element: (
					<AdminRoute>
						<AllUsers />
					</AdminRoute>
				),
			},
			{
				path: 'additem',
				element: (
					<AdminRoute>
						<AddItem />
					</AdminRoute>
				),
			},
			{
				path: 'manageitems',
				element: (
					<AdminRoute>
						<ManageItems />
					</AdminRoute>
				),
			},
			{
				path: 'booking',
				element: (
					<AdminRoute>
						<ManageBooking />
					</AdminRoute>
				),
			},

			{
				path: 'updateItems/:id',
				element: (
					<AdminRoute>
						<UpdateItem />
					</AdminRoute>
				),
				// loader: ({ params }) =>
				// 	fetch(
				// 		`https://bistro-boss-server-three-steel.vercel.app/menu/${params.id}`
				// 	),
			},
		],
	},
]);
export default router;
