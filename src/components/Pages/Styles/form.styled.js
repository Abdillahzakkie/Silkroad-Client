import styled from "styled-components";
import defaultFormBackground from '../../../assets/blog/blog-home-banner.jpg';

export const FormContainer = styled.div`
    background: linear-gradient(to right, rgba(0,0,0,.5), rgba(0,0,0,.5)),
    url(${props => props.background ? props.background : defaultFormBackground}) center/cover no-repeat;
    width: 100vw;

    & .form-group {
        width: 40%;
        /* background: rgba(75, 56, 210, .8); */
        background: var(--lightGrey);
        color: var(--white);
        height: auto;
        padding: 2rem;
        margin: 2rem auto;
    }

    & .form-group .brand {
        margin: auto;
        place-self: center;
        text-align: center;
    }

    & .form-group .center,
    & .form-group .center input {
        width: 100%;
        margin: .5rem 0;
        font-family: cursive;
        letter-spacing: var(--letterSpacing);
    }
    & .form-group .center button,
    & .form-group .center input,
    & .form-group .center textarea,
    & .form-group .center select {
        height: 45px;
        padding: .5rem 1rem;
        letter-spacing: var(--letterSpacing);
        border-radius: .25rem;
    }

    & .form-group .center textarea { height: 200px; }
    & .form-group .center button:not(.custom-type-btn) { 
        background: var(--mainGreen); 
        color: var(--white); 
        transition: var(--mainTransition);
        letter-spacing: var(--mainSpacing);
    }

    & .form-group .center button:hover { 
        background: transparent;
        color: var(--mainGreen);
        border: .09rem solid var(--mainGreen);
    }

    & .form-group .center p { font-size: .8rem; text-align: center; }
    & .form-group .center p a { margin: 0 0 0 7px; }


    /* Set Custom type */
    & .form-group .center .custom-type-btn, .custom-button {
        place-self: end;
        width: 150px;
        background: var(--mainGreen);
        transition: var(--mainTransition);
        margin: .5rem 0 0;
        color: var(--mainWhite);
    }

    & .form-group .center .custom-type-btn:hover {
        background: transparent;
        border: .09rem solid var(--mainGreen);
        color: var(--mainWhite);
    }

    /* End Custom type */

    /* Form upload button */
    & .form-group .center div .custom-button {
        background: transparent;
        color: var(--white);
        border: .09rem solid var(--mainGreen);
        padding: .2rem .4rem;
        font-size: .7rem;
        margin: 0;
    }

    & .form-group .center div .custom-button:hover {
        background: var(--mainGreen);
        border: .09rem solid var(--white);
        color: var(--white);
    }
    & .form-group .center .custom-text { margin: 0 0 0 1rem; }
    /* End Form upload buttons */

    & .form-group .main {
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 0 1rem;
    }


    @media (max-width: 767px) {
        & .form-group { width: 70%; }

        & .form-group .main {
            grid-template-columns: 1fr;
            grid-gap: 1rem 0;
        }
        @media (max-width: 425px) {
            & .form-group { width: 90%; }
        }
    }
`