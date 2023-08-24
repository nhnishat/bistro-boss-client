import { useQuery } from '@tanstack/react-query';

const useMenu = () => {
	const {
		data: isMenu = [],
		refetch,
		isLoading: loading,
	} = useQuery(['menu'], async () => {
		const res = await fetch(
			'https://bistro-boss-server-three-steel.vercel.app/menu'
		);
		return res.json();
	});
	return [isMenu, refetch, loading];
};

export default useMenu;
