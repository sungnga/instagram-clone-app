import React, { useContext, useState } from 'react';
import { Button } from '@material-ui/core';
import { useFollowButtonStyles } from '../../styles';
import { UserContext } from '../../App';
import { useMutation } from '@apollo/client';
import { FOLLOW_USER, UNFOLLOW_USER } from '../../graphql/mutations';

function FollowButton({ side, id }) {
	const classes = useFollowButtonStyles({ side });
	const { currentUserId, followingIds } = useContext(UserContext);
	const isAlreadyFollowing = followingIds.some(
		(followingId) => followingId === id
	);
	const [isFollowing, setFollowing] = useState(isAlreadyFollowing);
	const [followUser] = useMutation(FOLLOW_USER);
	const [unfollowUser] = useMutation(UNFOLLOW_USER);
	const variables = {
		userIdToFollow: id,
		currentUserId
	};

	function handleFollowUser() {
		setFollowing(true);
		followUser({ variables });
	}

	function handleUnfollowUser() {
		setFollowing(false);
		unfollowUser({ variables });
	}

	const followButton = (
		<Button
			onClick={handleFollowUser}
			variant={side ? 'text' : 'contained'}
			color='primary'
			className={classes.button}
			fullWidth
		>
			Follow
		</Button>
	);

	const followingButton = (
		<Button
			onClick={handleUnfollowUser}
			variant={side ? 'text' : 'outlined'}
			className={classes.button}
			fullWidth
		>
			Following
		</Button>
	);

	return isFollowing ? followingButton : followButton;
}

export default FollowButton;
