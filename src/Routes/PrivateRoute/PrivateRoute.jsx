import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const PrivateRoute = ({ children }) => {
	const { user, loading } = useAuth();
	const location = useLocation();
	if (loading) {
		// return <span className="loading loading-spinner loading-lg"></span>;
		return <Navigate to="/login"></Navigate>;
	}
	if (user) {
		return children;
	}
	// if (!user) {
	// 	return <Navigate to="/login"></Navigate>;
	// }

	return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
