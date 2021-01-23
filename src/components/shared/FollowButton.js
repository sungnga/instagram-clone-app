import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { useFollowButtonStyles } from '../../styles';

function FollowButton({ side }) {
	const classes = useFollowButtonStyles({ side });
	const [isFollowing, setFollowing] = useState(false);

	const followButton = (
		<Button
			onClick={() => setFollowing(true)}
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
			onClick={() => setFollowing(false)}
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
