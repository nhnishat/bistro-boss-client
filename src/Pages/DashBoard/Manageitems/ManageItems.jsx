import { Helmet } from 'react-helmet-async';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useMenu from '../../../hooks/useMenu';

const ManageItems = () => {
	const [isMenu, refetch] = useMenu();
	const [axiosSecure] = useAxiosSecure();
	// const handleDeleteOne = (item) => {
	// 	Swal.fire({
	// 		title: 'Are you sure?',
	// 		text: "You won't be able to revert this!",
	// 		icon: 'warning',
	// 		showCancelButton: true,
	// 		confirmButtonColor: '#3085d6',
	// 		cancelButtonColor: '#d33',
	// 		confirmButtonText: 'Yes, delete it!',
	// 	}).then((result) => {
	// 		if (result.isConfirmed) {
	// 			axiosSecure.delete(`/menu/${item._id}`).then((res) => {
	// 				console.log('deleted response', res.data);
	// 				if (res.data.deletedCount > 0) {
	// 					refetch();
	// 					Swal.fire('Deleted!', 'Your file has been deleted.',    'success');
	// 				}
	// 			});
	// 		}
	// 	});
	// };
	const handleDeleteOne = (item) => {
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
				axiosSecure
					.delete(`/menu/${item._id}`)
					.then((res) => {
						console.log('deleted response', res.data);
						if (res.data.deletedCount > 0) {
							refetch();
							Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
						}
					})
					.catch((error) => {
						console.error('Error deleting:', error);
						// Handle error here
					});
			}
		});
	};

	return (
		<div className="w-full px-12">
			<Helmet>
				<title>Bistro Boss || Manage Item</title>
			</Helmet>
			<SectionTitle heading="Manage All Items" subHeading="Hurry up" />
			<div className="overflow-x-auto">
				<table className="table">
					{/* head */}
					<thead>
						<tr className="bg-yellow-500">
							<th className="text-xl text-white uppercase">#</th>
							<th className="text-xl text-white uppercase">Item Image</th>
							<th className="text-xl text-white uppercase">Category</th>
							<th className="text-xl text-white uppercase">Price</th>
							<th className="text-xl text-white uppercase">Update</th>
							<th className="text-xl text-white uppercase">delete</th>
						</tr>
					</thead>
					<tbody>
						{/* row 1 */}
						{isMenu.map((item, index) => (
							<tr key={item._id}>
								<th>{index + 1}</th>
								<td>
									<div className="flex items-center space-x-3">
										<div className="avatar">
											<div className="mask mask-squircle w-12 h-12">
												<img
													src={item.image}
													alt="Avatar Tailwind CSS Component"
												/>
											</div>
										</div>
										<div>
											<div className="font-bold">{item.name}</div>
										</div>
									</div>
								</td>
								<td>
									<span className="badge badge-ghost badge-sm">
										{item.category}
									</span>
								</td>

								<td>
									<button className="btn btn-ghost btn-xs">
										${item.price}
									</button>
								</td>
								<td>
									<Link to={`/dashboard/updateItems/${item._id}`}>
										<button className="btn btn-ghost btn-md bg-yellow-500 text-white text-xl">
											<FaEdit />
										</button>
									</Link>
								</td>
								<td>
									<button
										onClick={() => handleDeleteOne(item)}
										className="btn btn-ghost btn-md bg-red-600 text-white text-xl"
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

export default ManageItems;
