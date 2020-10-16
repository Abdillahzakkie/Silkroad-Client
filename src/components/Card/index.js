import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaCartPlus } from "react-icons/fa";
import { ErrorBoundary } from '../ErrorBoundary';
import { web3Context } from "../Context"
import { Loading } from "../Loading";
import { CardContainer } from "./card.styled.js";


export function Card({cardItem}) {
    const web3Consumer = useContext(web3Context);
    const { handleAddtoCart, inCart } = web3Consumer;
    if(!cardItem) return <Loading />;

    const filteredProduct = cardItem.map(item => {
        let isInCart = false;
        if(inCart(item.id)) isInCart = true;

        return (
            <div key={item.id} className={isInCart ? "center card inCart" : "center card"}>
                <img src={item.images[0]} alt={item.name} />
                <div className="center main">
                    <h2>
                        {/* maximum characters 20 characters */}
                        {item.name}
                    </h2>
                </div>
                <div className="center price-tag">
                    <small>${item.price}</small>
                </div>
                <Link to={`/products/${item.id}`}>
                    <button className="center features">features</button>
                </Link>
                <button 
                    type='button' 
                    className={isInCart ? "center icon inCart" : "center icon"}
                    onClick={() => handleAddtoCart(item.id)}
                >
                    <FaCartPlus />
                </button>
            </div>
        )
    });
    
    return <CardContainer className="center">{filteredProduct}</CardContainer>
}

export default ErrorBoundary(Card)