import React, { Fragment, useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import isEmail from 'validator/lib/isEmail';
import {
	Button,
	Card,
	CardHeader,
	InputAdornment,
	TextField,
	Typography
} from '@material-ui/core';
import { useLoginPageStyles } from '../styles';
import SEO from '../components/shared/Seo';
import FacebookIconBlue from '../images/facebook-icon-blue.svg';
import FacebookIconWhite from '../images/facebook-icon-white.png';
import { AuthContext } from '../auth';
import { useApolloClient } from '@apollo/client';
import { GET_USER_EMAIL } from '../graphql/queries';
import { AuthError } from './signup';

function LoginPage() {
	const classes = useLoginPageStyles();
	const { register, handleSubmit, formState, watch } = useForm({ mode: 'all' });
	const { logInWithEmailAndPassword } = useContext(AuthContext);
	const [showPassword, setPasswordVisibility] = useState(false);
	const [error, setError] = useState('');
	const hasPassword = Boolean(watch('password'));
	const history = useHistory();
	const client = useApolloClient();

	// For username TextField, we set input to the name props
	// For password TextField, we set password to the name props
	// Destructuring from data.input and data.password
	async function onSubmit({ input, password }) {
		try {
			setError('');
			if (!isEmail(input)) {
				// Overwrite the user's input with the email returned from the query
				input = await getUserEmail(input);
			}
			// console.log({ data });
      await logInWithEmailAndPassword(input, password);
			// Wrap the push operation in a setTimeout() to ensure it runs right after the promise
			setTimeout(() => history.push('/'), 0);
		} catch (error) {
			console.error('Error logging in', error);
			handleError(error);
		}
	}

	function handleError(error) {
		if (error.code.includes('auth/user-not-found')) {
			setError('User not found');
		} else if (error.code.includes('auth/wrong-password')) {
			setError('Invalid password');
		}
	}

	async function getUserEmail(input) {
		const variables = { input };
		const response = await client.query({
			query: GET_USER_EMAIL,
			variables
		});
		// console.log({ response });
		const userEmail = response.data.users[0]?.email || 'no@email.com';
		return userEmail;
	}

	function togglePasswordVisibility() {
		setPasswordVisibility((prev) => !prev);
	}

	return (
		<Fragment>
			<SEO title='Login' />
			<section className={classes.section}>
				<article>
					<Card className={classes.card}>
						<CardHeader className={classes.cardHeader} />
						<form onSubmit={handleSubmit(onSubmit)}>
							<TextField
								name='input'
								inputRef={register({
									required: true,
									minLength: 5
								})}
								fullWidth
								variant='filled'
								label='Username, email, or phone'
								margin='dense'
								className={classes.textField}
								autoComplete='username'
							/>
							<TextField
								name='password'
								inputRef={register({
									required: true,
									minLength: 5
								})}
								InputProps={{
									endAdornment: hasPassword && (
										<InputAdornment>
											<Button onClick={togglePasswordVisibility}>
												{showPassword ? 'Hide' : 'Show'}
											</Button>
										</InputAdornment>
									)
								}}
								fullWidth
								variant='filled'
								label='Password'
								type={showPassword ? 'text' : 'password'}
								margin='dense'
								className={classes.textField}
								autoComplete='current-password'
							/>
							<Button
								disabled={!formState.isValid || formState.isSubmitting}
								variant='contained'
								fullWidth
								color='primary'
								className={classes.button}
								type='submit'
							>
								Log In
							</Button>
						</form>
						<div className={classes.orContainer}>
							<div className={classes.orLine} />
							<div>
								<Typography variant='body2' color='textSecondary'>
									OR
								</Typography>
							</div>
							<div className={classes.orLine} />
						</div>
						<AuthError error={error} />
						<LoginWithFacebook color='secondary' iconColor='blue' />
						<Button fullWidth color='secondary'>
							<Typography variant='caption'>Forgot password?</Typography>
						</Button>
					</Card>
					<Card className={classes.signUpCard}>
						<Typography variant='body2' align='right'>
							Don't have an account?
						</Typography>
						<Link to='/accounts/emailsignup'>
							<Button color='primary' className={classes.signUpButton}>
								Sign up
							</Button>
						</Link>
					</Card>
				</article>
			</section>
		</Fragment>
	);
}

export function LoginWithFacebook({ color, iconColor, variant }) {
	const classes = useLoginPageStyles();
	const { logInWithFacebook } = useContext(AuthContext);
	const [error, setError] = useState('');
	const history = useHistory();
	const facebookIcon =
		iconColor === 'blue' ? FacebookIconBlue : FacebookIconWhite;

	async function handleLogInWithFacebook() {
		try {
			await logInWithFacebook();
			setTimeout(() => history.push('/'), 0);
		} catch (error) {
			console.error('Error logging in with Facebook', error);
			setError(error.message);
		}
	}

	return (
		<Fragment>
			<Button
				onClick={handleLogInWithFacebook}
				fullWidth
				color={color}
				variant={variant}
			>
				<img
					src={facebookIcon}
					alt='facebook icon'
					className={classes.facebookIcon}
				/>
				Log In With Facebook
			</Button>
			<AuthError error={error} />
		</Fragment>
	);
}

export default LoginPage;
