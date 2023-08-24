import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import useAuth from '../../../hooks/useAuth';

const UserHome = () => {
	const { user } = useAuth();
	return (
		<div>
			<Helmet>
				<title>Bistro Boss || User Home</title>
			</Helmet>
			<SectionTitle heading="Hi, Welcome Back!" subHeading={user.displayName} />
			<div className="my-8 md:w-2/3 mx-auto p-36 flex flex-col items-center bg-yellow-600 text-white">
				{user.photoURL ? (
					<img src={user.photoURL} alt="profile" className="rounded-full" />
				) : (
					''
				)}
				<p className="my-2"> User Name: {user.displayName}</p>
				<p>User Email: {user.email}</p>
			</div>
		</div>
	);
};

export default UserHome;
