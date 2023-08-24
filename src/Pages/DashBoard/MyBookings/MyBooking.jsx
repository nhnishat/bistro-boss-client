import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyBooking = () => {
	const queryClient = useQueryClient();
	const { user, loading } = useAuth();
	const [axiosSecure] = useAxiosSecure();
	const { data: isData = [] } = useQuery({
		queryKey: ['booking', user.email],
		enabled: !loading,
		queryFn: async () => {
			const response = await axiosSecure(`/booking/${user.email}`);
			console.log(response.data);
			return response.data;
		},
	});
	console.log(isData);

	const handleDeleteOne = (id) => {
		Swal.fire({
			title: 'Confirm Deletion',
			text: 'Are you sure you want to delete this booking?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#3085d6',
			confirmButtonText: 'Yes, delete it!',
		}).then((result) => {
			if (result.isConfirmed) {
				axiosSecure
					.delete(`/booking/${id}`)
					.then(() => {
						queryClient.invalidateQueries('show-booking');
					})
					.catch((error) => {
						console.error(error);
					});
			}
		});
	};
	return (
		<div className="w-full px-12">
			<Helmet>
				<title>Bistro Boss || My Booking</title>
			</Helmet>
			<SectionTitle heading="MY BOOKINGS" subHeading="Excellent Ambience" />
			<div className="overflow-x-auto">
				<table className="table">
					{/* head */}
					<thead>
						<tr className="bg-yellow-500">
							<th className="text-xl text-white uppercase">#</th>
							<th className="text-xl text-white uppercase">Guests</th>
							<th className="text-xl text-white uppercase">Time</th>
							<th className="text-xl text-white uppercase">Date</th>
							<th className="text-xl text-white uppercase">Action</th>
						</tr>
					</thead>
					<tbody>
						{/* row 1 */}
						{isData.map((item, index) => (
							<tr key={item._id}>
								<th>{index + 1}</th>

								<td className="font-bold">{item.guests}</td>

								<td>
									<span className="">{item.time}</span>
								</td>

								<td>
									<button className="">{item.date}</button>
								</td>
								<td>
									<button
										onClick={() => handleDeleteOne(item._id)}
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

export default MyBooking;
