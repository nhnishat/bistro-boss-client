import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';

const SocialLogin = () => {
	const { googleSignIn } = useAuth();
	const navigate = useNavigate();

	const handleGoogleSignIn = () => {
		googleSignIn().then((result) => {
			const loggedInUser = result.user;
			console.log(loggedInUser);
			const saveUser = {
				name: loggedInUser.displayName,
				email: loggedInUser.email,
			};
			fetch('https://bistro-boss-server-three-steel.vercel.app/users', {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify(saveUser),
			})
				.then((res) => res.json())
				.then(() => {
					navigate('/');
					Swal.fire({
						position: 'top-end',
						icon: 'success',
						title: 'Your Account is Login',
						showConfirmButton: false,
						timer: 1500,
					});
				});
		});
	};

	return (
		<div>
			<div className="divider"></div>
			<div className="w-full text-center my-4">
				<button
					onClick={handleGoogleSignIn}
					className="btn btn-circle btn-outline"
				>
					<FaGoogle></FaGoogle>
				</button>
			</div>
		</div>
	);
};

export default SocialLogin;
