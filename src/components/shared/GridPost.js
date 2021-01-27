import { Typography } from '@material-ui/core';
import React from 'react';
import { useGridPostStyles } from '../../styles';

function GridPost({ post }) {
	const classes = useGridPostStyles();

	return (
		<div className={classes.gridPostContainer}>
			<div className={classes.gridPostOverlay}>
				<div className={classes.gridPostInfo}>
					<span className={classes.likes} />
					<Typography>{post.likes}</Typography>
				</div>
				<div className={classes.gridPostInfo}>
					<span className={classes.comments} />
					<Typography>{post.comments.length}</Typography>
				</div>
			</div>
			<img src={post.media} alt='Post cover' className={classes.image} />
		</div>
	);
}

export default GridPost;
