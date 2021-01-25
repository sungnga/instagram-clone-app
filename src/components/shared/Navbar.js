import React, { useState, useEffect } from 'react';
import {
	AppBar,
	Avatar,
	Fade,
	Grid,
	Hidden,
	InputBase,
	Typography
} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useNavbarStyles, WhiteTooltip } from '../../styles';
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
import { defaultCurrentUser, getDefaultUser } from '../../data';

function Navbar({ minimalNavbar }) {
	const classes = useNavbarStyles();
	// the history object will tell the path we're on within our app
	const history = useHistory();
	const path = history.location.pathname;

	return (
		<AppBar className={classes.appBar}>
			<section className={classes.section}>
				<Logo />
				{!minimalNavbar && <Search history={history} />}
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

function Search({ history }) {
	const classes = useNavbarStyles();
	const [loading, setLoading] = useState(false);
	const [query, setQuery] = useState('');
	const [results, setResults] = useState([]);

	const hasResults = Boolean(query) && results.length > 0;

	useEffect(() => {
		if (!query.trim()) return;
		setResults(Array.from({ length: 5 }, () => getDefaultUser()));
	}, [query]);

	function handleClearInput() {
		setQuery('');
	}

	return (
		<Hidden xsDown>
			<WhiteTooltip
				arrow
				interactive
				TransitionComponent={Fade}
				open={hasResults}
				title={
					hasResults && (
						<Grid className={classes.resultContainer} container>
							{results.map((result) => (
								<Grid
									key={result.id}
									item
									className={classes.resultLink}
									onClick={() => {
										history.push(`/${result.username}`);
										handleClearInput();
									}}
								>
									<div className={classes.resultWrapper}>
										<div className={classes.avatarWrapper}>
											<Avatar src={result.profile_image} alt='User avatar' />
										</div>
										<div className={classes.nameWrapper}>
											<Typography variant='body1'>{result.username}</Typography>
											<Typography variant='body2' color='textSecondary'>
												{result.name}
											</Typography>
										</div>
									</div>
								</Grid>
							))}
						</Grid>
					)
				}
			>
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
			</WhiteTooltip>
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
