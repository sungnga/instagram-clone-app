import React, { Fragment, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
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

function LoginPage() {
	const classes = useLoginPageStyles();
	const { register, handleSubmit, formState, watch } = useForm({ mode: 'all' });
	const [showPassword, setPasswordVisibility] = useState(false);
	const hasPassword = Boolean(watch('password'));

	async function onSubmit(data) {
		console.log({ data });
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
	const facebookIcon =
		iconColor === 'blue' ? FacebookIconBlue : FacebookIconWhite;

	return (
		<Button fullWidth color={color} variant={variant}>
			<img
				src={facebookIcon}
				alt='facebook icon'
				className={classes.facebookIcon}
			/>
			Log In With Facebook
		</Button>
	);
}

export default LoginPage;
