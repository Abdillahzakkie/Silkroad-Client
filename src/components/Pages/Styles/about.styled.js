import styled from "styled-components";

export const AboutContainer = styled.div`
    background: var(--mainWhite);
    font-family: 'Trebuchet MS', 
        'Lucida Sans Unicode', 'Lucida Grande', 
        'Lucida Sans', Arial, sans-serif;

    & .container {
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: 400px;
        grid-row: 1rem 1.5rem;
        place-items: start;
        width: 100%;
    }
    & .container section {
        margin: 0;
        height: 100%;
        padding: 3rem;
        line-height: 1.7;
    }

    & .container section img {
        width: 100%;
        height: 100%;
        transition: var(--mainTransition);
    }

    & .container section img:hover {
        box-shadow: 5px 5px 5px rgba(0, 0, 0, .5);
    }

    & .container section h1,
    & .container section h5 {
        text-transform: uppercase;
        letter-spacing: var(--manSpacing);
        line-height: 2.5;
    }

    & .container section p { color: var(--lightGrey); }

    & .container section button{
        padding: 1rem  2.5rem;
        margin: 1rem 0;
        place-self: start;
        color: var(--white);
        background: linear-gradient(0deg, #8490ff 0%, #62bdfc 100%);
        text-transform: capitalize;
        letter-spacing: 3px;
        transition: var(--mainTransition);
    }
    & .container section button:hover{ box-shadow: 3px 3px 5px 0 rgba(0,0,0,.5); }


    /* Decription */
    & .description { 
        padding: 0 3rem 2rem;
        line-height: 1.75;
        color: var(--lightGrey);
    }

    @media (max-width: 1023px) {
        & .container { grid-template-rows: 450px; }

        @media (max-width: 767px) {
            & .container { grid-template-columns: 1fr; }
        }
    }
`