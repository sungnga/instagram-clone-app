import React, { Fragment, useEffect, useRef } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import FeedPage from './pages/feed';
import ExplorePage from './pages/explore';
import ProfilePage from './pages/profile';
import PostPage from './pages/post';
import EditProfilePage from './pages/edit-profile';
import LoginPage from './pages/login';
import SignUpPage from './pages/signup';
import NotFoundPage from './pages/not-found';
import PostModal from './components/post/PostModal';

function App() {
	const history = useHistory();
	const location = useLocation();
	// console.log(history, location)
	// Keeps track of the previous location we've visited
	const prevLocation = useRef(location);
	// Get modal property from location.state, if it exists
	const modal = location.state?.modal;

	useEffect(() => {
		if (history.action !== 'POP' && !modal) {
			prevLocation.current = location;
		}
	}, [location, modal, history.action]);

	// If modal is true and we move to a different route
	const isModalOpen = modal && prevLocation.current !== location;

	return (
		<Fragment>
			<Switch location={isModalOpen ? prevLocation.current : location}>
				<Route path='/' exact component={FeedPage} />
				<Route path='/explore' component={ExplorePage} />
				<Route path='/:username' exact component={ProfilePage} />
				<Route path='/p/:postId' exact component={PostPage} />
				<Route path='/accounts/edit' component={EditProfilePage} />
				<Route path='/accounts/login' component={LoginPage} />
				<Route path='/accounts/emailsignup' component={SignUpPage} />
				<Route path='*' component={NotFoundPage} />
			</Switch>
			{isModalOpen && <Route exact path='/p/:postId' component={PostModal} />}
		</Fragment>
	);
}

export default App;
