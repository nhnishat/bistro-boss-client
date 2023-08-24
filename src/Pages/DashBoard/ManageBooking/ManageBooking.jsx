import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaCheck } from 'react-icons/fa';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageBooking = () => {
	const { loading } = useAuth();
	const [axiosSecure] = useAxiosSecure();
	const [disabledItems, setDisabledItems] = useState([]);

	// Use useQuery outside the conditional block
	const { data: isData = [] } = useQuery({
		queryKey: ['booking'],
		enabled: !loading,
		queryFn: async () => {
			const response = await axiosSecure('/booking');
			console.log(response.data);
			return response.data;
		},
	});

	useEffect(() => {
		const storedItems = localStorage.getItem('acceptedItems');
		if (storedItems) {
			setDisabledItems(JSON.parse(storedItems));
		}
	}, []);

	const handleAcceptBooking = (item) => {
		console.log(item);
		setDisabledItems([...disabledItems, item._id]);
		// Update the status of the clicked item to 'Done' after a delay
		setTimeout(() => {
			axiosSecure
				.post('/show-booking', { ...item, status: 'Done' })
				.then((res) => {
					console.log(res.data);
					const updatedItems = [...disabledItems, item._id];
					setDisabledItems(updatedItems);
					localStorage.setItem('acceptedItems', JSON.stringify(updatedItems));
				});
		}, 1000);
	};

	return (
		<div className="w-full px-12">
			<Helmet>
				<title>Bistro Boss || Manage Booking</title>
			</Helmet>
			<SectionTitle heading="MANAGE ALL BOOKINGS" subHeading="At a Glance!" />
			<div className="overflow-x-auto">
				<table className="table">
					{/* table header */}
					<thead>
						<tr className="bg-yellow-500">
							<th className="text-xl text-white uppercase">#</th>
							<th className="text-xl text-white uppercase">Email</th>
							<th className="text-xl text-white uppercase">Phone</th>
							<th className="text-xl text-white uppercase">Date</th>
							<th className="text-xl text-white uppercase">Time</th>
							<th className="text-xl text-white uppercase">Status</th>
							<th className="text-xl text-white uppercase">Action</th>
						</tr>
					</thead>
					<tbody>
						{/* map over booking data */}
						{isData.map((item, index) => (
							<tr key={item._id}>
								<td>{index + 1}</td>
								<td>{item.email}</td>
								<td>{item.phone}</td>
								<td>{item.date}</td>
								<td>{item.time}</td>
								<td>{disabledItems.includes(item._id) ? 'Done' : 'Pending'}</td>
								<td>
									<button
										onClick={() => handleAcceptBooking(item)}
										disabled={disabledItems.includes(item._id)} // Disable if item is accepted
										className="btn btn-ghost btn-md bg-green-500 text-white text-xl"
									>
										<FaCheck />
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

export default ManageBooking;
// import { useQuery } from '@tanstack/react-query';
// import { useEffect, useState } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { FaCheck } from 'react-icons/fa';
// import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
// import useAuth from '../../../hooks/useAuth';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';

// const ManageBooking = () => {
// 	const { loading } = useAuth();
// 	const [axiosSecure] = useAxiosSecure();
// 	const [disabledItems, setDisabledItems] = useState([]);
// 	const [isPandding, setPandding] = useState('pandding');

// 	// Use useQuery outside the conditional block
// 	const { data: isData = [] } = useQuery({
// 		queryKey: ['booking'],
// 		enabled: !loading,
// 		queryFn: async () => {
// 			const response = await axiosSecure(`/booking`);
// 			console.log(response.data);
// 			return response.data; // Return the data from the query function
// 		},
// 	});

// 	useEffect(() => {
// 		const storedItems = localStorage.getItem('acceptedItems');
// 		if (storedItems) {
// 			setDisabledItems(JSON.parse(storedItems));
// 		}
// 	}, []);

// 	const handleAcceptBooking = (item) => {
// 		console.log(item);
// 		setPandding('Done');
// 		axiosSecure.post('/show-booking', item).then((res) => {
// 			console.log(res.data);
// 			const updatedItems = [...disabledItems, item._id];
// 			setDisabledItems(updatedItems);
// 			localStorage.setItem('acceptedItems', JSON.stringify(updatedItems));
// 		});
// 	};

// 	return (
// 		<div className="w-full px-12">
// 			<Helmet>
// 				<title>Bistro Boss || Manage Booking</title>
// 			</Helmet>
// 			<SectionTitle heading="MANAGE ALL BOOKINGS" subHeading="At a Glance!" />
// 			<div className="overflow-x-auto">
// 				<table className="table">
// 					{/* table header */}
// 					<thead>
// 						<tr className="bg-yellow-500">
// 							<th className="text-xl text-white uppercase">#</th>
// 							<th className="text-xl text-white uppercase">Email</th>
// 							<th className="text-xl text-white uppercase">Phone</th>
// 							<th className="text-xl text-white uppercase">Date</th>
// 							<th className="text-xl text-white uppercase">Time</th>
// 							<th className="text-xl text-white uppercase">Status</th>
// 							<th className="text-xl text-white uppercase">Action</th>
// 						</tr>
// 					</thead>
// 					<tbody>
// 						{/* map over booking data */}
// 						{isData.map((item, index) => (
// 							<tr key={item._id}>
// 								<td>{index + 1}</td>
// 								<td>{item.email}</td>
// 								<td>{item.phone}</td>
// 								<td>{item.date}</td>
// 								<td>{item.time}</td>
// 								<td>{isPandding}</td>
// 								<td>
// 									<button
// 										onClick={() => handleAcceptBooking(item)}
// 										disabled={disabledItems.includes(item._id)} // Disable if item is accepted
// 										className="btn btn-ghost btn-md bg-green-500 text-white text-xl"
// 									>
// 										<FaCheck />
// 									</button>
// 								</td>
// 							</tr>
// 						))}
// 					</tbody>
// 				</table>
// 			</div>
// 		</div>
// 	);
// };

// export default ManageBooking;
