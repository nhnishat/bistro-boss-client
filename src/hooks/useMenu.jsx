import { useQuery } from '@tanstack/react-query';

const useMenu = () => {
	const {
		data: menu = [],
		loading,
		refetch,
	} = useQuery({
		queryKey: ['menu'],
		queryFn: async () => {
			const res = await fetch('https://bistro-boss-sever-flax.vercel.app/menu');
			return res.json();
		},
	});
	return [menu, loading, refetch];
};

export default useMenu;
// useEffect(() => {
//     fetch('https://bistro-boss-sever-flax.vercel.app/menu')
//         .then(res => res.json())
//         .then(data => {
//             setMenu(data);
//             setLoading(false);
//         });
// }, [])
