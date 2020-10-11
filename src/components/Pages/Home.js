import React, { useContext } from 'react';
// import { Link } from "react-router-dom";
import { Banner } from "../Banner";
import { ErrorBoundary } from "../ErrorBoundary";
import { web3Context } from "../Context";
import { productContext } from "../Context/product";
import { BackgroundStyle } from "../BackgroundStyle";
import background from "../../assets/facilities/hero.jpeg";
import { HeaderContainer } from "./Styles/home.styled";
import Card from '../Card';

export function Home() {
    const web3Consumer = useContext(web3Context);
    const productConsumer = useContext(productContext);

    const { featuredProducts } = productConsumer;
    const { userData, isLoggedIn } = web3Consumer;

    let theme;
    if(isLoggedIn) theme = userData.encoded.preference.theme;

    return (
        <div className='center home'>
            <BackgroundStyle className='center' background={background} >
                <Banner btnText='browse our courses' />
            </BackgroundStyle>
            <HeaderContainer className='center' theme={theme}>
                <div className="center">
                    <h2>featured products</h2>
                </div>
            </HeaderContainer>
            <Card cardItem={featuredProducts} />
        </div>
    )
}

export default ErrorBoundary(Home)
