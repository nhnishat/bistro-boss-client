import { Helmet } from 'react-helmet-async';
import Banner from '../Banner/Banner';
import Bistro from '../Bistro/Bistro';
import Category from '../Category.jsx/Category';
import Featured from '../Featured/Featured';
import PopularMenu from '../PopularMenu/PopularMenu';
import Testimonials from '../Testimonials/Testimonials';

const Home = () => {
	return (
		<div>
			<Helmet>
				<title>Bistro Boss | Home</title>
			</Helmet>
			<Banner />
			<Category />
			<Bistro />
			<PopularMenu />
			<Featured />
			<Testimonials />
		</div>
	);
};

export default Home;
