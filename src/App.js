import React, {
	Fragment,
	useEffect,
	useRef,
	useContext,
	createContext
} from 'react';
import {
	Switch,
	Route,
	useHistory,
	useLocation,
	Redirect
} from 'react-router-dom';
import { useSubscription } from '@apollo/client';
import FeedPage from './pages/feed';
import ExplorePage from './pages/explore';
import ProfilePage from './pages/profile';
import PostPage from './pages/post';
import EditProfilePage from './pages/edit-profile';
import LoginPage from './pages/login';
import SignUpPage from './pages/signup';
import NotFoundPage from './pages/not-found';
import PostModal from './components/post/PostModal';
import { AuthContext } from './auth';
import { ME } from './graphql/subscriptions';
import LoadingScreen from './components/shared/LoadingScreen';

export const UserContext = createContext();

function App() {
	const { authState } = useContext(AuthContext);
	console.log({ authState });
	const history = useHistory();
	const location = useLocation();
	// console.log(history, location)
	// Keeps track of the previous location we've visited
	const prevLocation = useRef(location);
	// Get modal property from location.state, if it exists
	const modal = location.state?.modal;
	const isAuth = authState.status === 'in';
	const userId = isAuth ? authState.user.uid : null;
	const variables = { userId };
	const { data, loading } = useSubscription(ME, { variables });

	useEffect(() => {
		if (history.action !== 'POP' && !modal) {
			prevLocation.current = location;
		}
	}, [location, modal, history.action]);

	if (loading) return <LoadingScreen />;

	if (!isAuth) {
		// Use unauth routes
		return (
			<Switch>
				<Route path='/accounts/login' component={LoginPage} />
				<Route path='/accounts/emailsignup' component={SignUpPage} />
				<Redirect to='/accounts/login' />
			</Switch>
		);
	}

	// If modal is true and we move to a different route
	const isModalOpen = modal && prevLocation.current !== location;
	const me = isAuth && data ? data.users[0] : null;
	const currentUserId = me.id;
	const followingIds = me.following.map(({ user }) => user.id);
	const followerIds = me.followers.map(({ user }) => user.id);
	const feedIds = [...followingIds, currentUserId];

	return (
		<UserContext.Provider
			value={{ me, currentUserId, followingIds, followerIds, feedIds }}
		>
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
		</UserContext.Provider>
	);
}

export default App;
