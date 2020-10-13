import React from 'react';
import { ErrorBoundary } from "../ErrorBoundary";
import { Loading } from '../Loading';
import "./review.css";

const Review = ({ reviewItems }) => {
    if(!reviewItems) return <Loading />;
    
    const reviewList = reviewItems.map(item => {
        return (
            <div className='center review' key={item.id}>
                <div className="center wrapper">
                    <div className="review-img">
                        <img src={item.image} alt={item.name} />
                    </div>
                    <h4>{item.name}</h4>
                </div>
                <div className="center description">
                    <p>{item.comment}</p>
                </div>
            </div>
        )
    });

    return <div className='center reviews-container'>{reviewList}</div>;
}

export default ErrorBoundary(Review);
