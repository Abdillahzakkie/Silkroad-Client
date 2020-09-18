import React, { useContext } from 'react';
// import { Link } from "react-router-dom";
import { Banner } from "../Banner";
import { ErrorBoundary } from "../ErrorBoundary";
import { productContext } from "../Context/product";
import { Header } from "../Header";
import { BackgroundStyle } from "../BackgroundStyle";
import background from "../../assets/facilities/hero.jpeg";
import Card from '../Card';

// import background from "../../assets/blog/blog-home-banner.jpg";
// import logo from "../../assets/logo.png";

export function Home() {
    const productConsumer = useContext(productContext);

    const { featuredProducts } = productConsumer;

    return (
        <div className='center home'>
            <BackgroundStyle className='center' background={background} >
                <Banner btnText='browse our courses' />
            </BackgroundStyle>
            <Header title='Featured courses' />
            <Card cardItem={featuredProducts} />
        </div>
    )
}

export default ErrorBoundary(Home)
