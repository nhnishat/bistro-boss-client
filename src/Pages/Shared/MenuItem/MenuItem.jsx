const MenuItem = ({ item }) => {
	const { price, name, recipe } = item;
	return (
		<div className="flex space-x-4 mb-12">
			<img
				style={{ borderRadius: '0 200px 200px 200px' }}
				src="https://i.ibb.co/gThR5LM/menu-bg.png"
				alt=""
			/>
			<div>
				<h3 className="uppercase">{name}---------</h3>
				<p>{recipe}</p>
			</div>
			<p className="text-yellow-500">${price}</p>
		</div>
	);
};

export default MenuItem;
