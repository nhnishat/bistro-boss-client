import { useForm } from 'react-hook-form';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import ReservationFooter from './ReservationFooter';

const Reservatios = () => {
	const { user } = useAuth();
	const [axiosSecure] = useAxiosSecure();
	const {
		register,
		handleSubmit,
		formState: { errors },
		// setValue,
	} = useForm();

	const onSubmit = (data) => {
		console.log(data);
		const res = axiosSecure.post('/booking', data);
		return res.data;
	};
	return (
		<div className="w-full px-12">
			<SectionTitle subHeading="Reservation" heading="BOOK A TABLE" />
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex gap-12">
					<div>
						<label className="label-text font-semibold mb-2">Date*</label>
						<input
							type="date"
							{...register('date', { required: true })}
							className="input input-bordered w-full "
						/>
						{errors.date && <p>Date is required</p>}
					</div>
					<div>
						<label className="label-text font-semibold mb-2">Time*</label>
						<input
							type="time"
							{...register('time', { required: true })}
							className="input input-bordered w-full "
						/>
						{errors.time && <p>Time is required</p>}
					</div>
					<div>
						<label className="label-text font-semibold mb-2">
							Number of Guests*
						</label>
						<input
							type="number"
							{...register('guests', { required: true, min: 1 })}
							className="input input-bordered w-full "
						/>
						{errors.guests && <p>Number of guests is required</p>}
					</div>
				</div>

				<div className="flex gap-12 my-10">
					<div>
						<label className="label-text font-semibold mb-2">Name*</label>
						<input
							type="text"
							defaultValue={user.displayName}
							{...register('name', { required: true })}
							className="input input-bordered w-full "
						/>
						{errors.name && <p>Name is required</p>}
					</div>
					<div>
						<label className="label-text font-semibold mb-2">Phone*</label>
						<input
							type="tel"
							{...register('phone', { required: true })}
							className="input input-bordered w-full "
						/>
						{errors.phone && <p>Valid phone number is required</p>}
					</div>
					<div>
						<label className="label-text font-semibold mb-2">Email*</label>
						<input
							type="email"
							defaultValue={user.email}
							{...register('email', { required: true })}
							className="input input-bordered w-full "
						/>
						{errors.email && <p>Valid email is required</p>}
					</div>
				</div>

				{/* <button type="b">Submit</button> */}
				<input
					type="submit"
					value="Book A Table"
					className="btn btn-warning mb-3 items-center text-center"
				/>
			</form>
			<ReservationFooter />
		</div>
	);
};

export default Reservatios;
