import React, { useContext, useState, useEffect } from 'react';
import { web3Context } from "../Context";
import { ErrorBoundary } from "../ErrorBoundary";
import { Loading } from '../Loading';
import { Banner } from "../Banner";
import { BackgroundStyle } from "../BackgroundStyle";
import { ProductDetail } from "../Products/ProductDetail/ProductDetail";
import { ProductInfo } from "../Products/ProductInfo/ProductInfo";
import { SingleProductContainer } from "./Styles/singleProduct.styled";

function SingleProduct({ match }) {
    const [currProduct, setCurrProduct] = useState(null);
    const [seller, setSeller] = useState('');
    const web3Consumer = useContext(web3Context);
    const { isLoggedIn, loading, getSlug, getUserData, userData } = web3Consumer;

    useEffect(() => {
        (async () => {
            setCurrProduct(product);
    
            if(!currProduct) return;
            const link = (await getUserData(currProduct._seller))._hashID;
            const response = await (await fetch(link)).json();
            setSeller(() => response.username);
        })()
    })

    let product = getSlug(match.params.id);
    if(loading || !product) return <Loading />;
    let theme;
    if(isLoggedIn) theme = userData.encoded.preference.theme;

    const { name, price, images, quantity, description } = product;    

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
        </SingleProductContainer>
    )
}
export default ErrorBoundary(SingleProduct)