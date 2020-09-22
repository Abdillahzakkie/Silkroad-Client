import React from 'react';
import { Link } from 'react-router-dom';
import { ErrorBoundary } from '../ErrorBoundary';
import { Loading } from "../Loading";
import { CardContainer } from "./card.styled.js";

export function Card({cardItem}) {
    if(!cardItem) return <Loading />

    const filteredProjects = cardItem.map(item => {
        return (
            <div key={item.id} className="center card">
                <img src={item.images[0]} alt={item.name} />
                <h2>
                    {/* maximum characters 20 characters */}
                    {item.name}
                </h2>
                <Link to={`/products/${item.id}`}>
                    <button className="center features">features</button>
                </Link>
            </div>
        )
    });
    
    return <CardContainer className="center">{filteredProjects}</CardContainer>
}
export default ErrorBoundary(Card)