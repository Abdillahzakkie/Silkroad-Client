import React from 'react';
import { Link } from 'react-router-dom';
import './banner.css';

export function Banner({ title, subtitle, btnText, to }) {
    return (
        <div className='center banner'>
            <div className="center wrapper">
                <Link to={to ? to : '/'} className='name'>
                    {
                        title 
                            ? <h2 className='center mainSpacing'>{title}</h2>
                            : <h2 className='center mainSpacing'>Silk<span>road</span></h2>
                    }
                </Link>
                <div />
                <p>
                    {
                        subtitle 
                            ? subtitle 
                            : 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur ut impedit explicabo hic alias voluptate quibusdam quos, autem magnam voluptatum.'
                    }
                </p>
                <button className='mainSpacing'>
                    <Link to={to ? to : '/'}>{btnText}</Link>
                </button>
            </div>
        </div>
    )
}
