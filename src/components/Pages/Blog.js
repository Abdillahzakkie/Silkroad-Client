import React from 'react';
import { Banner } from "../Banner";
import { ErrorBoundary } from "../ErrorBoundary";
import { Header } from "../Header";
import { BackgroundStyle } from "../BackgroundStyle";
import background from "../../assets/facilities/hero.jpeg";

export function Blog() {
    const height = 85;
    const title = 'Welcome to Edumark';
    const subtitle = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur ut impedit explicabo hic alias voluptate quibusdam quos, autem magnam voluptatum.';
    const btnText = 'browse our courses';

    return (
        <div className='center blog'>
            <BackgroundStyle className='center' background={background} height={height} >
                <Banner title={title} subtitle={subtitle} btnText={btnText} />
            </BackgroundStyle>
            <Header title='Featured courses' />
        </div>
    )
}

export default ErrorBoundary(Blog)
