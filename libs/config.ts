const DEFAULT_API_URL = 'https://api.furnix.uz';

const normalizeApiUrl = (url: string) => url.replace(/\/+$/, '');
const toWsUrl = (url: string) => normalizeApiUrl(url).replace(/^http:\/\//, 'ws://').replace(/^https:\/\//, 'wss://');

export const REACT_APP_API_URL = normalizeApiUrl(process.env.REACT_APP_API_URL || DEFAULT_API_URL);
export const REACT_APP_API_GRAPHQL_URL =
	process.env.REACT_APP_API_GRAPHQL_URL || `${REACT_APP_API_URL}/graphql`;
export const REACT_APP_API_WS = process.env.REACT_APP_API_WS
	? toWsUrl(process.env.REACT_APP_API_WS)
	: toWsUrl(REACT_APP_API_URL);

export const availableOptions = ['productBarter', 'productRent'];

const thisYear = new Date().getFullYear();

export const productYears: any = [];

for (let i = 1970; i <= thisYear; i++) {
	productYears.push(String(i));
}

export const productSize = ['SMALL', 'MEDIUM', 'LARGE', 'EXTRA_LARGE'];

export const Messages = {
	error1: 'Something went wrong!',
	error2: 'Please login first!',
	error3: 'Please fulfill all inputs!',
	error4: 'Message is empty!',
	error5: 'Only images with jpeg, jpg, png format allowed!',
};

export const topProductRank = 3;
