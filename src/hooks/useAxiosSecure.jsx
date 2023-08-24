import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

const axiosSecure = axios.create({
	baseURL: 'https://bistro-boss-server-three-steel.vercel.app',
});

const useAxiosSecure = () => {
	const { logIn, logOut } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		const interceptor = axiosSecure.interceptors.request.use(async (config) => {
			const token = localStorage.getItem('access-token');
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			} else {
				// If no token is found, log in and redirect to the login page
				await logIn();
				navigate('/login');
			}
			return config;
		});

		return () => {
			axiosSecure.interceptors.request.eject(interceptor);
		};
	}, [logIn, navigate]);

	useEffect(() => {
		const interceptor = axiosSecure.interceptors.response.use(
			(response) => response,
			async (error) => {
				if (
					error.response &&
					(error.response.status === 401 || error.response.status === 403)
				) {
					await logOut();
					navigate('/login'); // Redirect to the login page after logging out
				}
				return Promise.reject(error);
			}
		);

		return () => {
			axiosSecure.interceptors.response.eject(interceptor);
		};
	}, [logOut, navigate]);

	return [axiosSecure];
};

export default useAxiosSecure;
