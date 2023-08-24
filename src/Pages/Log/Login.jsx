import {
	LoadCanvasTemplate,
	loadCaptchaEnginge,
	validateCaptcha,
} from 'react-simple-captcha';

import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';

const Login = () => {
	const { signIn } = useAuth();
	const [disable, setDisable] = useState(true);
	const navigate = useNavigate();
	const location = useLocation();
	// console.log(location);
	const from = location.state?.from?.pathname || '/';

	const handleLoginSubmit = (event) => {
		event.preventDefault();
		const form = event.target;
		const email = form.email.value;
		const password = form.password.value;

		signIn(email, password).then((result) => {
			const loginUser = result.user;
			console.log(loginUser);
			form.reset();
			navigate(from, { replace: true });
			Swal.fire({
				position: 'top-end',
				icon: 'success',
				title: 'Your Account is Login',
				showConfirmButton: false,
				timer: 1500,
			});
		});
	};

	useEffect(() => {
		loadCaptchaEnginge(6);
	}, []);
	const submitValidCaptcha = (event) => {
		const user_captcha_value = event.target.value;
		if (validateCaptcha(user_captcha_value) == true) {
			setDisable(false);
		} else {
			setDisable(true);
		}
	};
	return (
		<div className="hero">
			<div className="hero-content flex-col lg:flex-row gap-10 my-36">
				<div className="text-center w-2/3">
					<img src="https://i.ibb.co/5G01ZNh/authentication.gif" alt="login" />
				</div>
				<div className="card flex-shrink-0 w-2/3 max-w-sm shadow-2xl">
					<form onSubmit={handleLoginSubmit} className="card-body">
						<div className="form-control">
							<label className="label">
								<span className="label-text">Email</span>
							</label>
							<input
								type="email"
								placeholder="email"
								name="email"
								className="input input-bordered"
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Password</span>
							</label>
							<input
								type="password"
								placeholder="password"
								className="input input-bordered"
								name="password"
							/>
							<label className="label">
								<a href="#" className="label-text-alt link link-hover">
									Forgot password?
								</a>
							</label>
						</div>
						<div className="form-control">
							<label className="label">
								<LoadCanvasTemplate />
							</label>
							<input
								onBlur={submitValidCaptcha}
								type="text"
								placeholder="type the text above"
								className="input input-bordered"
								name="captcha"
							/>
						</div>
						<div className="form-control mt-6">
							<button disabled={disable} className="btn btn-primary">
								Login
							</button>
						</div>
						<p className="my-3">
							Dont’t have an Account ?
							<Link to="/register" className="text-orange-600 ms-2">
								Register
							</Link>
						</p>
						<SocialLogin />
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
