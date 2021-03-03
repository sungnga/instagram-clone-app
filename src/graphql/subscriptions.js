import { gql } from '@apollo/client';

export const ME = gql`
	subscription me($userId: String) {
		users(where: { user_id: { _eq: $userId } }) {
			id
			user_id
			name
			username
			profile_image
			last_checked
			notifications(order_by: { created_at: desc }) {
				id
				type
				created_at
				post {
					id
					media
				}
				user {
					id
					username
					profile_image
				}
			}
		}
	}
`;

export const GET_POST = gql`
	subscription getPost($postId: uuid!) {
		posts_by_pk(id: $postId) {
			id
			caption
			created_at
			media
			location
			user_id
			user {
				id
				username
				name
				profile_image
			}
			likes_aggregate {
				aggregate {
					count
				}
			}
			likes {
				id
				user_id
			}
			saved_posts {
				id
				user_id
			}
			comments(order_by: { created_at: desc }) {
				id
				content
				created_at
				user {
					username
					profile_image
				}
			}
		}
	}
`;
