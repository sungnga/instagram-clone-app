import React, { useState, useEffect, createContext } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from './graphql/mutations';
import defaultUserImage from './images/default-user-image.jpg';

const provider = new firebase.auth.GoogleAuthProvider();

// Find these options in your Firebase console
firebase.initializeApp({
	apiKey: process.env.REACT_APP_FB_API_KEY,
	authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FB_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FB_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FB_APP_ID,
	measurementId: process.env.REACT_APP_FB_MEASUREMENT_ID
});

export const AuthContext = createContext();

function AuthProvider({ children }) {
	const [authState, setAuthState] = useState({ status: 'loading' });
	const [createUser] = useMutation(CREATE_USER);

	useEffect(() => {
		firebase.auth().onAuthStateChanged(async (user) => {
			if (user) {
				const token = await user.getIdToken();
				const idTokenResult = await user.getIdTokenResult();
				const hasuraClaim =
					idTokenResult.claims['https://hasura.io/jwt/claims'];

				if (hasuraClaim) {
					setAuthState({ status: 'in', user, token });
				} else {
					// Check if refresh is required.
					const metadataRef = firebase
						.database()
						.ref(`metadata/${user.uid}/refreshTime`);

					metadataRef.on('value', async (data) => {
						if (!data.exists) return;
						// Force refresh to pick up the latest custom claims changes.
						const token = await user.getIdToken(true);
						setAuthState({ status: 'in', user, token });
					});
				}
			} else {
				setAuthState({ status: 'out' });
			}
		});
	}, []);

	async function signInWithGoogle() {
		await firebase.auth().signInWithPopup(provider);
	}

	async function signUpWithEmailAndPassword(formData) {
		const data = await firebase
			.auth()
			.createUserWithEmailAndPassword(formData.email, formData.password);
		if (data.additionalUserInfo.isNewUser) {
			const variables = {
				userId: data.user.uid,
				name: formData.name,
				username: formData.username,
				email: data.user.email,
				bio: '',
				website: '',
				phoneNumber: '',
				profileImage: defaultUserImage
			};
			await createUser({ variables });
		}
	}

	async function signOut() {
		setAuthState({ status: 'loading' });
		await firebase.auth().signOut();
		setAuthState({ status: 'out' });
	}

	if (authState.status === 'loading') {
		return null;
	} else {
		return (
			<AuthContext.Provider
				value={{
					authState,
					signInWithGoogle,
					signOut,
					signUpWithEmailAndPassword
				}}
			>
				{children}
			</AuthContext.Provider>
		);
	}
}

export default AuthProvider;
