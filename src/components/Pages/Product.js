import React, { useContext } from 'react';
import { Banner } from "../Banner";
import { ErrorBoundary } from "../ErrorBoundary";
import { web3Context } from "../Context";
import { Category } from "../Category";
import { BackgroundStyle } from "../BackgroundStyle";
import Card from '../Card';
import background from "../../assets/facilities/hero.jpeg";

export function Product() {
    const web3Consumer = useContext(web3Context);
    const { sortedProducts } = web3Consumer;

    return (
        <div className='center product'>
            <BackgroundStyle className='center' background={background} >
                <Banner btnText='browse our courses' />
            </BackgroundStyle>
            <Category />
            <Card cardItem={sortedProducts} />
        </div>
    )
}

export default ErrorBoundary(Product)
