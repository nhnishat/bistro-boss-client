import Banner from './Banner/Banner';
import Category from './Category/Category';
import Featured from './Featured/Featured';
import PopularMenu from './PopularMenu/PopularMenu';
import TestiMonials from './Testimonials/Testimonials';

const Home = () => {
	return (
		<div>
			<Banner />
			<Category />
			<PopularMenu />
			<Featured />
			<TestiMonials />
		</div>
	);
};

export default Home;
