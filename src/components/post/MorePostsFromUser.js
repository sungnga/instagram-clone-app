import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { useMorePostsFromUserStyles } from '../../styles';
// import { getDefaultPost, defaultUser } from '../../data';
import { LoadingLargeIcon } from '../../icons';
import GridPost from '../shared/GridPost';
import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_MORE_POSTS_FROM_USER, GET_POST } from '../../graphql/queries';

function MorePostsFromUser({ postId }) {
	const classes = useMorePostsFromUserStyles();
	const variables = { postId };
	const { data, loading } = useQuery(GET_POST, { variables });
	const [
		getMorePostsFromUser,
		{ data: morePosts, loading: loading2 }
	] = useLazyQuery(GET_MORE_POSTS_FROM_USER);

	// let loading = false;

	useEffect(() => {
		if (loading) return;
		const userId = data.posts_by_pk.user.id;
		const postId = data.posts_by_pk.id;
		const variables = { userId, postId };
		getMorePostsFromUser({ variables });
	}, [data, loading, getMorePostsFromUser]);

	return (
		<div className={classes.container}>
			{loading || loading2 ? (
				<LoadingLargeIcon />
			) : (
				<Fragment>
					<Typography
						color='textSecondary'
						variant='subtitle2'
						component='h2'
						gutterBottom
						className={classes.typography}
					>
						More posts from{' '}
						<Link
							to={`/${data.posts_by_pk.user.username}`}
							className={classes.link}
						>
							@{data.posts_by_pk.user.username}
						</Link>
					</Typography>
					<article className={classes.article}>
						<div className={classes.postContainer}>
							{morePosts?.posts.map((post) => (
								<GridPost key={post.id} post={post} />
							))}
						</div>
					</article>
				</Fragment>
			)}
		</div>
	);
}

export default MorePostsFromUser;
