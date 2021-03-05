import { Avatar, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { LoadingLargeIcon } from '../../icons';
import { useFollowSuggestionsStyles } from '../../styles';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import { getDefaultUser } from '../../data';
import { Link } from 'react-router-dom';
import FollowButton from './FollowButton';
import { UserContext } from '../../App';
import { useQuery } from '@apollo/client';
import { SUGGEST_USERS } from '../../graphql/queries';

function FollowSuggestions({ hideHeader }) {
	const classes = useFollowSuggestionsStyles();
	const { followerIds, me } = useContext(UserContext);
	const variables = { limit: 20, followerIds, created_at: me.created_at };
	const { data, loading } = useQuery(SUGGEST_USERS, { variables });

	// let loading = false;

	return (
		<div className={classes.container}>
			{!hideHeader && (
				<Typography
					color='textSecondary'
					variant='subtitle2'
					component='h2'
					className={classes.typography}
				>
					Suggestions For You
				</Typography>
			)}
			{loading ? (
				<LoadingLargeIcon />
			) : (
				<Slider
					className={classes.slide}
					dots={false}
					infinite
					speed={1000}
					touchThreshold={1000}
					variableWidth
					swipeToSlide
					arrows
					slidesToScroll={3}
					easing='ease-in-out'
				>
					{data.users.map((user) => (
						<FollowSuggestionsItem key={user.id} user={user} />
					))}
				</Slider>
			)}
		</div>
	);
}

function FollowSuggestionsItem({ user }) {
	const classes = useFollowSuggestionsStyles();
	const { profile_image, username, name } = user;

	return (
		<div>
			<div className={classes.card}>
				<Link to={`/${username}`}>
					<Avatar
						src={profile_image}
						alt={`${username}'s profile`}
						classes={{
							root: classes.avatar,
							img: classes.avatarImg
						}}
					/>
				</Link>
				<Link to={`/${username}`}>
					<Typography
						variant='subtitle2'
						className={classes.text}
						align='center'
					>
						{username}
					</Typography>
				</Link>
				<Typography
					color='textSecondary'
					variant='body2'
					className={classes.text}
					align='center'
				>
					{name}
				</Typography>
				<FollowButton side={false} />
			</div>
		</div>
	);
}

export default FollowSuggestions;
