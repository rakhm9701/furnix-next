declare module 'swiper' {
	export class Swiper {
		[key: string]: any;
	}

	const SwiperCore: {
		use: (modules: any[]) => void;
	};

	export const Autoplay: any;
	export const Navigation: any;
	export const Pagination: any;
	export default SwiperCore;
}
