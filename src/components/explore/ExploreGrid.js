import { Typography } from '@material-ui/core';
import React, { Fragment } from 'react';
import { useExploreGridStyles } from '../../styles';
import { getDefaultPost } from '../../data';
import { LoadingLargeIcon } from '../../icons';
import GridPost from '../shared/GridPost';

function ExploreGrid() {
	const classes = useExploreGridStyles();

	let loading = false;

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
						{Array.from({ length: 20 }, () => getDefaultPost()).map((post) => (
							<GridPost key={post.id} post={post} />
						))}
					</div>
				</article>
			)}
		</Fragment>
	);
}

export default ExploreGrid;
