import React, { useState } from 'react';
import {
	Drawer,
	Hidden,
	IconButton,
	List,
	ListItem,
	ListItemText
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import Layout from '../components/shared/Layout';
import { useEditProfilePageStyles } from '../styles';

function EditProfilePage({ history }) {
	const classes = useEditProfilePageStyles();
	const path = history.location.pathname;
	const [showDraw, setDrawer] = useState(false);

	function handleToggleDrawer() {
		setDrawer((prev) => !prev);
	}

	function handleSelected(index) {
		switch (index) {
			case 0:
				return path.includes('edit');
			default:
				break;
		}
	}

	function handleListClick(index) {
		switch (index) {
			case 0:
				history.push('/accounts/edit');
				break;
			default:
				break;
		}
	}

	const options = [
		'Edit Profile',
		'Change Password',
		'Apps and Websites',
		'Email and SMS',
		'Push Notifications',
		'Manage Contacts',
		'Privacy and Security',
		'Login Activity',
		'Emails from Instagram'
	];

	const drawer = (
		<List>
			{options.map((option, index) => (
				<ListItem
					key={option}
					button
					selected={handleSelected(index)}
					onClick={() => handleListClick(index)}
					classes={{
						selected: classes.listItemSelected,
						button: classes.listItemButton
					}}
				>
					<ListItemText primary={option} />
				</ListItem>
			))}
		</List>
	);

	return (
		<Layout title='Edit Profile'>
			<section className={classes.section}>
				<nav>
					<Hidden smUp implementation='css'>
						<Drawer
							variant='temporary'
							anchor='left'
							open={showDraw}
							onClose={handleToggleDrawer}
							classes={{ paperAnchorLeft: classes.temporaryDrawer }}
						>
							{drawer}
						</Drawer>
					</Hidden>
					<Hidden
						xsDown
						implementation='css'
						className={classes.permanentDrawerRoot}
					>
						<Drawer
							variant='permanent'
							open
							onClose={handleToggleDrawer}
							classes={{
								paper: classes.permanentDrawerPaper,
								root: classes.permanentDrawerRoot
							}}
						>
							{drawer}
						</Drawer>
					</Hidden>
				</nav>
			</section>
		</Layout>
	);
}

export default EditProfilePage;
