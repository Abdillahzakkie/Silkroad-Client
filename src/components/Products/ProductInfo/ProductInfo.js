import React from 'react';
import { Link } from 'react-router-dom';
import { ProductSection } from "../product.styled";

export function ProductInfo(props) {
    const {seller, name, price, quantity, reviews, isLoggedIn, theme } = props;

    return (
        <ProductSection className='product-info' theme={theme}>
            <h2>info</h2>
            <p>seller: {seller || 'unknown'}</p>
            <p>product: {name}</p>
            <p>price : {price} ether</p>
            <p>quantity : {quantity}</p>
            <p>reviews : {reviews}</p>

            <Link to={isLoggedIn ? '/buy' : '/login'} className='product-checkout'>
                checkout
            </Link>
        </ProductSection>
    )
}