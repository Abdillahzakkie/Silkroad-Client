import styled from "styled-components";
export const HeaderContainer = styled.div`
    /* grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); */
    grid-template-columns: repeat(12, 1fr);
    margin: 0 auto;
    padding: 1.75rem 3rem;
    width: 100vw;
    background-color: ${props => props.theme !== 'dark' && 'var(--mainWhite)'};
    color: ${props => props.theme === 'dark' ? 'var(--mainWhite)' : 'var(--darkGrey)'};
    border-bottom: ${props => props.theme === 'dark' && '1px solid var(--mainWhite)'};
    place-items: start;
    text-transform: capitalize;
    grid-gap: 1rem 1.5rem;

    & .center:nth-child(odd) { grid-column: 1/5; }
    & .center:nth-child(odd),
    & .main {
        margin: auto 0;
    }
    & .main {
        grid-template-columns: repeat(4, 1fr);
        grid-column: 5/13;
        width: 100%;
        margin: auto;
    }

    & .main select {
        grid-column: 1/4;
        width: 100%;
        height: 40px;
    }

    & .main .icon {
        place-self: center;
        font-size: 1.5rem;
        cursor: pointer;
    }


    @media (max-width: 767px) {
        & .center:nth-child(odd) { grid-column: 1/6; }
        & .main { grid-column: 6/13; }

        @media (max-width: 531px) {
            & { padding: 1.5rem; }

            & .center:nth-child(odd),
            & .main {
                grid-column: 1/13;
            }
            & .center:nth-child(odd) { place-self: center; }
            & .main { grid-row: 2; }
            & .main .icon { place-self: end; }
        }
    }
`