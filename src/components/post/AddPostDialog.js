import React, { useContext, useMemo, useState } from 'react';
import { useMutation } from '@apollo/client';
import {
	AppBar,
	Avatar,
	Button,
	Dialog,
	Divider,
	InputAdornment,
	Paper,
	TextField,
	Toolbar,
	Typography
} from '@material-ui/core';
import { ArrowBackIos, PinDrop } from '@material-ui/icons';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { useAddPostDialogStyles } from '../../styles';
import { UserContext } from '../../App';
import serialize from '../../utils/serializeToHtml';
import handleImageUpload from '../../utils/handleImageUpload';
import { CREATE_POST } from '../../graphql/mutations';

const initialValue = [
	{
		type: 'paragraph',
		children: [{ text: '' }]
	}
];

function AddPostDialog({ media, handleClose }) {
	const classes = useAddPostDialogStyles();
	const { me, currentUserId } = useContext(UserContext);
	// Create a Slate editor object that won't change across renders
	const editor = useMemo(() => withReact(createEditor()), []);
	// Keep track of state for the value of the editor
	// Add the initial value when setting up our state.
	const [value, setValue] = useState(initialValue);
	const [location, setLocation] = useState('');
	const [isSubmitting, setSubmitting] = useState(false);
	const [createPost] = useMutation(CREATE_POST);

	async function handleSharePost() {
		setSubmitting(true);
		const url = await handleImageUpload(media);
		const variables = {
			userId: currentUserId,
			location,
			caption: serialize({ children: value }),
			media: url
		};
		await createPost({ variables });
		setSubmitting(false);
		window.location.reload();
	}

	// Render the Slate context
	// Add the editable component inside the context
	return (
		<Dialog fullScreen open onClose={handleClose}>
			<AppBar className={classes.appBar}>
				<Toolbar className={classes.toolBar}>
					<ArrowBackIos onClick={handleClose} />
					<Typography align='center' variant='body1' className={classes.title}>
						New Post
					</Typography>
					<Button
						color='primary'
						className={classes.share}
						disabled={isSubmitting}
						onClick={handleSharePost}
					>
						Share
					</Button>
				</Toolbar>
			</AppBar>
			<Divider />
			<Paper className={classes.paper}>
				<Avatar src={me.profile_image} />
				<Slate
					editor={editor}
					value={value}
					onChange={(newValue) => setValue(newValue)}
				>
					<Editable
						className={classes.editor}
						placeholder='Write your caption...'
					/>
				</Slate>
				<Avatar
					src={URL.createObjectURL(media)}
					className={classes.avatarLarge}
					variant='square'
				/>
			</Paper>
			<TextField
				fullWidth
				placeholder='Location'
				InputProps={{
					classes: {
						root: classes.root,
						input: classes.input,
						underline: classes.underline
					},
					startAdornment: (
						<InputAdornment>
							<PinDrop />
						</InputAdornment>
					)
				}}
				onChange={(event) => setLocation(event.target.value)}
			/>
		</Dialog>
	);
}

export default AddPostDialog;
