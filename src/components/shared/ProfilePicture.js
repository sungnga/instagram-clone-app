import { Person } from '@material-ui/icons';
import React from 'react';
import { useProfilePictureStyles } from '../../styles';

function ProfilePicture({
	size,
	image = 'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/s320x320/21980342_855787684589171_3143825866358784_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_ohc=f1iXvdsbqLEAX_yjDcA&tp=1&oh=a1393a1ea00d7e00224f27ced4c708c5&oe=6033DD5E',
	isOwner
}) {
	const classes = useProfilePictureStyles({ size, isOwner });

	return (
		<section className={classes.section}>
			{image ? (
				<div className={classes.wrapper}>
					<img src={image} alt='User profile' className={classes.image} />
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
