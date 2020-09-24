import styled from 'styled-components';
import defaultBcg from '../../assets/blog/blog-home-banner.jpg';


export const BackgroundStyle = styled.div`
    background: linear-gradient(to right, rgba(0,0,0, .5), rgba(0,0,0, .5)),
        url(${props => props.background ? props.background : defaultBcg}) center/cover no-repeat;
    height: ${props => props.height ? props.height : 85}vh;
    width: 100vw;
    position: relative;
    grid-gap: .2rem 0;
    color: var(--mainWhite);

    & .email { transition: var(--mainTransition) }

    & .email:hover {
        color: var(--mainGreen);
        text-decoration: underline;
        cursor: pointer;
        letter-spacing: var(--mainSpacing);
    }
`

export const AppContainer = styled.div`
    overflow: hidden; 
    background-color: ${props => props.theme === 'dark' ? 'var(--lightGrey)' : 'var(--white)'}
`

export const NavbarContainer = styled.div`
    grid-template-columns: repeat(12, 1fr);
    background-color: ${props => props.theme === 'dark' ? 'var(--darkGrey)' : 'var(--mainWhite)'};
    color: ${props => props.theme !== 'dark' ? 'var(--darkGrey)' : 'var(--white)'};
    border-bottom: ${props => props.theme !== 'dark' && '1px solid var(--darkGrey)'};
    width: 100vw;
    height: auto;
    padding: 1.5em 1rem;
    z-index: 1;

    & .nav-list ul a,
    & .toggle {
        color: ${props => props.theme === 'dark' && 'var(--white)'};
    }

    @media (max-width: 991px) {
        & { padding: 0; }
    }
`

export const ProfilePhoto = styled.div`
    background: linear-gradient(to right, rgba(0,0,0, .5), rgba(0,0,0, .5)),
        url(${props => props.image ? props.image : defaultBcg}) center/cover no-repeat;
    width: 225px;
    height: 225px;
    margin: 45vh auto 0;
    border-radius: 100%;
    place-items: center;

    & .custom-button {
        width: 100px;
        height: 40px;
        padding: .75rem 0 0;
        border: 1px solid var(--darkGrey);
        background: transparent;
        color: var(--white);
        letter-spacing: var(--mainSpacing);
    }
`