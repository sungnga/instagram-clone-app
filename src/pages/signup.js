import React, {Fragment} from "react";
import { Link } from 'react-router-dom';
import {
  Button,
	Card,
	CardHeader,
	TextField,
	Typography
} from '@material-ui/core';
import { useSignUpPageStyles } from "../styles";
import SEO from '../components/shared/Seo'
import { LoginWithFacebook } from "./login";

function SignUpPage() {
  const classes = useSignUpPageStyles();

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
            <LoginWithFacebook color='primary' iconColor='white' variant='contained' />
            <div className={classes.orContainer}>
            <div className={classes.orLine} />
            <div>
              <Typography variant='body2' color='textSecondary'>
                OR
              </Typography>
            </div>
            <div className={classes.orLine} />
          </div>
						<form>
							<TextField
								fullWidth
								variant='filled'
                label='Email'
                type='email'
								margin='dense'
								className={classes.textField}
								autoComplete='email'
              />
              <TextField
              fullWidth
              variant='filled'
              label='Full Name'
              margin='dense'
              className={classes.textField}
            />
							<TextField
								fullWidth
								variant='filled'
								label='Username'
								margin='dense'
                className={classes.textField}
                autoComplete='username'
              />
              <TextField
              fullWidth
              variant='filled'
                label='Password'
                type='password'
              margin='dense'
                className={classes.textField}
                autoComplete='new-password'
            />
							<Button
								variant='contained'
								fullWidth
								color='primary'
								className={classes.button}
								type='submit'
							>
								Sign Up
							</Button>
						</form>
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

export default SignUpPage;
