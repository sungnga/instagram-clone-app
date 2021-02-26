import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
	CommentIcon,
	MoreIcon,
	ShareIcon,
	UnlikeIcon,
	LikeIcon,
	RemoveIcon,
	SaveIcon
} from '../../icons';
import {
	Button,
	Divider,
	Hidden,
	TextField,
	Typography
} from '@material-ui/core';
import { usePostStyles } from '../../styles';
import UserCard from '../shared/UserCard';
import OptionsDialog from '../shared/OptionsDialog';
// import { defaultPost } from '../../data';
import PostSkeleton from './PostSkeleton';
import { useSubscription } from '@apollo/client';
import { GET_POST } from '../../graphql/subscriptions';

function Post({ postId }) {
	const classes = usePostStyles();
	const [showOptionsDialog, setOptionsDialog] = useState(false);
	const variables = { postId };
	const { data, loading } = useSubscription(GET_POST, { variables });

	// setTimeout(() => setLoading(false), 2000);
	if (loading) return <PostSkeleton />;

	const { id, media, likes, user, caption, comments } = data.posts_by_pk;
	return (
		<div className={classes.postContainer}>
			<article className={classes.article}>
				{/* Post Header */}
				<div className={classes.postHeader}>
					<UserCard user={user} avatarSize={32} />
					<MoreIcon
						onClick={() => setOptionsDialog(true)}
						className={classes.moreIcon}
					/>
				</div>
				{/* Post Image */}
				<div className={classes.postImage}>
					<img src={media} alt='Post media' className={classes.image} />
				</div>
				{/* Post Buttons */}
				<div className={classes.postButtonsWrapper}>
					<div className={classes.postButtons}>
						<LikeButton />
						<Link to={`/p/${id}`}>
							<CommentIcon />
						</Link>
						<ShareIcon />
						<SaveButton />
					</div>
					<Typography className={classes.likes} variant='subtitle2'>
						<span>{likes === 1 ? '1 like' : `${likes} likes`}</span>
					</Typography>
					<div className={classes.postCaptionContainer}>
						<Typography
							variant='body2'
							component='span'
							className={classes.postCaption}
							dangerouslySetInnerHTML={{ __html: caption }}
						/>
						{comments.map((comment) => (
							<div key={comment.id}>
								<Link to={`/${comment.user.username}`}>
									<Typography
										variant='subtitle2'
										component='span'
										className={classes.commentUsername}
									>
										{comment.user.username}
									</Typography>{' '}
									<Typography variant='body2' component='span'>
										{comment.content}
									</Typography>
								</Link>
							</div>
						))}
					</div>
					<Typography color='textSecondary' className={classes.datePosted}>
						5 DAYS AGO
					</Typography>
					<Hidden xsDown>
						<div className={classes.comment}>
							<Divider />
							<Comment />
						</div>
					</Hidden>
				</div>
			</article>
			{showOptionsDialog && (
				<OptionsDialog onClose={() => setOptionsDialog(false)} />
			)}
		</div>
	);
}

function LikeButton() {
	const classes = usePostStyles();
	const [liked, setLiked] = useState(false);
	const Icon = liked ? UnlikeIcon : LikeIcon;
	const className = liked ? classes.liked : classes.like;
	const onClick = liked ? handleUnlike : handleLike;

	function handleLike() {
		console.log('like');
		setLiked(true);
	}

	function handleUnlike() {
		console.log('unlike');
		setLiked(false);
	}

	return <Icon onClick={onClick} className={className} />;
}

function SaveButton() {
	const classes = usePostStyles();
	const [saved, setSaved] = useState(false);
	const Icon = saved ? RemoveIcon : SaveIcon;
	const onClick = saved ? handleRemove : handleSave;

	function handleSave() {
		console.log('save');
		setSaved(true);
	}

	function handleRemove() {
		console.log('remove');
		setSaved(false);
	}

	return <Icon onClick={onClick} className={classes.saveIcon} />;
}

function Comment() {
	const classes = usePostStyles();
	const [content, setContent] = useState('');

	return (
		<div className={classes.commentContainer}>
			<TextField
				onChange={(event) => setContent(event.target.value)}
				value={content}
				fullWidth
				placeholder='Add a comment...'
				multiline
				rowsMax={2}
				rows={1}
				className={classes.textField}
				InputProps={{
					classes: {
						root: classes.root,
						underline: classes.underline
					}
				}}
			/>
			<Button
				color='primary'
				className={classes.commentButton}
				disabled={!content.trim()}
			>
				Post
			</Button>
		</div>
	);
}

export default Post;
