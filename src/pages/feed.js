import React, { useState } from 'react';
import { Hidden } from '@material-ui/core';
import { useFeedPageStyles } from '../styles';
import Layout from '../components/shared/Layout';
// import FeedPost from '../components/feed/FeedPost';
import UserCard from '../components/shared/UserCard';
import FeedSideSuggestions from '../components/feed/FeedSideSuggestions';
import { getDefaultPost } from '../data';
import LoadingScreen from '../components/shared/LoadingScreen';
import { LoadingLargeIcon } from '../icons';
const FeedPost = React.lazy(() => import('../components/feed/FeedPost'));

function FeedPage() {
	const classes = useFeedPageStyles();
	const [isEndOfFeed] = useState(true);

	let loading = false;
	if (loading) return <LoadingScreen />;

	return (
		<Layout title='Feed'>
			<div className={classes.container}>
				{/* Feed Posts */}
				<div>
					{Array.from({ length: 5 }, () => getDefaultPost()).map(
						(post, index) => (
							<React.Suspense key={post.id} fallback={<>loading...</>}>
								<FeedPost index={index} post={post} />
							</React.Suspense>
						)
					)}
				</div>
				{/* Sidebar */}
				<Hidden smDown>
					<div className={classes.sidebarContainer}>
						<div className={classes.sidebarWrapper}>
							<UserCard avatarSize={50} />
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
