import React, { Fragment, useCallback, useContext, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import Layout from '../components/shared/Layout';
import { useProfilePageStyles } from '../styles';
// import { defaultCurrentUser } from '../data';
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
import ProfileTabs from '../components/profile/ProfileTabs';
import { GearIcon } from '../icons';
import { AuthContext } from '../auth';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER_PROFILE } from '../graphql/queries';
import LoadingScreen from '../components/shared/LoadingScreen';
import { UserContext } from '../App';
import { FOLLOW_USER, UNFOLLOW_USER } from '../graphql/mutations';

function ProfilePage() {
	const classes = useProfilePageStyles();
	const [showOptionsMenu, setOptionsMenu] = useState(false);
	const { username } = useParams();
	const variables = { username };
	const { data, loading } = useQuery(GET_USER_PROFILE, { variables });
	const { currentUserId } = useContext(UserContext);

	if (loading) return <LoadingScreen />;
	const user = data.users[0];
	const isOwner = user.id === currentUserId;

	function handleOptionsMenuClick() {
		setOptionsMenu(true);
	}

	function handleCloseMenu() {
		setOptionsMenu(false);
	}

	return (
		<Layout title={`${user.name} (@${user.username})`}>
			<div className={classes.container}>
				<Hidden xsDown>
					<Card className={classes.cardLarge}>
						<ProfilePicture isOwner={isOwner} image={user.profile_image} />
						<CardContent className={classes.cardContentLarge}>
							<ProfileNameSection
								user={user}
								isOwner={isOwner}
								handleOptionsMenuClick={handleOptionsMenuClick}
							/>
							<PostCountSection user={user} />
							<NameBioSection user={user} />
						</CardContent>
					</Card>
				</Hidden>
				<Hidden smUp>
					<Card className={classes.cardSmall}>
						<CardContent>
							<section className={classes.sectionSmall}>
								<ProfilePicture
									size={77}
									isOwner={isOwner}
									image={user.profile_image}
								/>
								<ProfileNameSection
									user={user}
									isOwner={isOwner}
									handleOptionsMenuClick={handleOptionsMenuClick}
								/>
							</section>
							<NameBioSection user={user} />
						</CardContent>
						<PostCountSection user={user} />
					</Card>
				</Hidden>
				{showOptionsMenu && <OptionsMenu handleCloseMenu={handleCloseMenu} />}
				<ProfileTabs user={user} isOwner={isOwner} />
			</div>
		</Layout>
	);
}

function ProfileNameSection({ user, isOwner, handleOptionsMenuClick }) {
	const classes = useProfilePageStyles();
	const [showUnfollowDialog, setUnfollowDialog] = useState(false);
	const { currentUserId, followingIds, followerIds } = useContext(UserContext);
	// If we're already following that user
	const isAlreadyFollowing = followingIds.some((id) => id === user.id);
	const [isFollowing, setFollowing] = useState(isAlreadyFollowing);
	// This user follows us but we're not following this user
	const isFollower = !isFollowing && followerIds.some((id) => id === user.id);
	const variables = {
		userIdToFollow: user.id,
		currentUserId
	};
	const [followUser] = useMutation(FOLLOW_USER);

	function handleFollowUser() {
		setFollowing(true);
		followUser({ variables });
	}

	const onUnfollowUser = useCallback(() => {
		setUnfollowDialog(false);
		setFollowing(false);
	}, []);

	let followButton;
	// const isFollowing = true;
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
			<Button
				onClick={handleFollowUser}
				variant='contained'
				color='primary'
				className={classes.button}
			>
				Follow Back
			</Button>
		);
	} else {
		followButton = (
			<Button
				onClick={handleFollowUser}
				variant='contained'
				color='primary'
				className={classes.button}
			>
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
				<UnfollowDialog
					user={user}
					onClose={() => setUnfollowDialog(false)}
					onUnfollowUser={onUnfollowUser}
				/>
			)}
		</Fragment>
	);
}

function UnfollowDialog({ onClose, user, onUnfollowUser }) {
	const classes = useProfilePageStyles();
	const { currentUserId } = useContext(UserContext);
	const [unfollowUser] = useMutation(UNFOLLOW_USER);

	function handleUnfollowUser() {
		const variables = {
			currentUserId,
			userIdToFollow: user.id
		};
		unfollowUser({ variables });
		onUnfollowUser();
	}

	return (
		<Dialog
			open
			classes={{
				scrollPaper: classes.unfollowDialogScrollPaper
			}}
			onClose={onClose}
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
			<Button onClick={handleUnfollowUser} className={classes.unfollowButton}>
				Unfollow
			</Button>
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
							{user[`${option}_aggregate`].aggregate.count}
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

function NameBioSection({ user }) {
	const classes = useProfilePageStyles();

	return (
		<section className={classes.section}>
			<Typography className={classes.typography}>{user.name}</Typography>
			<Typography>{user.bio}</Typography>
			<a href={user.website} target='_blank' rel='noopener noreferrer'>
				<Typography className={classes.typography} color='secondary'>
					{user.website}
				</Typography>
			</a>
		</section>
	);
}

function OptionsMenu({ handleCloseMenu }) {
	const classes = useProfilePageStyles();
	const [showLogOutMessage, setLogOutMessage] = useState(false);
	const { signOut } = useContext(AuthContext);
	const history = useHistory();

	function handleLogOutClick() {
		setLogOutMessage(true);
		setTimeout(() => {
			signOut();
			history.push('/accounts/login');
		}, 2000);
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
