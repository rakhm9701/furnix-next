import { Stack, Box } from '@mui/material';
import React, { useState } from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';

const infoItems = [
	{
		title: 'FREE SHIPPING',
		description: 'All The Business Growth And Profit Revolve Areffective Catchy.',
		image: '/img/banner/information/plane.png',
	},
	{
		title: 'ONE DAY DELIVERY SHIPPING',
		description: 'Present Idligula A Diam Hendrerit Interdum Quisnon Locus.',
		image: '/img/banner/information/car.png',
	},
	{
		title: 'ONLINE PAYMENTS',
		description: 'Donec Ac Pures But It Isd Fdsfjewoifj We Yes I Like It',
		image: '/img/banner/information/payment.png',
	},
	{
		title: 'CUSTOMER SERVICE',
		description: 'All The Business Growth And Profit Revolve Areffective Catchy',
		image: '/img/banner/information/callCenter.png',
	},
];

const Information = () => {
	const device = useDeviceDetect();
	const [activeInfoIndex, setActiveInfoIndex] = useState(0);
	const activeInfo = infoItems[activeInfoIndex];

	if (device === 'mobile') {
		return (
			<Stack className={'info-container mobile-info-container'}>
				<Stack className={'mobile-info-row'}>
					{infoItems.map((item, index) => (
						<Box
							key={item.title}
							component={'button'}
							type="button"
							className={`mobile-info-item ${activeInfoIndex === index ? 'active' : ''}`}
							onClick={() => setActiveInfoIndex(index)}
						>
							<img src={item.image} alt="" />
						</Box>
					))}
				</Stack>
				<Box component={'div'} className={'mobile-info-detail'}>
					<h3>{activeInfo.title}</h3>
					<span>{activeInfo.description}</span>
				</Box>
			</Stack>
		);
	}

	return (
		<Stack className={'info-container'}>
			<Stack className={'info-box'}>
				{infoItems.map((item, index) => (
					<React.Fragment key={item.title}>
						<Box component={'div'} className={'box'}>
							<img src={item.image} alt="" />
							<Box component={'div'} className={'text'}>
								<h3>{item.title}</h3>
								<span>{item.description}</span>
							</Box>
						</Box>
						{index < infoItems.length - 1 && <Box component={'div'} className={'divider'}></Box>}
					</React.Fragment>
				))}
			</Stack>
		</Stack>
	);
};

export default Information;
