import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';
import NavBar from '../Shared/Navbar/NavBar';

const Main = () => {
	const location = useLocation();
	const noHeaderFooter =
		location.pathname.includes('login') || location.pathname.includes('SignUp');

	return (
		<div>
			{noHeaderFooter || <NavBar />}
			<Outlet />
			{noHeaderFooter || <Footer />}
		</div>
	);
};

export default Main;
