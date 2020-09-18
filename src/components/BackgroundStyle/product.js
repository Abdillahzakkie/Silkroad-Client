import styled from 'styled-components';


export const ProductSection = styled.div`
    background: ${props => props.theme === 'dark' ? 'var(--lightGrey)' : 'var(--mainWhite)'};
    margin: 0 1.5rem 1rem;
    padding: 2rem;
    transition: var(--mainTransition);
    color: ${props => props.theme === 'dark' ? 'var(--white)' : 'inherit'};;

    &:hover {
        box-shadow: 2.5px 2.5px 10px 0 rgba(0, 0, 0, .5);
        box-shadow: 2.5px 2.5px 10px 0 ${props => props.theme === 'dark' ? 'var(--mainWhite)' : ' rgba(0, 0, 0, .5)'};
    }
`