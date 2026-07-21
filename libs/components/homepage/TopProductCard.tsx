import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Product } from '../../types/product/product';
import { REACT_APP_API_URL } from '../../config';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useCart } from '../../context/useCart';
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from '../../sweetAlert';

interface TopProductCardProps {
	product: Product;
	likeProductHandler: any;
}

const TopProductCard = (props: TopProductCardProps) => {
	const { product: product, likeProductHandler: likeProductHandler } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);
	const { addToCart } = useCart();
	const productImage = product?.productImages?.[0]
		? `${REACT_APP_API_URL}/${product.productImages[0]}`
		: '/img/banner/products.jpg';

	/** HANDLERS **/
	const pushDetailHandler = async (productId: string) => {
		console.log('productId:', productId);
		await router.push({ pathname: '/product/detail', query: { id: productId } });
	};

	const handleAddToCart = async () => {
		try {
			addToCart(product, 1);
			await sweetTopSmallSuccessAlert('Added to cart successfully', 800);
		} catch (err: any) {
			await sweetErrorHandling(err);
		}
	};

	return (
		<Stack className="top-card-box product-card">
			<Box
				component={'div'}
				className={'card-img'}
				style={device === 'mobile' ? {} : { backgroundImage: `url(${productImage})` }}
				onClick={() => pushDetailHandler(product._id)}
			>
				{device === 'mobile' && <img src={productImage} alt={product?.productTitle} />}
				<IconButton
					className="favorite-button"
					onClick={(e: any) => {
						e.stopPropagation();
						likeProductHandler(user, product?._id);
					}}
				>
					{product?.meLiked && product?.meLiked[0]?.myFavorite ? (
						<FavoriteIcon className="favorite-icon active" />
					) : (
						<FavoriteBorderIcon className="favorite-icon" />
					)}
				</IconButton>
			</Box>

			<Box component={'div'} className={'info'}>
				<strong className={'title'} onClick={() => pushDetailHandler(product._id)}>
					{product?.productTitle}
				</strong>
				<Typography className={'price'}>${product?.productPrice?.toFixed(2)}</Typography>
			</Box>
			<IconButton
				className="add-to-cart-button"
				onClick={(e: any) => {
					e.stopPropagation();
					handleAddToCart();
				}}
			>
				<ShoppingCartOutlinedIcon />
			</IconButton>
		</Stack>
	);
};

export default TopProductCard;
