import { Outlet } from 'react-router-dom';
import TestiMonials from '../Pages/Home/Testimonials/Testimonials';
import Footer from '../Shared/Footer/Footer';
import NavBar from '../Shared/Navbar/NavBar';

const Main = () => {
	return (
		<div>
			<NavBar />
			<Outlet />
			<Footer />
			<TestiMonials />
		</div>
	);
};

export default Main;
