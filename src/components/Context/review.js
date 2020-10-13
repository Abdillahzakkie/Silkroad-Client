import React, { Component, createContext } from 'react';
import data from '../../data/reviews';

const reviewContext = createContext();

class ReviewProvider extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            reviews: []
        }
    }
    
    componentDidMount() {
        const reviews = this.getReviews(data);
        this.setState({ reviews });
    }

    getReviews(data) {
        return data.map(item => {
            const image = item.image.url;
            return {...item, image};
        });
    }

    render() {
        return (
            <reviewContext.Provider value={
                {...this.state}
            }>
                {this.props.children}
            </reviewContext.Provider>
        )
    }
}

export { reviewContext, ReviewProvider };
