import { FaLocationArrow, FaPhone, FaTimes } from 'react-icons/fa';

const ReservationFooter = () => {
	return (
		<footer className="footer p-10 bg-slate-200 mt-20">
			<div>
				<span className="footer-title text-3xl">
					<FaPhone className="text-yellow-700" />
				</span>
				<a className="link link-hover">PHONE</a>
				<a className="link link-hover">+38 (012) 34 56 789</a>
			</div>
			<div>
				<span className="footer-title text-3xl">
					<FaLocationArrow className="text-yellow-700" />
				</span>
				<a className="link link-hover">Address</a>
				<a className="link link-hover">
					Level-4, 34, Awal Centre, Banani, Dhaka
				</a>
			</div>
			<div>
				<span className="footer-title text-3xl">
					<FaTimes className="text-yellow-700" />
				</span>
				<a className="link link-hover">Mon - Fri: 08:00 - 22:00</a>
				<a className="link link-hover">Sat - Sun: 10:00 - 23:00</a>
			</div>
		</footer>
	);
};

export default ReservationFooter;
