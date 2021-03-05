import { useMutation, useQuery } from '@apollo/client';
import {
	Button,
	Drawer,
	Hidden,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Slide,
	Snackbar,
	TextField,
	Typography
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import isMobilePhone from 'validator/lib/isMobilePhone';
import isEmail from 'validator/lib/isEmail';
import isURL from 'validator/lib/isURL';
import { UserContext } from '../App';
import Layout from '../components/shared/Layout';
import LoadingScreen from '../components/shared/LoadingScreen';
import ProfilePicture from '../components/shared/ProfilePicture';
// import { defaultCurrentUser } from '../data';
import { GET_EDIT_USER_PROFILE } from '../graphql/queries';
import { useEditProfilePageStyles } from '../styles';
import { EDIT_USER, EDIT_USER_AVATAR } from '../graphql/mutations';
import { AuthContext } from '../auth';
import handleImageUpload from '../utils/handleImageUpload';

function EditProfilePage({ history }) {
	const classes = useEditProfilePageStyles();
	const path = history.location.pathname;
	const [showDraw, setDrawer] = useState(false);
	const { currentUserId } = useContext(UserContext);
	// console.log({me, currentUserId})
	const variables = { id: currentUserId };
	const { data, loading } = useQuery(GET_EDIT_USER_PROFILE, { variables });

	if (loading) return <LoadingScreen />;

	function handleToggleDrawer() {
		setDrawer((prev) => !prev);
	}

	function handleSelected(index) {
		switch (index) {
			case 0:
				return path.includes('edit');
			default:
				break;
		}
	}

	function handleListClick(index) {
		switch (index) {
			case 0:
				history.push('/accounts/edit');
				break;
			default:
				break;
		}
	}

	const options = [
		'Edit Profile',
		'Change Password',
		'Apps and Websites',
		'Email and SMS',
		'Push Notifications',
		'Manage Contacts',
		'Privacy and Security',
		'Login Activity',
		'Emails from Instagram'
	];

	const drawer = (
		<List>
			{options.map((option, index) => (
				<ListItem
					key={option}
					button
					selected={handleSelected(index)}
					onClick={() => handleListClick(index)}
					classes={{
						selected: classes.listItemSelected,
						button: classes.listItemButton
					}}
				>
					<ListItemText primary={option} />
				</ListItem>
			))}
		</List>
	);

	return (
		<Layout title='Edit Profile'>
			<section className={classes.section}>
				<IconButton
					edge='start'
					onClick={handleToggleDrawer}
					className={classes.menuButton}
				>
					<Menu />
				</IconButton>
				<nav>
					<Hidden smUp implementation='css'>
						<Drawer
							variant='temporary'
							anchor='left'
							open={showDraw}
							onClose={handleToggleDrawer}
							classes={{ paperAnchorLeft: classes.temporaryDrawer }}
						>
							{drawer}
						</Drawer>
					</Hidden>
					<Hidden
						xsDown
						implementation='css'
						className={classes.permanentDrawerRoot}
					>
						<Drawer
							variant='permanent'
							open
							classes={{
								paper: classes.permanentDrawerPaper,
								root: classes.permanentDrawerRoot
							}}
						>
							{drawer}
						</Drawer>
					</Hidden>
				</nav>
				<main>
					{path.includes('edit') && <EditUserInfo user={data.users_by_pk} />}
				</main>
			</section>
		</Layout>
	);
}

const DEFAULT_ERROR = { type: '', message: '' };

function EditUserInfo({ user }) {
	const classes = useEditProfilePageStyles();
	const { register, handleSubmit } = useForm({ mode: 'all' });
	const { updateEmail } = useContext(AuthContext);
	const [editUser] = useMutation(EDIT_USER);
	const [editUserAvatar] = useMutation(EDIT_USER_AVATAR);
	const [profileImage, setProfileImage] = useState(user.profile_image);
	const [error, setError] = useState(DEFAULT_ERROR);
	const [open, setOpen] = useState(false);

	async function onSubmit(data) {
		try {
			setError(DEFAULT_ERROR);
			const variables = { ...data, id: user.id };
			await updateEmail(data.email);
			await editUser({ variables });
			setOpen(true);
		} catch (error) {
			console.error('Error updating profile', error);
			handleError(error);
		}
	}

	function handleError(error) {
		if (error.message.includes('users_username_key')) {
			setError({ type: 'username', message: 'This username is already taken' });
		} else if (error.code.includes('auth')) {
			setError({ type: 'email', message: error.message });
		}
	}

	async function handleUpdateProfilePic(event) {
		const url = await handleImageUpload(event.target.files[0], 'instagram-avatar');
		// console.log({ url });
		const variables = { id: user.id, profileImage: url };
		await editUserAvatar({ variables });
		setProfileImage(url);
	}

	return (
		<section className={classes.container}>
			<div className={classes.pictureSectionItem}>
				<ProfilePicture size={38} image={profileImage} />
				<div className={classes.justifySelfStart}>
					<Typography className={classes.typography}>
						{user.username}
					</Typography>
					<input
						accept='image/*'
						id='image'
						type='file'
						style={{ display: 'none' }}
						onChange={handleUpdateProfilePic}
					/>
					<label htmlFor='image'>
						<Typography
							className={classes.typographyChangePic}
							color='primary'
							variant='body2'
						>
							Change Profile Photo
						</Typography>
					</label>
				</div>
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
				<SectionItem
					name='name'
					inputRef={register({
						required: true,
						minLength: 5,
						maxLength: 20
					})}
					text='Name'
					formItem={user.name}
				/>
				<SectionItem
					name='username'
					error={error}
					inputRef={register({
						required: true,
						pattern: /^[a-zA-Z0-9_.]*$/,
						minLength: 5,
						maxLength: 20
					})}
					text='Username'
					formItem={user.username}
				/>
				<SectionItem
					name='website'
					inputRef={register({
						validate: (input) =>
							Boolean(input)
								? isURL(input, {
										protocols: ['http', 'https'],
										require_protocol: true
								  })
								: true
					})}
					text='Website'
					formItem={user.website}
				/>
				<div className={classes.sectionItem}>
					<aside>
						<Typography className={classes.bio}>Bio</Typography>
					</aside>
					<TextField
						name='bio'
						inputRef={register({
							maxLength: 120
						})}
						variant='outlined'
						multiline
						rowsMax={3}
						rows={3}
						fullWidth
						defaultValue={user.bio}
					/>
				</div>
				<div className={classes.sectionItem}>
					<div />
					<Typography
						color='textSecondary'
						className={classes.justifySelfStart}
					>
						Personal Information
					</Typography>
				</div>
				<SectionItem
					name='email'
					error={error}
					inputRef={register({
						required: true,
						validate: (input) => isEmail(input)
					})}
					text='Email'
					formItem={user.email}
					type='email'
				/>
				<SectionItem
					name='phoneNumber'
					inputRef={register({
						validate: (input) => (Boolean(input) ? isMobilePhone(input) : true)
					})}
					text='Phone Number'
					formItem={user.phone_number}
				/>
				<div className={classes.sectionItem}>
					<div />
					<Button
						type='submit'
						variant='contained'
						color='primary'
						className={classes.justifySelfStart}
					>
						Submit
					</Button>
				</div>
			</form>
			<Snackbar
				open={open}
				autoHideDuration={2000}
				TransitionComponent={Slide}
				message={<span>Profile updated</span>}
				onClose={() => setOpen(false)}
			/>
		</section>
	);
}

function SectionItem({ type = 'text', text, formItem, inputRef, name, error }) {
	const classes = useEditProfilePageStyles();

	return (
		<div className={classes.sectionItemWrapper}>
			<aside>
				<Hidden xsDown>
					<Typography className={classes.typography} align='right'>
						{text}
					</Typography>
				</Hidden>
				<Hidden smUp>
					<Typography className={classes.typography}>{text}</Typography>
				</Hidden>
			</aside>
			<TextField
				name={name}
				inputRef={inputRef}
				helperText={error?.type === name && error.message}
				variant='outlined'
				fullWidth
				defaultValue={formItem}
				type={type}
				className={classes.textField}
				inputProps={{
					className: classes.textFieldInput
				}}
			/>
		</div>
	);
}

export default EditProfilePage;
