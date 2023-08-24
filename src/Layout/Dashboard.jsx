import {
	FaCalendarAlt,
	FaHome,
	FaShoppingCart,
	FaUsers,
	FaUtensils,
	FaWallet,
} from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';
import useCart from '../hooks/useCart';

const Dashboard = () => {
	const [cart] = useCart();
	const [isAdmin] = useAdmin();
	return (
		<div className="drawer lg:drawer-open">
			<input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content flex flex-col">
				<Outlet />
				<label
					htmlFor="my-drawer-2"
					className="btn btn-primary drawer-button lg:hidden"
				>
					Open drawer
				</label>
			</div>
			<div className="drawer-side bg-[#D1A054]">
				<label htmlFor="my-drawer-2" className="drawer-overlay"></label>
				<ul className="menu p-4 w-80">
					{/* Sidebar content here */}

					<li>
						<NavLink
							to="/"
							className="text-black font-cinzel text-3xl font-bold tracking-widest normal-case leading-10 px-3 mb-36"
						>
							Bistro Boss <br /> Restaurant
						</NavLink>
					</li>
					{isAdmin ? (
						<>
							<li>
								<NavLink to="/dashboard/adminhome">
									<FaHome />
									Admin Home
								</NavLink>
							</li>
							<li>
								<NavLink to="/dashboard/additem">
									<FaUtensils />
									Add an Items
								</NavLink>
							</li>
							<li>
								<NavLink to="/dashboard/manageitems">
									<FaWallet />
									Manage Items
								</NavLink>
							</li>
							<li>
								<NavLink to="/dashboard/booking">
									<FaWallet />
									Manage Bookings
								</NavLink>
							</li>
							<li>
								<NavLink to="/dashboard/allusers">
									<FaUsers />
									All Users
								</NavLink>
							</li>
						</>
					) : (
						<>
							<li>
								<NavLink to="/dashboard/userhome">
									<FaHome />
									User Home
								</NavLink>
							</li>
							<li>
								<NavLink to="/dashboard/reservations">
									<FaCalendarAlt />
									Reservatios
								</NavLink>
							</li>
							<li>
								<NavLink to="/dashboard/paymenthistory">
									<FaWallet />
									Payment History
								</NavLink>
							</li>
							<li>
								<NavLink to="/dashboard/mybooking">
									<FaWallet />
									MyBooking
								</NavLink>
							</li>
							<li>
								<NavLink to="/dashboard/mycart">
									<FaShoppingCart />
									My Cart
									<span className="badge badge-secondary">
										{cart?.length || 0}
									</span>
								</NavLink>
							</li>
						</>
					)}
					<div className="divider"></div>
					<li>
						<NavLink to="/">
							<FaHome></FaHome> Home
						</NavLink>
					</li>
					<li>
						<NavLink to="/menu">
							<FaHome /> Our Menu
						</NavLink>
					</li>
					<li>
						<NavLink to="/order/salad">
							<FaHome /> Order Food
						</NavLink>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Dashboard;
