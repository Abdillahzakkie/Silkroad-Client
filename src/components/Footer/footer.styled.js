import styled from "styled-components";

export const FooterContainer = styled.div`
    grid-template-columns: 2fr 2fr 1fr;
    grid-template-rows: minmax(200px, auto);
    grid-gap: 2rem;
    background-color: ${props => props.theme !== 'dark' && 'var(--mainWhite)'};
    color: ${props => props.theme === 'dark' ? 'var(--white)' : 'var(--darktGrey)'};
    padding: 3rem;
    border-top: 1px solid var(--white);

    & .center {
        line-height: 2.5;
        height: 100px;
        width: 100%;
    }
    & .center h3 { text-transform: capitalize; }
    /* & .center small { color: var(--lightGrey); } */

    & .form-control { margin: 1rem 0 0; }
    & .form-control input,
    & .form-control button {
        height: 50px;
        padding: 1rem;
        letter-spacing: var(--letterSpacing);
        font-family: cursive;
    }
    & .form-control input { width: 75%; }
    & .form-control input::placeholder { text-transform: capitalize; }

    & .form-control button {
        background: var(--mainGreen);
        color: var(--white);
        margin: -1px 0 0 -1px;
    }
    & .icon { margin: 0 1rem 0 0; font-size: 1.1rem; }
    & .icon:hover { color: var(--lightBlue); }

    @media (max-width: 1000px) {
        & { grid-template-columns: repeat(2, 1fr); }
    
        @media (max-width: 767px) {
            & { grid-template-columns: 1fr; }
            & .center { height: auto; }
        }

        @media (max-width: 482px) {
            & .form-control { display: block; }
            & .form-control input { width: 100%; }
            & .form-control button { 
                margin: .25rem 0 0;
                width: 40%;
            }
        }
    }
`