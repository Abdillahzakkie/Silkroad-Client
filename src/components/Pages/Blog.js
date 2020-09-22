import React from 'react';
import { ErrorBoundary } from "../ErrorBoundary";
import './Styles/blog.css';

export function Blog() {

    return (
        <div className='center blog'>
            Hello from blog page
        </div>
    )
}

export default ErrorBoundary(Blog)
