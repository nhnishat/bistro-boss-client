import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';

const FoodCart = ({ item }) => {
	const [, refetch] = useCart();
	const { user } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const { image, price, name, recipe, _id } = item;
	const handleAddToCart = (item) => {
		console.log(item);
		if (user && user?.email) {
			const cartsItem = {
				menuItemId: _id,
				image,
				price,
				name,
				recipe,
				email: user?.email,
			};
			fetch('https://bistro-boss-server-three-steel.vercel.app/carts', {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify(cartsItem),
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.insertedId) {
						refetch();
						Swal.fire({
							position: 'top-end',
							icon: 'success',
							title: 'Food added on the cart',
							showConfirmButton: false,
							timer: 1500,
						});
					}
				});
		} else {
			Swal.fire({
				title: 'Please login to order the food',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Login Now!',
			}).then((result) => {
				if (result.isConfirmed) {
					navigate('/login', { state: { from: location } });
				}
			});
		}
	};
	return (
		<div className="card w-96 bg-base-100 shadow-xl">
			<figure>
				<img src={image} alt="Shoes" />
				<p className="bg-black text-white absolute right-5 top-5 p-3 ">
					${price}
				</p>
			</figure>
			<div className="card-body">
				<h2 className="card-title">{name}</h2>
				<p>{recipe}</p>
				<div className="card-actions justify-end">
					<button
						onClick={() => handleAddToCart(item)}
						className="btn btn-outline border-0 border-b-4 mt-4 bg-slate-200 border-orange-400"
					>
						Add To Cart
					</button>
				</div>
			</div>
		</div>
	);
};

export default FoodCart;
