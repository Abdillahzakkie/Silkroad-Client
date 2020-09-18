import React from 'react';
import { ProductSection } from "../../BackgroundStyle/product";
import "../products.css";

export function ProductDetail({ description, theme }) {
    return (
        <ProductSection className='product-section' theme={theme}>
            <h2>details</h2>
            <p>{description}</p>
        </ProductSection>
    )
}