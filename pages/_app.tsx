import type { AppProps } from 'next/app';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import React, { useMemo } from 'react';
import { light } from '../scss/MaterialTheme';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../apollo/client';
import { appWithTranslation } from 'next-i18next';
import nextI18NextConfig from '../next-i18next.config';
import '../scss/app.scss';
import '../scss/pc/main.scss';
import '../scss/mobile/main.scss';
import { CartProvider } from '../libs/context/useCart';

const App = ({ Component, pageProps }: AppProps) => {
	const theme = useMemo(() => createTheme(light as any), []);
	const client = useApollo(pageProps.initialApolloState);

	return (
		<ApolloProvider client={client}>
			<ThemeProvider theme={theme}>
				<CartProvider>
					<CssBaseline />
					<Component {...pageProps} />
				</CartProvider>
			</ThemeProvider>
		</ApolloProvider>
	);
};

export default appWithTranslation(App, nextI18NextConfig as any);
