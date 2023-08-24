import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import useMenu from '../../../hooks/useMenu';
import Cover from '../Cover/Cover';
import MenuCategory from '../MenuCategory/MenuCategory';
const menuImg = 'https://i.ibb.co/TkNKjLp/banner3.jpg';
const dessertImg = 'https://i.ibb.co/T1zq2x0/dessert-bg.jpg';
const pizzaImg = 'https://i.ibb.co/m086YBb/pizza-bg.jpg';
const saladImg = 'https://i.ibb.co/DCjGssT/salad-bg.jpg';
const soupImg = 'https://i.ibb.co/Q9ztgP1/soup-bg.jpg';

const Menu = () => {
	const [isMenu] = useMenu();
	const soupItem = isMenu.filter((item) => item.category === 'soup');
	const offeredItem = isMenu.filter((item) => item.category === 'offered');
	const dessertItem = isMenu.filter((item) => item.category === 'dessert');
	const pizzaItem = isMenu.filter((item) => item.category === 'pizza');
	const saladItem = isMenu.filter((item) => item.category === 'salad');

	return (
		<div>
			<Helmet>
				<title>Bistro Boss | Menu</title>
			</Helmet>
			<Cover img={menuImg} title={'Our Menu'} />
			<SectionTitle subHeading={"Don't miss"} heading={"Today's Offer"} />
			<MenuCategory items={offeredItem} />
			<MenuCategory items={dessertItem} title={'dessert'} img={dessertImg} />
			<MenuCategory items={pizzaItem} title={'pizza'} img={pizzaImg} />
			<MenuCategory items={saladItem} title={'salad'} img={saladImg} />
			<MenuCategory items={soupItem} title={'soup'} img={soupImg} />
		</div>
	);
};

export default Menu;
