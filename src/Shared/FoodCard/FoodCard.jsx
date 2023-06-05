import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useCart from '../../../../Hooks/useCart';
import { AuthContext } from '../../../Auth/AuthProvider';

const FoodCard = ({ item }) => {
	const [, refetch] = useCart();
	const { name, image, price, recipe, _id } = item;
	const navigate = useNavigate();
	const location = useLocation();
	const { user } = useContext(AuthContext);
	const handleAddToCart = (item) => {
		console.log(item);

		if (user && user.email) {
			const orderItem = {
				menuItemId: _id,
				name,
				image,
				price,
				email: user.email,
			};
			fetch('http://localhost:5000/carts', {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify(orderItem),
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					if (data.insertedId) {
						refetch();
						Swal.fire({
							position: 'top-end',
							icon: 'success',
							title: 'Food added cart',
							showConfirmButton: false,
							timer: 1500,
						});
					}
				});
		} else {
			Swal.fire({
				title: 'please add to order the food',
				text: "You won't be able to revert this!",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Login now!',
			}).then((result) => {
				if (result.isConfirmed) {
					navigate('/login', { state: { from: location } });
				}
			});
		}
	};

	return (
		<div className="card w-96 bg-base-100 shadow-xl">
			<figure className="px-10 pt-10">
				<img src={image} alt="Shoes" className="rounded-xl" />
				<p className="absolute right-0 mr-12 mt-4 top-14 px-4 bg-slate-900 text-white">
					{price}
				</p>
			</figure>
			<div className="card-body items-center text-center">
				<h2 className="card-title">{name}</h2>
				<p>{recipe}</p>
				<div className="card-actions">
					<button
						onClick={() => handleAddToCart(item)}
						className="btn btn-outline bg-slate-100 border-0 border-orange-400 border-b-4 mt-4"
					>
						Add To Cart
					</button>
				</div>
			</div>
		</div>
	);
};

export default FoodCard;
