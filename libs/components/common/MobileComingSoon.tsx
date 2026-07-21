import { Box, Stack } from '@mui/material';
import React from 'react';

interface MobileComingSoonProps {
	title: string;
	backgroundText?: string;
}

const MobileComingSoon = ({ title, backgroundText = 'Furnix' }: MobileComingSoonProps) => {
	return (
		<Stack className={'mobile-coming-soon-section'}>
			<Box component={'div'} className={'mobile-coming-soon-card'}>
				<span className={'background-text'}>{backgroundText}</span>
				<span className={'eyebrow'}>Mobile Page</span>
				<h1>{title}</h1>
				<p>Coming soon</p>
			</Box>
		</Stack>
	);
};

export default MobileComingSoon;
