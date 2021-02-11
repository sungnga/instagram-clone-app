import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import theme from './theme';
import App from './App';
import client from './graphql/client';
import AuthProvider from './auth';

ReactDOM.render(
	<ApolloProvider client={client}>
		<AuthProvider>
			<MuiThemeProvider theme={theme}>
				<CssBaseline />
				<Router>
					<App />
				</Router>
			</MuiThemeProvider>
		</AuthProvider>
	</ApolloProvider>,
	document.getElementById('root')
);
