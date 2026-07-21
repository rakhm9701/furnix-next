import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Box, Stack } from '@mui/material';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import Notice from '../../libs/components/cs/Notice';
import Faq from '../../libs/components/cs/Faq';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import MobileComingSoon from '../../libs/components/common/MobileComingSoon';

export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

const CS: NextPage = () => {
	const device = useDeviceDetect();
	const router = useRouter();

	/** HANDLERS **/
	const changeTabHandler = (tab: string) => {
		router.push(
			{
				pathname: '/cs',
				query: { tab: tab },
			},
			undefined,
			{ scroll: false },
		);
	};
	// Changed default to 'faq'
	const tab = router.query.tab ?? 'faq';

	if (device === 'mobile') {
		return <MobileComingSoon title="CS Mobile Page" backgroundText="Support" />;
	} else {
		return (
			<Stack className={'cs-page'}>
				<Stack className={'container'}>
					<Box component={'div'} className={'cs-main-info'}>
						<Box component={'div'} className={'info'}>
							<span>Cs center</span>
							<p>I will answer your questions</p>
						</Box>
						<Box component={'div'} className={'btns'}>
							<div
								className={tab == 'faq' ? 'active' : ''}
								onClick={() => {
									changeTabHandler('faq');
								}}
							>
								FAQ
							</div>
							<div
								className={tab == 'notice' ? 'active' : ''}
								onClick={() => {
									changeTabHandler('notice');
								}}
							>
								Notice
							</div>
						</Box>
					</Box>

					<Box component={'div'} className={'cs-content'}>
						{tab === 'faq' && <Faq />}
						
						{tab === 'notice' && <Notice />}

					</Box>
				</Stack>
			</Stack>
		);
	}
};

export default withLayoutBasic(CS);
