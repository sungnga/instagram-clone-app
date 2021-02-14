import React, { Fragment, useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
	Button,
	Card,
	CardHeader,
	InputAdornment,
	TextField,
	Typography
} from '@material-ui/core';
import { HighlightOff, CheckCircleOutline } from '@material-ui/icons';
import { useSignUpPageStyles } from '../styles';
import SEO from '../components/shared/Seo';
import { LoginWithFacebook } from './login';
import { AuthContext } from '../auth';
import { useForm } from 'react-hook-form';
import isEmail from 'validator/lib/isEmail';
import { useApolloClient } from '@apollo/client';
import { CHECK_IF_USERNAME_TAKEN } from '../graphql/queries';

function SignUpPage() {
	const classes = useSignUpPageStyles();
	const { signUpWithEmailAndPassword } = useContext(AuthContext);
	const history = useHistory();
	const { register, handleSubmit, formState, errors } = useForm({
		mode: 'all'
	});
	const [error, setError] = useState('');
	const client = useApolloClient();

	// async function handleSubmit(event) {
	// 	event.preventDefault();
	// 	await signUpWithEmailAndPassword(values);
	// 	history.push('/');
	// }

	async function onSubmit(data) {
		console.log({ data });
		try {
			setError('');
			await signUpWithEmailAndPassword(data);
			history.push('/');
		} catch (error) {
			console.error('Error signing up', error);
			// setError(error.message);
			handleError(error);
		}
	}

	function handleError(error) {
		if (error.message.includes('users_username_key')) {
			setError('Username already taken');
		} else if (error.code.includes('auth')) {
			setError(error.message);
		}
	}

	async function validateUsername(username) {
		const variables = { username };
		const response = await client.query({
			query: CHECK_IF_USERNAME_TAKEN,
			variables
		});
		// console.log({ response });
		const isUsernameValid = response.data.users.length === 0;
		return isUsernameValid;
	}

	const errorIcon = (
		<InputAdornment>
			<HighlightOff style={{ color: 'red', height: 30, width: 30 }} />
		</InputAdornment>
	);

	const validIcon = (
		<InputAdornment>
			<CheckCircleOutline style={{ color: '#ccc', height: 30, width: 30 }} />
		</InputAdornment>
	);

	return (
		<Fragment>
			<SEO title='Sign up' />
			<section className={classes.section}>
				<article>
					<Card className={classes.card}>
						<CardHeader className={classes.cardHeader} />
						<Typography className={classes.cardHeaderSubHeader}>
							Sign up to see photos and videos from your friends.
						</Typography>
						<LoginWithFacebook
							color='primary'
							iconColor='white'
							variant='contained'
						/>
						<div className={classes.orContainer}>
							<div className={classes.orLine} />
							<div>
								<Typography variant='body2' color='textSecondary'>
									OR
								</Typography>
							</div>
							<div className={classes.orLine} />
						</div>
						<form onSubmit={handleSubmit(onSubmit)}>
							<TextField
								name='email'
								inputRef={register({
									required: true,
									validate: (input) => isEmail(input) //true or false
								})}
								InputProps={{
									endAdornment: errors.email
										? errorIcon
										: formState.dirtyFields.email && validIcon
								}}
								fullWidth
								variant='filled'
								label='Email'
								type='email'
								margin='dense'
								className={classes.textField}
								autoComplete='email'
							/>
							<TextField
								name='name'
								inputRef={register({
									required: true,
									minLength: 5,
									maxLength: 20
								})}
								InputProps={{
									endAdornment: errors.name
										? errorIcon
										: formState.dirtyFields.name && validIcon
								}}
								fullWidth
								variant='filled'
								label='Full Name'
								margin='dense'
								className={classes.textField}
							/>
							<TextField
								name='username'
								inputRef={register({
									required: true,
									minLength: 5,
									maxLength: 20,
									validate: async (input) => await validateUsername(input),
									// Accept only lowercase/uppercase letters, numbers, periods, and underscores
									pattern: /^[a-zA-Z0-9_.]*$/
								})}
								InputProps={{
									endAdornment: errors.username
										? errorIcon
										: formState.dirtyFields.username && validIcon
								}}
								fullWidth
								variant='filled'
								label='Username'
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
									endAdornment: errors.password
										? errorIcon
										: formState.dirtyFields.password && validIcon
								}}
								fullWidth
								variant='filled'
								label='Password'
								type='password'
								margin='dense'
								className={classes.textField}
								autoComplete='new-password'
							/>
							<Button
								disabled={!formState.isValid || formState.isSubmitting}
								variant='contained'
								fullWidth
								color='primary'
								className={classes.button}
								type='submit'
							>
								Sign Up
							</Button>
						</form>
						<AuthError error={error} />
					</Card>
					<Card className={classes.loginCard}>
						<Typography variant='body2' align='right'>
							Have an account?
						</Typography>
						<Link to='/accounts/login'>
							<Button color='primary' className={classes.loginButton}>
								Log in
							</Button>
						</Link>
					</Card>
				</article>
			</section>
		</Fragment>
	);
}

export function AuthError({ error }) {
	return (
		Boolean(error) && (
			<Typography
				align='center'
				gutterBottom
				variant='body2'
				style={{ color: 'red' }}
			>
				{error}
			</Typography>
		)
	);
}

export default SignUpPage;
