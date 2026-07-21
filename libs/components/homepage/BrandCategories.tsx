import { Stack } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';

const brands = [
	'/img/logo/Logo-1.png',
	'/img/logo/Logo-2.png',
	'/img/logo/Logo-3.png',
	'/img/logo/Logo-4.png',
	'/img/logo/Logo-5.png',
	'/img/logo/Logo-6.png',
	'/img/logo/Logo-7.png',
];

const BrandCategories = () => {
	const device = useDeviceDetect();

	if (device === 'mobile') {
		return (
			<Stack className={'brand-container'}>
				<Swiper
					className={'brand-swiper'}
					slidesPerView={'auto'}
					spaceBetween={14}
					loop={true}
					autoplay={{ delay: 1800, disableOnInteraction: false }}
					modules={[Autoplay]}
				>
					{brands.map((brand) => (
						<SwiperSlide className={'brand-slide'} key={brand}>
							<Stack className={'category'}>
								<img src={brand} alt="" />
							</Stack>
						</SwiperSlide>
					))}
				</Swiper>
			</Stack>
		);
	}

	return (
		<Stack className={'brand-container'}>
			<Stack className={'category-box'}>
				{brands.map((brand) => (
					<Stack className={'category'} key={brand}>
						<img src={brand} alt="" />
					</Stack>
				))}
			</Stack>
		</Stack>
	);
};

export default BrandCategories;
