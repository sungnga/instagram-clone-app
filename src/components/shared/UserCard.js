import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Typography } from '@material-ui/core';
import { useUserCardStyles } from '../../styles';

function UserCard({ user }) {
	console.log(user)
	const classes = useUserCardStyles();

	return (
		<div className={classes.wrapper}>
			<Link to={`/${user.username}`}>
				<Avatar
					src={user.profile_image}
					alt='User avatar'
					className='classes.avatar'
				/>
			</Link>
			<div className={classes.nameWrapper}>
				<Link to={`/${user.username}`}>
					<Typography variant='subtitle2' className={classes.typography}>
						{user.username}
					</Typography>
				</Link>
				<Typography
					color='textSecondary'
					variant='body2'
					className={classes.typography}
				>
					{user.name}
				</Typography>
			</div>
		</div>
	);
}

export default UserCard;
