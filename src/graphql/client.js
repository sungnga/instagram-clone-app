import { ApolloClient, InMemoryCache } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';

const headers = { 'x-hasura-admin-secret': process.env.REACT_APP_HASURA_ADMIN_SECRET };

const client = new ApolloClient({
	link: new WebSocketLink({
		uri: 'wss://ngala-instagram-clone.herokuapp.com/v1/graphql',
		options: {
			reconnect: true,
			connectionParams: {
				headers
			}
		}
	}),
	cache: new InMemoryCache()
});

export default client;
