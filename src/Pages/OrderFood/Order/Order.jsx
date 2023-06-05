import { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { useParams } from 'react-router-dom';

import { Helmet } from 'react-helmet-async';
import Cover from '../../../Shared/Cover/Cover';
import orderCoverImg from '../../../assets/shop/banner2.jpg';
import useMenu from '../../../hooks/useMenu';
import OrderTab from '../OrderTab/OrderTab';

const Order = () => {
	const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks'];
	const { category } = useParams();
	const initialIndex = categories.indexOf(category);
	const [tabIndex, setIndex] = useState(initialIndex);
	const [menu] = useMenu();
	console.log(category);
	const dessert = menu.filter((item) => item.category === 'dessert');
	const pizza = menu.filter((item) => item.category === 'pizza');
	const salad = menu.filter((item) => item.category === 'salad');
	const soup = menu.filter((item) => item.category === 'soup');
	const drinks = menu.filter((item) => item.category === 'drinks');
	return (
		<div>
			<Helmet>
				<title>Bistro Boss | Order</title>
			</Helmet>
			<Cover img={orderCoverImg} title="Order Food"></Cover>
			<Tabs defaultIndex={tabIndex} onSelect={(index) => setIndex(index)}>
				<TabList>
					<Tab>Salad</Tab>
					<Tab>Pizza</Tab>
					<Tab>Soup</Tab>
					<Tab>Dessert</Tab>
					<Tab>Drink</Tab>
				</TabList>
				<TabPanel>
					<OrderTab items={salad}></OrderTab>
				</TabPanel>
				<TabPanel>
					<OrderTab items={pizza}></OrderTab>
				</TabPanel>
				<TabPanel>
					<OrderTab items={soup}></OrderTab>
				</TabPanel>
				<TabPanel>
					<OrderTab items={dessert}></OrderTab>
				</TabPanel>
				<TabPanel>
					<OrderTab items={drinks}></OrderTab>
				</TabPanel>
			</Tabs>
		</div>
	);
};

export default Order;
