import styled from "styled-components";

export const ProductSection = styled.section`
    background: ${props => props.theme === 'dark' ? 'var(--lightGrey)' : 'var(--mainWhite)'};
    margin: 0 0 1rem;
    padding: 2rem 1rem;
    transition: var(--mainTransition);
    color: ${props => props.theme === 'dark' ? 'var(--white)' : 'inherit'};
    overflow: hidden;
    word-wrap: break-word;

    &:hover {
        box-shadow: 2.5px 2.5px 10px 0 rgba(0, 0, 0, .5);
        box-shadow: 2.5px 2.5px 10px 0 
            ${props => props.theme === 'dark' ? 'var(--mainWhite)' : ' rgba(0, 0, 0, .5)'};
    }

    & h2 {
        text-transform: capitalize;
        line-height: 2;
    }
    & p {
        text-transform: lowercase;
        line-height: 1.75;
        letter-spacing: .02rem;
        word-spacing: .05rem;
    }
    
    /* Checkout button */
    & .product-checkout{
        border: .1rem solid var(--mainGreen);
        padding: 1rem 1.5rem;
        line-height: 5;
        border-radius: 5rem;
        text-transform: capitalize;
        letter-spacing: .1rem;
        transition: var(--mainTransition);
    }
    
    & .product-checkout:hover{
        background: var(--mainGreen);
        color: var(--white);
    }
`