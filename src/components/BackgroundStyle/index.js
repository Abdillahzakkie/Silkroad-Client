import styled from 'styled-components';
import defaultBcg from '../../assets/blog/blog-home-banner.jpg';
import defaultFormBackground from '../../assets/blog/blog-home-banner.jpg';


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
    background-color: ${props => props.theme === 'dark' ? 'var(--darkGrey)' : 'var(--white)'}
`

export const NavbarContainer = styled.div`
    grid-template-columns: repeat(12, 1fr);
    // background: linear-gradient(to left, #6610f2,#6F42B7);
    color: var(--white);
    background: var(--darkGrey);
    // color: var(--darkGrey);
    width: 100vw;
    height: auto;
    padding: 1.5em 1rem;
    z-index: 1;

    @media (max-width: 991px) {
        & { padding: 0; }
    }
`

export const HeaderContainer = styled.div`
    /* grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); */
    grid-template-columns: repeat(12, 1fr);
    margin: 0 auto;
    padding: 1.5rem 3rem;
    width: 100vw;
    background-color: ${props => props.theme === 'dark' ? 'var(--darkGrey)' : 'var(--mainWhite)'};
    color: ${props => props.theme === 'dark' ? 'var(--mainWhite)' : 'var(--darkGrey)'};
    border: ${props => props.theme === 'dark' ? '1px solid var(--mainWhite)' : 'none'};
    place-items: start;
    text-transform: capitalize;
    grid-gap: 1rem 1.5rem;
`

export const FormContainer = styled.div`
    background: linear-gradient(to right, rgba(0,0,0,.5), rgba(0,0,0,.5)),
        url(${props => props.background ? props.background : defaultFormBackground}) center/cover no-repeat;
    width: 100vw;
`

export const AboutContainer = styled.div`
    background-color: ${props => props.theme === 'dark' ? 'var(--darkGrey)' : 'var(--mainWhite)'};
    color: ${props => props.theme === 'dark' ? 'var(--white)' : 'inherit'};
    border-bottom: 2px solid var(--white);
    & .form-group {
        padding: 2rem 0;
        background: inherit;
    }
`