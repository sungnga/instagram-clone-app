import React, { useContext, useState } from 'react';
import { Hidden } from '@material-ui/core';
import { useFeedPageStyles } from '../styles';
import Layout from '../components/shared/Layout';
// import FeedPost from '../components/feed/FeedPost';
import UserCard from '../components/shared/UserCard';
import FeedSideSuggestions from '../components/feed/FeedSideSuggestions';
// import { getDefaultPost } from '../data';
import LoadingScreen from '../components/shared/LoadingScreen';
import { LoadingLargeIcon } from '../icons';
import FeedPostSkeleton from '../components/feed/FeedPostSkeleton';
import { UserContext } from '../App';
import { useQuery } from '@apollo/client';
import { GET_FEED } from '../graphql/queries';
const FeedPost = React.lazy(() => import('../components/feed/FeedPost'));

function FeedPage() {
	const classes = useFeedPageStyles();
	const [isEndOfFeed] = useState(false);
	const { me, feedIds } = useContext(UserContext);
	const variables = { feedIds, limit: 2 };
	const { data, loading } = useQuery(GET_FEED, { variables });

	// let loading = false;
	if (loading) return <LoadingScreen />;

	return (
		<Layout title='Feed'>
			<div className={classes.container}>
				{/* Feed Posts */}
				<div>
					{data.posts.map((post, index) => (
						<React.Suspense key={post.id} fallback={<FeedPostSkeleton />}>
							<FeedPost index={index} post={post} />
						</React.Suspense>
					))}
				</div>
				{/* Sidebar */}
				<Hidden smDown>
					<div className={classes.sidebarContainer}>
						<div className={classes.sidebarWrapper}>
							<UserCard user={me} avatarSize={50} />
							<FeedSideSuggestions />
						</div>
					</div>
				</Hidden>
				{!isEndOfFeed && <LoadingLargeIcon />}
			</div>
		</Layout>
	);
}

export default FeedPage;
