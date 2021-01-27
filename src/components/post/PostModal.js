import React, { Fragment } from 'react';
import Modal from 'react-modal';
import { useHistory, useParams } from 'react-router-dom';
import { usePostModalStyles } from '../../styles';
import { CloseIcon } from '../../icons';
import Post from './Post';

function PostModal() {
	const classes = usePostModalStyles();
	const history = useHistory();
	const { postId } = useParams();
	// console.log({ postId });

	return (
		<Fragment>
			<Modal
				isOpen
				ariaHideApp={false}
				overlayClassName={classes.overlay}
				onRequestClose={() => history.goBack()}
				style={{
					content: {
						display: 'flex',
						alignItems: 'center',
						maxWidth: 935,
						width: '100%',
						top: '50%',
						left: '50%',
						right: 'auto',
						bottom: 'auto',
						transform: 'translate(-50%, -50%)',
						margin: 0,
						padding: 0,
						overflow: 'none',
						WebkitOverflowScrolling: 'touch'
					}
				}}
			>
				<Post id={postId} />
			</Modal>
			<div onClick={() => history.goBack()} className={classes.close}>
				<CloseIcon />
			</div>
		</Fragment>
	);
}

export default PostModal;
