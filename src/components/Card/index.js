import React from 'react';
import { Link } from 'react-router-dom';
import { ErrorBoundary } from '../ErrorBoundary';
import { Loading } from "../Loading";
import "./card.css";

export function Card({cardItem}) {
    if(!cardItem) return <Loading />

    const filteredProjects = cardItem.map(item => {
        return (
            <div key={item.id} className="center card">
                <img src={item.images[0]} alt={item.name} />
                <h2>
                    {/* maximum characters 20 words */}
                    {item.name}
                </h2>
                <Link to={`/products/${item.id}`}>
                    <button className="center features">features</button>
                </Link>
            </div>
        )
    });
    
    return <div className="center card-list">{filteredProjects}</div>
}
export default ErrorBoundary(Card)