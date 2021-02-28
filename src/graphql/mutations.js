import { gql } from '@apollo/client';

export const CREATE_USER = gql`
	mutation createUser(
		$userId: String!
		$name: String!
		$username: String!
		$email: String!
		$bio: String!
		$website: String!
		$profileImage: String!
		$phoneNumber: String!
	) {
		insert_users(
			objects: {
				bio: $bio
				email: $email
				name: $name
				phone_number: $phoneNumber
				profile_image: $profileImage
				user_id: $userId
				username: $username
				website: $website
			}
		) {
			affected_rows
		}
	}
`;

export const EDIT_USER = gql`
	mutation editUser(
		$id: uuid!
		$name: String!
		$username: String!
		$bio: String!
		$email: String!
		$website: String!
		$phoneNumber: String!
	) {
		update_users(
			where: { id: { _eq: $id } }
			_set: {
				bio: $bio
				email: $email
				name: $name
				phone_number: $phoneNumber
				username: $username
				website: $website
			}
		) {
			affected_rows
		}
	}
`;

export const EDIT_USER_AVATAR = gql`
	mutation editUserAvatar($id: uuid!, $profileImage: String!) {
		update_users(
			where: { id: { _eq: $id } }
			_set: { profile_image: $profileImage }
		) {
			affected_rows
		}
	}
`;

export const CREATE_POST = gql`
	mutation createPost(
		$userId: uuid!
		$media: String!
		$location: String!
		$caption: String!
	) {
		insert_posts(
			objects: {
				user_id: $userId
				media: $media
				location: $location
				caption: $caption
			}
		) {
			affected_rows
		}
	}
`;

export const LIKE_POST = gql`
	mutation likePost($postId: uuid!, $userId: uuid!, $profileId: uuid!) {
		insert_likes(objects: { user_id: $userId, post_id: $postId }) {
			affected_rows
		}
		insert_notifications(
			objects: {
				post_id: $postId
				user_id: $userId
				profile_id: $profileId
				type: "like"
			}
		) {
			affected_rows
		}
	}
`;

export const UNLIKE_POST = gql`
	mutation unlikePost($postId: uuid!, $userId: uuid!, $profileId: uuid!) {
		delete_likes(
			where: { post_id: { _eq: $postId }, user_id: { _eq: $userId } }
		) {
			affected_rows
		}
		delete_notifications(
			where: {
				post_id: { _eq: $postId }
				user_id: { _eq: $userId }
				profile_id: { _eq: $profileId }
				type: { _eq: "like" }
			}
		) {
			affected_rows
		}
	}
`;

export const SAVE_POST = gql`
	mutation savePost($postId: uuid!, $userId: uuid!) {
		insert_saved_posts(objects: { user_id: $userId, post_id: $postId }) {
			affected_rows
		}
	}
`;

export const UNSAVE_POST = gql`
	mutation unsavePost($postId: uuid!, $userId: uuid!) {
		delete_saved_posts(
			where: { post_id: { _eq: $postId }, user_id: { _eq: $userId } }
		) {
			affected_rows
		}
	}
`;

export const CREATE_COMMENT = gql`
	mutation createComment($postId: uuid!, $userId: uuid!, $content: String!) {
		insert_comments(
			objects: { post_id: $postId, user_id: $userId, content: $content }
		) {
			affected_rows
		}
	}
`;
