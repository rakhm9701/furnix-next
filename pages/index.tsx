import { NextPage } from 'next';
import withLayoutMain from '../libs/components/layout/LayoutHome';
import CommunityBoards from '../libs/components/homepage/CommunityBoards';
import TopAgents from '../libs/components/homepage/TopAgents';
import TrendProducts from '../libs/components/homepage/TrendProducts';
import TopProducts from '../libs/components/homepage/TopProducts';
import { Stack } from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Information from '../libs/components/homepage/Information';
import ProductDetail from '../libs/components/homepage/ProductDetail';
import ProductShowcase from '../libs/components/homepage/ProductShowcase';
import BrandCategories from '../libs/components/homepage/BrandCategories';

export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

const Home: NextPage = () => {
	return (
		<Stack className={'home-page'}>
			<Information />
			<TrendProducts />
			<ProductDetail />
			<ProductShowcase />
			<TopProducts />
			<TopAgents />
			<CommunityBoards />
			<BrandCategories />
		</Stack>
	);
};

export default withLayoutMain(Home);
