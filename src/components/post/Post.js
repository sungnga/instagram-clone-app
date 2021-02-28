import React, { useContext, useState } from 'react';
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
	Avatar,
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
import { useMutation, useSubscription } from '@apollo/client';
import { GET_POST } from '../../graphql/subscriptions';
import { UserContext } from '../../App';
import {
	LIKE_POST,
	UNLIKE_POST,
	SAVE_POST,
	UNSAVE_POST
} from '../../graphql/mutations';

function Post({ postId }) {
	const classes = usePostStyles();
	const [showOptionsDialog, setOptionsDialog] = useState(false);
	const variables = { postId };
	const { data, loading } = useSubscription(GET_POST, { variables });

	// setTimeout(() => setLoading(false), 2000);
	if (loading) return <PostSkeleton />;

	const {
		id,
		media,
		likes,
		likes_aggregate,
		location,
		saved_posts,
		user_id,
		user,
		created_at,
		caption,
		comments
	} = data.posts_by_pk;
	const likesCount = likes_aggregate.aggregate.count;
	return (
		<div className={classes.postContainer}>
			<article className={classes.article}>
				{/* Post Header */}
				<div className={classes.postHeader}>
					<UserCard user={user} location={location} avatarSize={32} />
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
						<LikeButton likes={likes} postId={id} authorId={user.id} />
						<Link to={`/p/${id}`}>
							<CommentIcon />
						</Link>
						<ShareIcon />
						<SaveButton savedPosts={saved_posts} postId={id} />
					</div>
					<Typography className={classes.likes} variant='subtitle2'>
						<span>{likesCount === 1 ? '1 like' : `${likesCount} likes`}</span>
					</Typography>
					<div
						style={{
							overflowY: 'scroll',
							padding: '16px 12px',
							height: '100%'
						}}
					>
						<AuthorCaption
							user={user}
							createdAt={created_at}
							caption={caption}
						/>
						{comments.map((comment) => (
							<UserComment key={comment.id} comment={comment} />
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

function AuthorCaption({ user, caption, createdAt }) {
	const classes = usePostStyles();

	return (
		<div style={{ display: 'flex' }}>
			<Avatar
				src={user.profile_image}
				alt='User avatar'
				style={{
					marginRight: 14,
					width: 32,
					height: 32
				}}
			/>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<Link to={user.username}>
					<Typography
						variant='subtitle2'
						component='span'
						className={classes.username}
					>
						{user.username}
					</Typography>
				</Link>
				<Typography
					variant='body2'
					component='span'
					className={classes.postCaption}
					style={{ paddingLeft: 0 }}
					dangerouslySetInnerHTML={{ __html: caption }}
				/>
				<Typography
					style={{
						marginTop: 16,
						marginBottom: 4,
						display: 'inline-block'
					}}
					color='textSecondary'
					variant='caption'
				>
					{createdAt}
				</Typography>
			</div>
		</div>
	);
}

function UserComment({ comment }) {
	const classes = usePostStyles();

	return (
		<div style={{ display: 'flex' }}>
			<Avatar
				src={comment.user.profile_image}
				alt='User avatar'
				style={{
					marginRight: 14,
					width: 32,
					height: 32
				}}
			/>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<Link to={comment.user.username}>
					<Typography
						variant='subtitle2'
						component='span'
						className={classes.username}
					>
						{comment.user.username}
					</Typography>
				</Link>
				<Typography
					variant='body2'
					component='span'
					className={classes.postCaption}
					style={{ paddingLeft: 0 }}
				>
					{comment.content}
				</Typography>
				<Typography
					style={{
						marginTop: 16,
						marginBottom: 4,
						display: 'inline-block'
					}}
					color='textSecondary'
					variant='caption'
				>
					{comment.created_at}
				</Typography>
			</div>
		</div>
	);
}

function LikeButton({ likes, authorId, postId }) {
	const classes = usePostStyles();
	const { currentUserId } = useContext(UserContext);
	const isAlreadyLiked = likes.some(({ user_id }) => user_id === currentUserId);
	const [liked, setLiked] = useState(isAlreadyLiked || false);
	const Icon = liked ? UnlikeIcon : LikeIcon;
	const className = liked ? classes.liked : classes.like;
	const onClick = liked ? handleUnlike : handleLike;
	const [likePost] = useMutation(LIKE_POST);
	const [unlikePost] = useMutation(UNLIKE_POST);
	const variables = {
		postId,
		userId: currentUserId
		// profileId: authorId
	};

	function handleLike() {
		// console.log('like');
		setLiked(true);
		likePost({ variables });
	}

	function handleUnlike() {
		// console.log('unlike');
		setLiked(false);
		unlikePost({ variables });
	}

	return <Icon onClick={onClick} className={className} />;
}

function SaveButton({ savedPosts, postId }) {
	const classes = usePostStyles();
	const { currentUserId } = useContext(UserContext);
	const isAlreadySaved = savedPosts.some(
		({ user_id }) => user_id === currentUserId
	);
	const [saved, setSaved] = useState(isAlreadySaved || false);
	const Icon = saved ? RemoveIcon : SaveIcon;
	const onClick = saved ? handleRemove : handleSave;
	const [savePost] = useMutation(SAVE_POST);
	const [unsavePost] = useMutation(UNSAVE_POST);
	const variables = {
		postId,
		userId: currentUserId
	};

	function handleSave() {
		// console.log('save');
		setSaved(true);
		savePost({ variables });
	}

	function handleRemove() {
		// console.log('remove');
		setSaved(false);
		unsavePost({ variables });
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
