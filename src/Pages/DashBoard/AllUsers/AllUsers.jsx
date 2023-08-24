import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { FaTrashAlt, FaUserShield } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllUsers = () => {
	const [axiosSecure] = useAxiosSecure();
	const { data: users = [], refetch } = useQuery(['users'], async () => {
		const res = await axiosSecure.get('/users');
		return res.data;
	});

	const handleMakeAdmin = (user) => {
		fetch(
			`https://bistro-boss-server-three-steel.vercel.app/users/admin/${user._id}`,
			{
				method: 'PATCH',
			}
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.modifiedCount) {
					refetch();
					Swal.fire({
						position: 'top-end',
						icon: 'success',
						title: `${user.name} is now an Admin`,
						showConfirmButton: false,
						timer: 1500,
					});
				}
			});
	};
	const handleDelete = (user) => {
		console.log(user);
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
					`https://bistro-boss-server-three-steel.vercel.app/users/admin/${user?._id}`,
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
				<title>Bistro Boss || All User</title>
			</Helmet>
			<h3 className="my-4 text-3xl font-semibold">
				Total Users {users.length}
			</h3>
			<div className="overflow-x-auto">
				<table className="table table-zebra">
					{/* head */}
					<thead>
						<tr className="bg-yellow-500">
							<th className="text-xl text-white uppercase">#</th>
							<th className="text-xl text-white uppercase">Name</th>
							<th className="text-xl text-white uppercase">Email</th>
							<th className="text-xl text-white uppercase">Role</th>
							<th className="text-xl text-white uppercase">Action</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user, index) => (
							<tr key={user._id}>
								<th>{index + 1}</th>
								<td>{user.name}</td>
								<td>{user.email}</td>
								<td>
									{user.role === 'admin' ? (
										'admin'
									) : (
										<>
											<button
												onClick={() => handleMakeAdmin(user)}
												className="btn btn-ghost btn-lg bg-yellow-600 text-white"
											>
												<FaUserShield />
											</button>
										</>
									)}
								</td>
								<td>
									<button
										onClick={() => handleDelete(user)}
										className="btn btn-ghost btn-lg text-white bg-red-500"
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

export default AllUsers;
