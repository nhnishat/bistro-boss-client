import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';

const Register = () => {
	const { createUser, updateUserProfile } = useAuth();
	const navigate = useNavigate();
	const handleRegisteerSubmit = (event) => {
		event.preventDefault();
		const form = event.target;
		const name = form.name.value;
		const image = form.image.value;
		const email = form.email.value;
		const password = form.password.value;
		console.log(name, email, image, password);
		createUser(email, password)
			.then((result) => {
				const loggedUser = result.user;
				console.log(loggedUser);
				updateUserProfile(name, image)
					.then(() => {
						const saveUsers = { name, email };
						console.log('user Profile updated');
						console.log('saveUsers', saveUsers);
						fetch('https://bistro-boss-server-three-steel.vercel.app/users', {
							method: 'POST',
							headers: {
								'content-type': 'application/json',
							},
							body: JSON.stringify(saveUsers),
						})
							.then((res) => res.json())
							.then((data) => {
								if (data.insertedId) {
									form.reset();
									Swal.fire({
										position: 'top-end',
										icon: 'success',
										title: 'Create Your Account',
										showConfirmButton: false,
										timer: 1500,
									});
									navigate('/');
								}
							});
					})
					.catch((error) => console.log(error));
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className="hero">
			<div className="hero-content flex-col lg:flex-row my-36">
				<div className="text-center lg:text-left w-1/2">
					<img src="https://i.ibb.co/h1BRzJq/authentication1.png" alt="" />
				</div>
				<div className="card flex-shrink-0 max-w-sm shadow-2xl bg-base-100  w-1/2">
					<form onSubmit={handleRegisteerSubmit} className="card-body">
						<div className="form-control">
							<label className="label">
								<span className="label-text">Name*</span>
							</label>
							<input
								name="name"
								type="text"
								placeholder="Your Name"
								className="input input-bordered"
								required
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">image*</span>
							</label>
							<input
								name="image"
								type="text"
								placeholder="Image Url"
								className="input input-bordered"
								required
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Email*</span>
							</label>
							<input
								type="email"
								name="email"
								placeholder="Your Email"
								className="input input-bordered"
								required
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Password*</span>
							</label>
							<input
								type="password"
								name="password"
								placeholder="Your Password"
								className="input input-bordered"
								required
							/>
						</div>
						<div className="form-control mt-6">
							<button className="btn btn-primary">Login</button>
						</div>
						<p className="my-3">
							Already have an Account ?
							<Link to="/login" className="text-orange-500 ms-2">
								Login
							</Link>
						</p>
						<SocialLogin />
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
