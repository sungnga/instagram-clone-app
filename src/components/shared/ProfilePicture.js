import React, { useContext, useRef, useState } from 'react';
import { Person } from '@material-ui/icons';
import { useProfilePictureStyles } from '../../styles';
import handleImageUpload from '../../utils/handleImageUpload';
import { useMutation } from '@apollo/client';
import { EDIT_USER_AVATAR } from '../../graphql/mutations';
import { UserContext } from '../../App';

function ProfilePicture({ size, image, isOwner }) {
	const classes = useProfilePictureStyles({ size, isOwner });
	const inputRef = useRef();
	const [editUserAvatar] = useMutation(EDIT_USER_AVATAR);
	const [img, setImg] = useState(image);
	const { currentUserId } = useContext(UserContext);

	function openFileInput() {
		inputRef.current.click();
	}

	async function handleUpdateProfilePic(event) {
		const url = await handleImageUpload(event.target.files[0]);
		// console.log({ url });
		const variables = { id: currentUserId, profileImage: url };
		await editUserAvatar({ variables });
		setImg(url);
	}

	return (
		<section className={classes.section}>
			<input
				style={{ display: 'none' }}
				ref={inputRef}
				type='file'
				onChange={handleUpdateProfilePic}
			/>
			{image ? (
				<div
					className={classes.wrapper}
					onClick={isOwner ? openFileInput : () => null}
				>
					<img src={img} alt='User profile' className={classes.image} />
				</div>
			) : (
				<div className={classes.wrapper}>
					<Person className={classes.person} />
				</div>
			)}
		</section>
	);
}

export default ProfilePicture;
