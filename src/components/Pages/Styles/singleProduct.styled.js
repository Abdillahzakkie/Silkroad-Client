import styled from "styled-components";

export const SingleProductContainer = styled.div`
    /* Product image */
    & .products-image{
        grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
        grid-column-gap: 2.0rem;
        grid-row-gap: 1rem;
        grid-template-rows: minmax(200px, 1fr);
        margin: 2rem;
    }
    & .products-image .image { height: 200px; overflow: hidden; }
    & .products-image .image img{
        width: 100%;
        height: 100%;
        transition: var(--mainTransition);
    }
    & .products-image .image img:hover{ transform: scale(1.1); }


    /* Product container */
    & .product-container { grid-template-columns: repeat(2, 1fr); }
    & .product-container .product-info { height: 325px; }

    /* Product extras */
    & .extras{
        width: 95vw;
        height: auto;
        padding: 3rem;
        background: var(--mainWhite);
        margin: 2rem auto 3rem;
        transition: var(--mainTransition);
    }
    & .extras:hover{
        box-shadow: 2.5px 2.5px 10px 0 rgba(0, 0, 0, .5);
    }
    & .extras h3{ text-transform: capitalize; }
    & .extras ul li{
        display: inline;
        padding: 20px;
        word-spacing: 1.5px;
        letter-spacing: 1px;
        line-height: 2.5;
    }
    /* End Product extras */
    @media (max-width: 767px) {
        /* Product container */
        & .product-container { grid-template-columns: 1fr; }
        & .product-container .product-detail { grid-row: 2; }
        & .extras { width: 85vw; }

        & .extras ul li{
            display: block;
            padding: .75rem;
            word-spacing: 1.5px;
            letter-spacing: 1px;
            line-height: 1.4;
        }
    }
`