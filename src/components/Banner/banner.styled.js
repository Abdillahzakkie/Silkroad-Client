import styled from "styled-components";

export const BannerContainer = styled.div`
    width: 100%;
    height: 55%;
    margin: auto 0;

    & .wrapper {
        width: 50%;
        height: 90%;
        margin: 0 auto;
        padding: 1rem 1.5rem 1rem;
        background: rgba(128, 128, 128, .9);
        color: var(--white);
    }
    & .wrapper h2,
    & .wrapper p,
    & .wrapper button {
        margin: auto;
    }

    & .wrapper h2 {
        display: inline-block;
        text-align: center;
        width: 100%;
    }

    & .wrapper h2 span { color: var(--red); }

    & .wrapper p {
        font-size: 1.2rem;
        text-align: center;
        margin-bottom: 1rem;
        margin: 1rem 0 0;
    }

    & .wrapper button {
        background: #04D2C8;
        color: var(--white);
        width: 200px;
        padding: 1rem 0;
        text-transform: capitalize;
        border-radius: 2rem;
        border: .1rem solid #04D2C8;
        transition: var(--mainTransition);
    }

    & .wrapper button:hover {
        background: transparent;
        color: #04D2C8;
        border: .1rem solid #04D2C8;
    }

    & .wrapper > div {
        width: 200px;
        height: 2.0px;
        place-self: center;
        background: var(--red);
    }

    @media (max-width: 767px) {
        & { height: auto; }
        & .wrapper {
            width: 100%;
            height: 95%;
            line-height: 2;
            margin: auto;
        }
        & .wrapper p { line-height: 1.5; }
        & .wrapper button {
            margin: 1rem auto;
        }

        @media (min-width: 500px) {
            & .wrapper { width: 80%; }
        }
    }
`