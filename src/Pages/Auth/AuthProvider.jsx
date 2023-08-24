import axios from 'axios';
import {
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile,
} from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.confg';

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const googleProvider = new GoogleAuthProvider();

	const createUser = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const signIn = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};

	const googleSignIn = () => {
		setLoading(true);
		return signInWithPopup(auth, googleProvider);
	};

	const logOut = () => {
		setLoading(true);
		return signOut(auth);
	};

	const updateUserProfile = (name, photo) => {
		return updateProfile(auth.currentUser, {
			displayName: name,
			photoURL: photo,
		});
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);

			if (currentUser) {
				axios
					.post('https://bistro-boss-server-three-steel.vercel.app/jwt', {
						email: currentUser.email,
					})
					.then((data) => {
						console.log(data.data);
						localStorage.setItem('access-token', data.data);
						setLoading(false);
					});
			} else {
				localStorage.removeItem('access-token');
			}
			// fetch('https://bistro-boss-server-three-steel.vercel.app/jwt', {
			// 	method: 'POST',
			// 	headers: {
			// 		'content-type': 'application/json',
			// 	},
			// 	body: JSON.stringify(),
			// });
		});
		return () => {
			return unsubscribe();
		};
	}, []);

	const authInfo = {
		user,
		loading,
		createUser,
		signIn,
		googleSignIn,
		logOut,
		updateUserProfile,
	};
	return (
		<div>
			<AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
		</div>
	);
};

export default AuthProvider;
