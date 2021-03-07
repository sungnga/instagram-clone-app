import React, { useContext, useState, useEffect, useCallback } from 'react';
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
import usePageBottom from '../utils/usePageBottom';
const FeedPost = React.lazy(() => import('../components/feed/FeedPost'));

function FeedPage() {
	const classes = useFeedPageStyles();
	const [isEndOfFeed, setEndOfFeed] = useState(false);
	const { me, feedIds } = useContext(UserContext);
	const variables = { feedIds, limit: 2 };
	const { data, loading, fetchMore } = useQuery(GET_FEED, { variables });
	const isPageBottom = usePageBottom();

	// prev value contains previous fetch posts array
	// fetchMoreResult value contains newly fetched posts array
	const handleUpdateQuery = useCallback((prev, { fetchMoreResult }) => {
		// console.log({prev, fetchMoreResult})
		if (fetchMoreResult.posts.length === 0) {
			setEndOfFeed(true);
			return prev;
		}
		return { posts: [...prev.posts, ...fetchMoreResult.posts] };
	}, []);

	useEffect(() => {
		if (!isPageBottom || !data) return;
		const lastTimestamp = data.posts[data.posts.length - 1].created_at;
		const variables = { feedIds, limit: 2, lastTimestamp };
		fetchMore({
			variables,
			updateQuery: handleUpdateQuery
		});
	}, [isPageBottom, data, feedIds, fetchMore, handleUpdateQuery]);

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
