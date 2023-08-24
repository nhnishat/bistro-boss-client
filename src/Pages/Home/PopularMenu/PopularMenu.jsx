import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import useMenu from '../../../hooks/useMenu';
import MenuItem from '../../Shared/MenuItem/MenuItem';

const PopularMenu = () => {
	const [isMenu] = useMenu();
	const popularItem = isMenu.filter((item) => item.category === 'popular');
	// const [isMenu, setMenu] = useState([]);

	// useEffect(() => {
	// 	fetch('https://bistro-boss-server-three-steel.vercel.app/menu')
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			const popularItem = data.filter((item) => item.category === 'popular');
	// 			setMenu(popularItem);
	// 		});
	// }, []);

	// console.log(isMenu);
	return (
		<section>
			<SectionTitle subHeading="from Our Menu" heading="Popular Items" />
			<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
				{popularItem.map((item) => (
					<MenuItem item={item} key={item._id} />
				))}
			</div>
		</section>
	);
};

export default PopularMenu;
