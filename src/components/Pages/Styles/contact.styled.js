import styled from 'styled-components';

export const ContactContainer = styled.div`
    background: var(--mainWhite);
    grid-template-columns: repeat(2, 1fr);
    padding: 3rem;
    grid-gap: 1rem 3rem;
    
    /* contact desc */
    & .desc { grid-gap: 1.5rem 0; }
    & .desc .container {
        grid-template-columns: repeat(12, 1fr);
        background: var(--white);
        padding: 2rem;
        width: 100%;
    }
    & .desc .container .icon-container { 
        grid-column: 1/2; 
        place-items: center;
    }
    & .desc .container .icon-container .icon { 
        font-size: 1.75rem;
        color: var(--lightBlue);
    }
    & .desc .container .center:nth-child(even) {
        grid-column: 2/13;
        text-transform: capitalize;
        letter-spacing: var(--letterSpacing);
        line-height: 1.5;
        padding: 0 0 0 1rem;
    }
    & .desc .center:nth-child(even) h2 { font-size: 1.1rem; }

    & .desc .container 
    .center:nth-child(even) small { color: var(--lightGrey); }

    & .desc .special h2 { text-transform: none; }


    /* Form-control */
    & .form-group { grid-gap: 1rem 0; font-family: cursive; }

    & .form-group,
    & .form-group .center,
    & .form-group .center input,
    & .form-group .center .btn { 
        width: 100%;
    }
    & .form-group .center h2 { margin: 0 auto; }
    & .form-group .center input {
        height: 45px;
        margin: 0 auto;
    }
    & .form-group .center input,
    & .form-group .center textarea {
        padding: .5rem;
    }

    & .form-group .main {
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 0 1rem;
    }

    & .form-group .center .btn {
        height: 50px;
        padding: .5rem;
        background: transparent;
        border: .1rem solid var(--mainGreen);
        color: var(--mainGreen);
        border-radius: .25rem;
        transition: var(--mainTransition);
    }
    & .form-group .center .btn:hover {
        background: var(--mainGreen);
        color: var(--white);
    }

    @media (max-width: 767px) {
        & { grid-template-columns: 1fr; }

        & .desc { width: auto; margin: auto; }

        /* Form-control */
        & .form-group { padding: 1rem; }
        & .form-group .center { padding: 0 1rem; }

        & .form-group .center h2 { font-size: 1.5rem; }

        & .form-group .main {
            grid-template-columns: 1fr;
            grid-gap: 1rem 0;
        }

        @media (max-width: 374px) {
            & .desc .container .icon-container,
            & .desc .container .center:nth-child(even) {
                grid-column: 1/13;
            }
            & .desc .container .icon-container { grid-row: 1; }
            & .desc .container .center:nth-child(even) {
                grid-row: 2;
                padding: 0;
                line-height: 1.75;
                place-items: center;
            }
        }
    }

    @media (max-width: 1023px) {
        & { padding: 2rem 1rem; }
        & .desc .container .center h2 { font-size: .8rem; }
    }
`