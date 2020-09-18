import React, { useContext } from 'react';
import { web3Context } from "../Context";
import { HeaderContainer } from "../BackgroundStyle";
import './header.css';

export function Header({ children, title }) {
    const web3Consumer = useContext(web3Context);
    const { userData, isLoggedIn } = web3Consumer;
    let theme;
    if(isLoggedIn) theme = userData.encoded.preference.theme;

    return (
        <HeaderContainer className='center header' theme={theme}>
            <div className="center">
                <h2>{title}</h2>
            </div>
            <div className="center main">
                {children}
            </div>
        </HeaderContainer>
    )
}