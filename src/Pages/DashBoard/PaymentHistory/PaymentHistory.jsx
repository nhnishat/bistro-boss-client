import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentHistory = () => {
	const { user, loading } = useAuth();
	const [axiosSecure] = useAxiosSecure();
	// const [isPayment, setIsPayment] = useState([]);
	// useEffect(() => {
	// 	fetch(`https://bistro-boss-server-three-steel.vercel.app/Payment/${user.emial}`)
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			console.log(data);
	// 			setIsPayment(data);
	// 		});
	// }, []);

	// console.log(isPayment);

	const { data: isPayment = [] } = useQuery({
		queryKey: ['payment'],
		enabled: !loading,
		queryFn: async () => {
			const res = await axiosSecure.get(`/payment/${user.email}`);
			console.log('Fetched data:', res.data);
			return res.data;
		},
	});
	console.log(isPayment);

	return (
		<div className="w-full px-12">
			<Helmet>
				<title>Bistro Boss || Payment History</title>
			</Helmet>
			<SectionTitle heading="Manage All payments" subHeading="Hurry up" />
			<div className="overflow-x-auto mt-12">
				<h3 className="text-2xl my-4 font-bold">
					Total Payments: {isPayment.length}
				</h3>
				<table className="table">
					{/* head */}
					<thead>
						<tr className="bg-yellow-500">
							<th className="text-xl text-white uppercase">#</th>
							<th className="text-xl text-white uppercase">transactionId</th>
							<th className="text-xl text-white uppercase">Email</th>
							<th className="text-xl text-white uppercase">Price</th>
							<th className="text-xl text-white uppercase">Date</th>
						</tr>
					</thead>
					<tbody>
						{/* row 1 */}
						{isPayment.map((payment, index) => (
							<tr key={payment._id}>
								<th>{index + 1}</th>
								<td>
									<span className="badge badge-ghost badge-sm">
										{payment.transactionId}
									</span>
								</td>
								<td>
									<span className="badge badge-ghost badge-sm">
										{payment.email}
									</span>
								</td>
								<td>
									<button className="btn btn-ghost btn-xs">
										${payment.price}
									</button>
								</td>
								<td>
									<span className="badge badge-ghost badge-sm">
										{payment.date}
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default PaymentHistory;
