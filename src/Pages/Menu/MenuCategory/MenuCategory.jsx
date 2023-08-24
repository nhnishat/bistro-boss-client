import { Link } from 'react-router-dom';
import MenuItem from '../../Shared/MenuItem/MenuItem';
import Cover from '../Cover/Cover';

const MenuCategory = ({ items, title, img }) => {
	return (
		<div className="pt-8">
			{title && <Cover img={img} title={title} />}
			<div className="grid md:grid-cols-2 gap-10 my-16">
				{items.map((item) => (
					<MenuItem key={item._id} item={item} />
				))}
			</div>
			<Link to={`/order/${title}`}>
				<button className="btn btn-outline border-0 border-b-2 mb-3 text-center items-center">
					Order Now
				</button>
			</Link>
		</div>
	);
};

export default MenuCategory;
