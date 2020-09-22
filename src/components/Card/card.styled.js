import styled from "styled-components";

export const CardContainer = styled.div`
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 2rem;
    margin: 2rem 0;
    padding: 0 2rem;

    & .card {
        height: 250px;
        background: var(--mainWhite);
        position: relative;
        transition: all 500ms ease-in-out;
        overflow: hidden;
        box-shadow: 3px 3px 5px 1.5px #00000080;
    }
    & .card:hover { box-shadow: 7px 3px 7px 0 #0000004d; }

    & .card img{
        width: 100%;
        min-width: 250px;
        height: 200px;
        transition: var(--mainTransition);
        overflow: hidden;
    }
    & .card:hover img{ height: 250px; opacity: .75; }
    & .card h2{
        text-transform: uppercase;
        font-size: 1.0rem;
        padding: .5rem 1rem;
        place-self: center;
        margin: auto 0;
    }

    /* Features */
    & .card .features{
        opacity: 0;
        position: absolute;
        top: 42.5%;
        left: 35%;
        padding: .75rem 1rem;
        background: transparent;
        border: .11rem solid var(--mainWhite);
        color: var(--mainWhite);
        transition: var(--mainTransition);
        text-transform: capitalize;
        cursor: pointer;
    }
    & .card:hover .features{ opacity: 1; }


    @media (max-width: 599px) {
        & { padding: 0 1rem; grid-gap: .5rem 2rem; }
        & .card { margin: 0 auto 2rem; padding: 0; }

        @media (min-width: 321px) and (max-width: 375px) {
            & .card .features{ left: 37.5%; }
        }
        @media (min-width: 376px) and (max-width: 539px) {
            & .card .features{ left: 40%; }
        }
    }
`