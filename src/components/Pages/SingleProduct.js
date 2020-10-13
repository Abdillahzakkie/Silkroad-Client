import React, { useContext } from 'react';
import { web3Context } from "../Context";
import { reviewContext } from "../Context/review";
import { ErrorBoundary } from "../ErrorBoundary";
import { Loading } from '../Loading';
import { Banner } from "../Banner";
import { BackgroundStyle } from "../BackgroundStyle";
import { ProductDetail } from "../Products/ProductDetail/ProductDetail";
import { ProductInfo } from "../Products/ProductInfo/ProductInfo";
import Review from "../Review";
import { SingleProductContainer } from "./Styles/singleProduct.styled";
import Error from "./Error";

export function SingleProduct({ match }) {
    const web3Consumer = useContext(web3Context);
    const reviewConsumer = useContext(reviewContext);

    const { isLoggedIn, loading, getSlug, userData } = web3Consumer;
    const { reviews } = reviewConsumer;

    let product = getSlug(match.params.id);
    if(loading) return <Loading />;
    if(!product) return <Error />;

    let theme;
    if(isLoggedIn) theme = userData.encoded.preference.theme;

    const { name, price, images, quantity, description, seller } = product;    

    const [background] = images;
    const ProductImage = images.map((item, i) => {
        return (
            <div className='image' key={i}>
                <img src={item} alt={name} />
            </div>
        )
    });

    return (
        <SingleProductContainer className='single-product'>
            <BackgroundStyle className='center' background={background} >
                <Banner 
                    title={name} 
                    subtitle={seller.toUpperCase()} 
                    btnText='buy now' to={isLoggedIn ? '/checkout' : '/login'} 
                />
            </BackgroundStyle>
            <section className='center products-image'>{ProductImage}</section>
            <section className='center product-container'>
                <ProductDetail description={description} theme={theme} />
                <ProductInfo 
                    seller={seller} 
                    name={name} 
                    price={price} 
                    quantity={quantity} 
                    isLoggedIn={isLoggedIn}
                    theme={theme}
                />
            </section> 
            <Review reviewItems={reviews} />
        </SingleProductContainer>
    )
}
export default ErrorBoundary(SingleProduct)