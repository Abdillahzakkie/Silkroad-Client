import React, { useContext } from 'react';
import { Banner } from "../Banner";
import { ErrorBoundary } from "../ErrorBoundary";
import { web3Context } from "../Context";
import { BackgroundStyle } from "../BackgroundStyle";
import background from "../../assets/facilities/hero.jpeg";
import { HeaderContainer } from "./Styles/home.styled";
import Card from '../Card';

export function Home() {
    const web3Consumer = useContext(web3Context);
    const { userData, isLoggedIn, carts } = web3Consumer;

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
            <Card cardItem={carts} />
        </div>
    )
}

export default ErrorBoundary(Home)
