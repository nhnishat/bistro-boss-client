import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import FoodCart from '../../../Components/FoodCart/FoodCart';
import useMenu from '../../../hooks/useMenu';
import Cover from '../../Menu/Cover/Cover';
const orderCover = 'https://i.ibb.co/bRQ2vPr/banner2.jpg';
const Order = () => {
	const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks'];
	const { category } = useParams();
	const initialIndex = categories.indexOf(category);
	const [tabIndex, setTabIndex] = useState(initialIndex);
	const [isMenu] = useMenu();
	const soupItem = isMenu.filter((item) => item.category === 'soup');
	const drinksItem = isMenu.filter((item) => item.category === 'drinks');
	const dessertItem = isMenu.filter((item) => item.category === 'dessert');
	const pizzaItem = isMenu.filter((item) => item.category === 'pizza');
	const saladItem = isMenu.filter((item) => item.category === 'salad');

	return (
		<div>
			<Helmet>
				<title>Bistro Boss | Food Order</title>
			</Helmet>
			<Cover img={orderCover} title={'Order Food'} />

			<Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
				<TabList>
					<Tab>SaLad</Tab>
					<Tab>Pizza</Tab>
					<Tab>Soup</Tab>
					<Tab>Dessert</Tab>
					<Tab>Drinks</Tab>
				</TabList>
				<TabPanel>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-16">
						{saladItem.map((item) => (
							<FoodCart key={item._id} item={item} />
						))}
					</div>
				</TabPanel>
				<TabPanel>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-16">
						{pizzaItem.map((item) => (
							<FoodCart key={item._id} item={item} />
						))}
					</div>
				</TabPanel>
				<TabPanel>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-16">
						{soupItem.map((item) => (
							<FoodCart key={item._id} item={item} />
						))}
					</div>
				</TabPanel>
				<TabPanel>
					<div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-10 my-16">
						{dessertItem.map((item) => (
							<FoodCart key={item._id} item={item} />
						))}
					</div>
				</TabPanel>
				<TabPanel>
					<div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-10 my-16">
						{drinksItem.map((item) => (
							<FoodCart key={item._id} item={item} />
						))}
					</div>
				</TabPanel>
			</Tabs>
		</div>
	);
};

export default Order;
