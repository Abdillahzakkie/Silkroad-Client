import React, { useState } from 'react';
import { FaBehance } from "react-icons/fa";
import "./footer.css";

export function Footer() {
    const [email, setEmail] = useState('');
    const getYear = new Date().getFullYear();
    
    return (
        <>
            <div className='center footer'>
                <section className="center">
                    <h3>about me</h3>
                    <small>
                        We have tested a number of registry fix and clean utilities and present our top 3 list on our site for your convenience.
                    </small>
                    <small>
                        copyright &copy; {getYear} all rights reserved | 
                        Designed & built with 💖 by DragonLord
                    </small>
                </section>
                <section className="center">
                    <h3>newsletter</h3>
                    <small>
                        Stay up to date with our latest trends
                    </small>
                    <form action="" className='form-control'>
                        <input type="email" 
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder='enter email address'
                        />
                        <button type='submit' className='my'>
                            <span role='img'>➡</span>
                        </button>
                    </form>
                </section>
                <section className="center">
                    <h3>follow me</h3>
                    <small>Let us be social</small>
                    <span>
                        <a href="https://facebook.com" target='_blank' rel='noopener noreferrer' className='icon'>
                            <FaBehance />
                        </a>
                        <a href="https://facebook.com" target='_blank' rel='noopener noreferrer' className='icon'>
                            <FaBehance />
                        </a>
                        <a href="https://facebook.com" target='_blank' rel='noopener noreferrer' className='icon'>
                            <FaBehance />
                        </a>
                        <a href="https://facebook.com" target='_blank' rel='noopener noreferrer' className='icon'>
                            <FaBehance />
                        </a>
                    </span>
                </section>
            </div>
        </>
    )
}