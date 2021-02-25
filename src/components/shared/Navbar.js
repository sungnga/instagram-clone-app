import React, { useState, useEffect, Fragment, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
	AppBar,
	Avatar,
	Fade,
	Grid,
	Hidden,
	InputBase,
	Typography,
	Zoom
} from '@material-ui/core';
import { useNProgress } from '@tanem/react-nprogress';
import { useNavbarStyles, WhiteTooltip, RedTooltip } from '../../styles';
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
import NotificationTooltip from '../notification/NotificationTooltip';
import NotificationList from '../notification/NotificationList';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_USERS } from '../../graphql/queries';
import { UserContext } from '../../App';

function Navbar({ minimalNavbar }) {
	const classes = useNavbarStyles();
	// the history object will tell the path we're on within our app
	const history = useHistory();
	const [isLoadingPage, setLoadingPage] = useState(true);
	const path = history.location.pathname;

	useEffect(() => {
		setLoadingPage(false);
	}, [path]);

	return (
		<Fragment>
			<Progress isAnimating={isLoadingPage} />
			<AppBar className={classes.appBar}>
				<section className={classes.section}>
					<Logo />
					{!minimalNavbar && <Search history={history} />}
					{!minimalNavbar && <Links path={path} />}
				</section>
			</AppBar>
		</Fragment>
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
	const [searchUsers, { data }] = useLazyQuery(SEARCH_USERS);

	const hasResults = Boolean(query) && results.length > 0;

	useEffect(() => {
		if (!query.trim()) return;
		setLoading(true);
		const variables = { query: `%${query}%` };
		searchUsers({ variables });
		if (data) {
			setResults(data.users);
			setLoading(false);
		}
		// setResults(Array.from({ length: 5 }, () => getDefaultUser()));
	}, [query, data, searchUsers]);

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
	const [showTooltip, setTooltip] = useState(true);
	const [showList, setList] = useState(false);
	const { me } = useContext(UserContext);

	useEffect(() => {
		const timeout = setTimeout(handleHideTooltip, 2000);
		return () => {
			clearTimeout(timeout);
		};
	}, []);

	function handleToggleList() {
		setList((prev) => !prev);
	}

	function handleHideTooltip() {
		setTooltip(false);
	}

	function handleHideList() {
		setList(false);
	}

	return (
		<div className={classes.linksContainer}>
			{showList && <NotificationList handleHideList={handleHideList} />}
			<div className={classes.linksWrapper}>
				<Hidden xsDown>
					<AddIcon />
				</Hidden>
				<Link to='/'>{path === '/' ? <HomeActiveIcon /> : <HomeIcon />}</Link>
				<Link to='/explore'>
					{path === '/explore' ? <ExploreActiveIcon /> : <ExploreIcon />}
				</Link>
				<RedTooltip
					arrow
					open={showTooltip}
					onOpen={handleHideTooltip}
					TransitionComponent={Zoom}
					title={<NotificationTooltip />}
				>
					<div onClick={handleToggleList} className={classes.notifications}>
						{showList ? <LikeActiveIcon /> : <LikeIcon />}
					</div>
				</RedTooltip>
				<Link to={`/${defaultCurrentUser.username}`}>
					<div
						className={
							path === `/${defaultCurrentUser.username}`
								? classes.profileActive
								: ''
						}
					></div>
					<Avatar src={me.profile_image} className={classes.profileImage} />
				</Link>
			</div>
		</div>
	);
}

function Progress({ isAnimating }) {
	const classes = useNavbarStyles();
	const { animationDuration, isFinished, progress } = useNProgress({
		isAnimating
	});

	// 0 is invisible, 1 is visible
	return (
		<div
			className={classes.progressContainer}
			style={{
				opacity: isFinished ? 0 : 1,
				transition: `opacity ${animationDuration}ms linear`
			}}
		>
			<div
				className={classes.progressBar}
				style={{
					marginLeft: `${(-1 + progress) * 100}%`,
					transition: `margin-left ${animationDuration}ms linear`
				}}
			>
				<div className={classes.progressBackground} />
			</div>
		</div>
	);
}

export default Navbar;
