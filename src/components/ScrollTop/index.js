import React from 'react';
import './scrollTop.css';

export function ScrollTop() {
    return (
        <div className='center scrollTop scroll-link' 
            onClick={() => window.scrollTo({top: 0, left: 0})} >
            <span>⬆</span>
        </div>
    )
}