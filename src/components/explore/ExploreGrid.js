import { Typography } from '@material-ui/core';
import React, { Fragment, useContext } from 'react';
import { useExploreGridStyles } from '../../styles';
// import { getDefaultPost } from '../../data';
import { LoadingLargeIcon } from '../../icons';
import GridPost from '../shared/GridPost';
import { UserContext } from '../../App';
import { EXPLORE_POSTS } from '../../graphql/queries';
import { useQuery } from '@apollo/client';

function ExploreGrid() {
	const classes = useExploreGridStyles();
	const { followingIds } = useContext(UserContext);
	const variables = { followingIds };
	const { data, loading } = useQuery(EXPLORE_POSTS, { variables });

	// let loading = false;

	return (
		<Fragment>
			<Typography
				color='textSecondary'
				variant='subtitle2'
				component='h2'
				gutterBottom
				className={classes.typography}
			>
				Explore
			</Typography>
			{loading ? (
				<LoadingLargeIcon />
			) : (
				<article className={classes.article}>
					<div className={classes.postContainer}>
						{data.posts.map((post) => (
							<GridPost key={post.id} post={post} />
						))}
					</div>
				</article>
			)}
		</Fragment>
	);
}

export default ExploreGrid;
