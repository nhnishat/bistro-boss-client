import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useCart = () => {
	const { user, loading } = useAuth();
	// const token = localStorage.getItem('access-token');
	const [axiosSecure] = useAxiosSecure();

	const { refetch, data: cart = [] } = useQuery({
		queryKey: ['cart', user?.email],
		enabled: !loading,
		queryFn: async () => {
			const res = await axiosSecure(`/carts?email=${user?.email}`);
			console.log('res form data', res.data);
			return res.data;
		},
		// const { refetch, data: cart = [] } = useQuery({
		// 	queryKey: ['cart', user?.email],
		// 	queryFn: async () => {
		// 		const res = await fetch(
		// 			`https://bistro-boss-server-three-steel.vercel.app/carts?email=${user?.email}`,
		// 			{
		// 				headers: {
		// 					authorization: `bearer ${token}`,
		// 				},
		// 			}
		// 		);
		// 		return res.json();
		// 	},
	});
	return [cart, refetch];
};

export default useCart;
