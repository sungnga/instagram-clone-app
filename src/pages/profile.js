import React, { Fragment, useState } from 'react';
import Layout from '../components/shared/Layout';
import { useProfilePageStyles } from '../styles';
import { defaultCurrentUser } from '../data';
import {
	Avatar,
	Button,
	Card,
	CardContent,
	Dialog,
	DialogTitle,
	Divider,
	Hidden,
	Typography,
	Zoom
} from '@material-ui/core';
import ProfilePicture from '../components/shared/ProfilePicture';
import { Link } from 'react-router-dom';
import { GearIcon } from '../icons';

function ProfilePage() {
	const classes = useProfilePageStyles();
	const [showOptionsMenu, setOptionsMenu] = useState(false);
	const isOwner = false;

	function handleOptionsMenuClick() {
		setOptionsMenu(true);
	}

	function handleCloseMenu() {
		setOptionsMenu(false);
	}

	return (
		<Layout
			title={`${defaultCurrentUser.name} (@${defaultCurrentUser.username})`}
		>
			<div className={classes.container}>
				<Hidden xsDown>
					<Card className={classes.cardLarge}>
						<ProfilePicture isOwner={isOwner} />
						<CardContent className={classes.cardContentLarge}>
							<ProfileNameSection
								user={defaultCurrentUser}
								isOwner={isOwner}
								handleOptionsMenuClick={handleOptionsMenuClick}
							/>
							<PostCountSection user={defaultCurrentUser} />
							<NameBioSection user={defaultCurrentUser} />
						</CardContent>
					</Card>
				</Hidden>
				<Hidden smUp>
					<Card className={classes.cardSmall}>
						<CardContent>
							<section className={classes.sectionSmall}>
								<ProfilePicture size={77} isOwner={isOwner} />
								<ProfileNameSection
									user={defaultCurrentUser}
									isOwner={isOwner}
									handleOptionsMenuClick={handleOptionsMenuClick}
								/>
							</section>
							<NameBioSection user={defaultCurrentUser} />
						</CardContent>
						<PostCountSection user={defaultCurrentUser} />
					</Card>
				</Hidden>
				{showOptionsMenu && <OptionsMenu handleCloseMenu={handleCloseMenu} />}
			</div>
		</Layout>
	);
}

function ProfileNameSection({ user, isOwner, handleOptionsMenuClick }) {
	const classes = useProfilePageStyles();
	const [showUnfollowDialog, setUnfollowDialog] = useState(false);

	let followButton;
	const isFollowing = true;
	const isFollower = false;
	if (isFollowing) {
		followButton = (
			<Button
				onClick={() => setUnfollowDialog(true)}
				variant='outlined'
				className={classes.button}
			>
				Following
			</Button>
		);
	} else if (isFollower) {
		followButton = (
			<Button variant='contained' color='primary' className={classes.button}>
				Follow Back
			</Button>
		);
	} else {
		followButton = (
			<Button variant='contained' color='primary' className={classes.button}>
				Follow
			</Button>
		);
	}

	return (
		<Fragment>
			<Hidden xsDown>
				<section className={classes.usernameSection}>
					<Typography className={classes.username}>{user.username}</Typography>
					{isOwner ? (
						<Fragment>
							<Link to='/accounts/edit'>
								<Button variant='outlined'>Edit Profile</Button>
							</Link>
							<div
								onClick={handleOptionsMenuClick}
								className={classes.settingsWrapper}
							>
								<GearIcon className={classes.settings} />
							</div>
						</Fragment>
					) : (
						<Fragment>{followButton}</Fragment>
					)}
				</section>
			</Hidden>
			<Hidden smUp>
				<section>
					<div className={classes.usernameDivSmall}>
						<Typography className={classes.username}>
							{user.username}
						</Typography>
						{isOwner && (
							<div
								onClick={handleOptionsMenuClick}
								className={classes.settingsWrapper}
							>
								<GearIcon className={classes.settings} />
							</div>
						)}
					</div>
					{isOwner ? (
						<Link to='/accounts/edit'>
							<Button variant='outlined' style={{ width: '100%' }}>
								Edit Profile
							</Button>
						</Link>
					) : (
						followButton
					)}
				</section>
			</Hidden>
			{showUnfollowDialog && (
				<UnfollowDialog user={user} onClose={() => setUnfollowDialog(false)} />
			)}
		</Fragment>
	);
}

function UnfollowDialog({ onClose, user }) {
	const classes = useProfilePageStyles();

	return (
		<Dialog
			open
			classes={{
				scrollPaper: classes.unfollowDialogScrollPaper
			}}
			onClose
			TransitionComponent={Zoom}
		>
			<div className={classes.wrapper}>
				<Avatar
					src={user.profile_image}
					alt={`${user.username}'s avatar`}
					className={classes.avatar}
				/>
			</div>
			<Typography
				align='center'
				variant='body2'
				className={classes.unfollowDialogText}
			>
				Unfollow @{user.username}?
			</Typography>
			<Divider />
			<Button className={classes.unfollowButton}>Unfollow</Button>
			<Divider />
			<Button onClick={onClose} className={classes.cancelButton}>
				Cancel
			</Button>
		</Dialog>
	);
}

function PostCountSection({ user }) {
	const classes = useProfilePageStyles();
	// Each element is an array
	const options = ['posts', 'followers', 'following'];

	return (
		<Fragment>
			<Hidden smUp>
				<Divider />
			</Hidden>
			<section className={classes.followingSection}>
				{options.map((option) => (
					<div key={option} className={classes.followingText}>
						<Typography className={classes.followingCount}>
							{user[option].length}
						</Typography>
						<Hidden xsDown>
							<Typography>{option}</Typography>
						</Hidden>
						<Hidden smUp>
							<Typography color='textSecondary'>{option}</Typography>
						</Hidden>
					</div>
				))}
			</section>
			<Hidden smUp>
				<Divider />
			</Hidden>
		</Fragment>
	);
}

function NameBioSection() {
	return <Fragment>NameBioSection</Fragment>;
}

function OptionsMenu({ handleCloseMenu }) {
	const classes = useProfilePageStyles();
	const [showLogOutMessage, setLogOutMessage] = useState(false);

	function handleLogOutClick() {
		setLogOutMessage(true);
	}

	return (
		<Dialog
			open
			classes={{
				scrollPaper: classes.dialogScrollPaper,
				paper: classes.dialogPaper
			}}
			TransitionComponent={Zoom}
		>
			{showLogOutMessage ? (
				<DialogTitle className={classes.dialogTitle}>
					Logging Out
					<Typography color='textSecondary'>
						You need to log back in to continue using Instagram.
					</Typography>
				</DialogTitle>
			) : (
				<Fragment>
					<OptionsItem text='Change Password' />
					<OptionsItem text='Nametag' />
					<OptionsItem text='Authorized Apps' />
					<OptionsItem text='Notifications' />
					<OptionsItem text='Privacy and Security' />
					<OptionsItem text='Logout' onClick={handleLogOutClick} />
					<OptionsItem text='Cancel' onClick={handleCloseMenu} />
				</Fragment>
			)}
		</Dialog>
	);
}

function OptionsItem({ text, onClick }) {
	return (
		<Fragment>
			<Button style={{ padding: '12px 8px' }} onClick={onClick}>
				{text}
			</Button>
			<Divider />
		</Fragment>
	);
}

export default ProfilePage;
