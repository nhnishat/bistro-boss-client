import { useEffect, useState } from 'react';
import {
	LoadCanvasTemplate,
	loadCaptchaEnginge,
	validateCaptcha,
} from 'react-simple-captcha';

const Login = () => {
	const [disable, setDisable] = useState(true);
	useEffect(() => {
		loadCaptchaEnginge(6);
	});

	const handleLogin = (event) => {
		event.preventDefault();
		const form = event.target;
		const email = form.email.value;
		const password = form.password.value;
		console.log(email, password);
	};

	const handleValidate = (event) => {
		const user_captcha_value = event.target.value;
		console.log(user_captcha_value);

		if (validateCaptcha(user_captcha_value)) {
			setDisable(false);
		} else {
			setDisable(true);
		}
	};
	return (
		<div className="hero min-h-screen bg-base-200">
			<div className="hero-content flex-col lg:flex-row-reverse">
				<div className="text-center w-1/2 lg:text-left">
					<h1 className="text-5xl font-bold">Login now!</h1>
					<p className="py-6">
						Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
						excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
						a id nisi.
					</p>
				</div>
				<div className="card flex-shrink-0 md:w-1/2 max-w-sm shadow-2xl bg-base-100">
					<form onSubmit={handleLogin} className="card-body">
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
								name="password"
								placeholder="password"
								className="input input-bordered"
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
								type="text"
								name="captcha"
								onBlur={handleValidate}
								placeholder="password"
								className="type the captcha above"
							/>
						</div>
						<div className="form-control mt-6">
							<input type="submit" value="Login" className="btn btn-primary" />
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
