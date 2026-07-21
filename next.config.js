/** @type {import('next').NextConfig} */
const DEFAULT_API_URL = 'https://api.furnix.uz';
const normalizeApiUrl = (url) => url.replace(/\/+$/, '');
const toWsUrl = (url) => normalizeApiUrl(url).replace(/^http:\/\//, 'ws://').replace(/^https:\/\//, 'wss://');

const apiUrl = normalizeApiUrl(process.env.REACT_APP_API_URL || DEFAULT_API_URL);
const apiGraphqlUrl = process.env.REACT_APP_API_GRAPHQL_URL || `${apiUrl}/graphql`;
const apiWsUrl = process.env.REACT_APP_API_WS ? toWsUrl(process.env.REACT_APP_API_WS) : toWsUrl(apiUrl);

const nextConfig = {
	reactStrictMode: true,
	env: {
		REACT_APP_API_URL: apiUrl,
		REACT_APP_API_GRAPHQL_URL: apiGraphqlUrl,
		REACT_APP_API_WS: apiWsUrl,
	},
};

const { i18n } = require('./next-i18next.config');
nextConfig.i18n = i18n;

module.exports = nextConfig;
