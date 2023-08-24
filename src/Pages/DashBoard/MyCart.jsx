import { Helmet } from 'react-helmet-async';
import { FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import SectionTitle from '../../Components/SectionTitle/SectionTitle';
import useCart from '../../hooks/useCart';

const MyCart = () => {
	const [cart, refetch] = useCart();
	const total = cart.reduce((sum, item) => item.price + sum, 0);
	const handeleDeletedItem = (item) => {
		console.log(item._id);

		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!',
		}).then((result) => {
			if (result.isConfirmed) {
				fetch(
					`https://bistro-boss-server-three-steel.vercel.app/carts/${item?._id}`,
					{
						method: 'DELETE',
					}
				)
					.then((res) => res.json())
					.then((data) => {
						refetch();
						Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
						console.log(data);
					});
			}
		});
	};
	return (
		<div className="w-full px-12">
			<Helmet>
				<title>Bistro Boss || My Cart</title>
			</Helmet>
			<SectionTitle subHeading="My Cart" heading="WANNA ADD MORE?" />
			<div className="uppercase flex justify-evenly font-semibold mx-5 h-[60px] items-center">
				<h3 className="text-3xl ">Total Items: {cart.length}</h3>
				<h3 className="3xl">Total Price: ${total}</h3>
				<Link to="/dashboard/payment">
					<button className="btn btn-sm btn-warning">Pay</button>
				</Link>
			</div>
			<div className="overflow-x-auto mt-5">
				<table className="table">
					<thead>
						<tr className="bg-yellow-500">
							<th className="text-xl text-white uppercase">#</th>
							<th className="text-xl text-white uppercase">Image</th>
							<th className="text-xl text-white uppercase">Food Name</th>
							<th className="text-xl text-white uppercase">Price</th>
							<th className="text-xl text-white uppercase">Action</th>
						</tr>
					</thead>
					<tbody>
						{cart.map((item, index) => (
							<tr key={item._id}>
								<td>{index + 1}</td>
								<td>
									<div className="avatar">
										<div className="mask mask-squircle w-12 h-12">
											<img
												src={item.image}
												alt="Avatar Tailwind CSS Component"
											/>
										</div>
									</div>
								</td>
								<td>{item.name}</td>
								<td className="">{item.price}</td>
								<td>
									<button
										onClick={() => handeleDeletedItem(item)}
										className="text-2xl text-white bg-red-500 btn btn-ghost btn-lg"
									>
										<FaTrashAlt />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default MyCart;
