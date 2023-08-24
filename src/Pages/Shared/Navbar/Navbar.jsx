import { FaShoppingCart, FaUserAlt } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import useAdmin from '../../../hooks/useAdmin';
import useAuth from '../../../hooks/useAuth';
import useCart from '../../../hooks/useCart';

const Navbar = () => {
	const [isAdmin] = useAdmin();
	const dashboardLink = isAdmin
		? '/dashboard/adminhome'
		: '/dashboard/userhome';
	const { user, logOut } = useAuth();
	const [cart] = useCart();
	console.log(user);
	const singnOut = () => {
		logOut();
	};
	const navOption = (
		<>
			<li>
				<NavLink
					to="/"
					className={({ isActive, isPending }) =>
						isPending ? 'text-purple-700' : isActive ? 'text-purple-700' : ''
					}
				>
					Home
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/menu"
					className={({ isActive, isPending }) =>
						isPending ? 'text-purple-700' : isActive ? 'text-purple-700' : ''
					}
				>
					Our Menu
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/order/salad"
					className={({ isActive, isPending }) =>
						isPending ? 'text-purple-700' : isActive ? 'text-purple-700' : ''
					}
				>
					Order Food
				</NavLink>
			</li>
			<li>
				<NavLink
					to={dashboardLink}
					className={({ isActive, isPending }) =>
						isPending ? 'text-purple-700' : isActive ? 'text-purple-700' : ''
					}
				>
					DashBoard
				</NavLink>
			</li>
			{/* {isAdmin ? (
				<li>
					<NavLink
						to="/dashboard/adminhome"
						className={({ isActive, isPending }) =>
							isPending ? 'text-purple-700' : isActive ? 'text-purple-700' : ''
						}
					>
						Dashboard
					</NavLink>
				</li>
			) : (
				<li>
					<NavLink
						to="/dashboard/userhome"
						className={({ isActive, isPending }) =>
							isPending ? 'text-purple-700' : isActive ? 'text-purple-700' : ''
						}
					>
						Dashboard
					</NavLink>
				</li>
			)} */}
			<li>
				<Link to="/dashboard/mycart">
					<button className="btn">
						<FaShoppingCart />
						<div className="badge badge-secondary">{cart?.length || 0}</div>
					</button>
				</Link>
			</li>
		</>
	);
	return (
		<>
			<div className="navbar fixed z-10 bg-opacity-40 bg-black text-white max-w-screen-xl">
				<div className="navbar-start">
					<div className="dropdown">
						<label tabIndex={0} className="btn btn-ghost lg:hidden">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h8m-8 6h16"
								/>
							</svg>
						</label>
						<ul
							tabIndex={0}
							className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow  rounded-box w-52 bg-black text-white text-center"
						>
							{navOption}
						</ul>
					</div>
					<Link
						to="/"
						className="text-white font-cinzel text-xl font-bold tracking-widest normal-case leading-6 px-3"
					>
						Bistro Boss <br />
						<div className="mt-2">Restaurant</div>
					</Link>
				</div>
				<div className="navbar-center hidden lg:flex">
					<ul className="menu menu-horizontal px-1 text-center items-center">
						{navOption}
					</ul>
				</div>
				<div className="navbar-end">
					{user ? (
						<>
							<img
								src={user.photoURL}
								alt=""
								title={user.displayName}
								className="rounded-full h-10 w-10 mx-3"
							/>
						</>
					) : (
						<FaUserAlt className="rounded-full h-10 w-10 mx-3" />
					)}

					{user ? (
						<Link onClick={singnOut}>
							<button className="btn btn-active btn-neutral">Logout</button>
						</Link>
					) : (
						<Link to="/login">
							<button className="btn btn-active btn-neutral">Login</button>
						</Link>
					)}
				</div>
			</div>
		</>
	);
};

export default Navbar;
