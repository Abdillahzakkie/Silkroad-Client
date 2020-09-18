import React from 'react';
import { ErrorBoundary } from "../ErrorBoundary";
import './filter.css';

export function Filter({ filterState }) {
    return (
        <div className={filterState ? "center filter-section show" : "center filter-section hide"}>
            <div className="container"></div>
        </div>
    )
}

export default ErrorBoundary(Filter)
