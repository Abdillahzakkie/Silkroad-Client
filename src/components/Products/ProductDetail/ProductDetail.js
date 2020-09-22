import React from 'react';
import { ProductSection } from "../product.styled";

export function ProductDetail({ description, theme }) {
    return (
        <ProductSection className='product-detail' theme={theme}>
            <h2>details</h2>
            <p>{description}</p>
        </ProductSection>
    )
}