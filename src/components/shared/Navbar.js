import React, { useState } from 'react';
import { AppBar, Avatar, Hidden, InputBase } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useNavbarStyles } from '../../styles';
import logo from '../../images/logo.png';
import {
	LoadingIcon,
	AddIcon,
	LikeIcon,
	LikeActiveIcon,
	ExploreIcon,
	ExploreActiveIcon,
	HomeIcon,
	HomeActiveIcon
} from '../../icons';
import { defaultCurrentUser } from '../../data';

function Navbar({ minimalNavbar }) {
	const classes = useNavbarStyles();
	// the history object will tell the path we're on within our app
	const history = useHistory();
	const path = history.location.pathname;

	return (
		<AppBar className={classes.appBar}>
			<section className={classes.section}>
				<Logo />
				{!minimalNavbar && <Search />}
				{!minimalNavbar && <Links path={path} />}
			</section>
		</AppBar>
	);
}

function Logo() {
	const classes = useNavbarStyles();

	return (
		<div className={classes.logoContainer}>
			<Link to='/'>
				<div className={classes.logoWrapper}>
					<img src={logo} alt='Instagram' className={classes.logo} />
				</div>
			</Link>
		</div>
	);
}

function Search() {
	const classes = useNavbarStyles();
	const [query, setQuery] = useState('');

	let loading = false;

	function handleClearInput() {
		setQuery('');
	}

	return (
		<Hidden xsDown>
			<InputBase
				onChange={(event) => setQuery(event.target.value)}
				className={classes.input}
				startAdornment={<span className={classes.searchIcon} />}
				endAdornment={
					loading ? (
						<LoadingIcon />
					) : (
						<span onClick={handleClearInput} className={classes.clearIcon} />
					)
				}
				placeholder='Search'
				value={query}
			/>
		</Hidden>
	);
}

function Links({ path }) {
	const classes = useNavbarStyles();
	const [showList, setList] = useState(false);

	function handleToggleList() {
		setList((prev) => !prev);
	}

	return (
		<div className={classes.linksContainer}>
			<div className={classes.linksWrapper}>
				<Hidden xsDown>
					<AddIcon />
				</Hidden>
				<Link to='/'>{path === '/' ? <HomeActiveIcon /> : <HomeIcon />}</Link>
				<Link to='/explore'>
					{path === '/explore' ? <ExploreActiveIcon /> : <ExploreIcon />}
				</Link>
				<div onClick={handleToggleList} className={classes.notifications}>
					{showList ? <LikeActiveIcon /> : <LikeIcon />}
				</div>
				<Link to={`/${defaultCurrentUser.username}`}>
					<div
						className={
							path === `/${defaultCurrentUser.username}`
								? classes.profileActive
								: ''
						}
					></div>
					<Avatar
						src={defaultCurrentUser.profile_image}
						className={classes.profileImage}
					/>
				</Link>
			</div>
		</div>
	);
}

export default Navbar;
