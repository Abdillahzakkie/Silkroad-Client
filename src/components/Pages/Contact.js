import React, { useState } from 'react';
import { FaBehance } from 'react-icons/fa';
import { isEmail } from "validator";
import { ErrorBoundary } from "../ErrorBoundary";
import { ipfs } from "../IPFS_config/ipfs.config";
import { ContactContainer } from './Styles/contact.styled.js';

export function Contract() {
    const [subject, setSubject] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [details, setDetail] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        if(!subject || !name || !email || !details) return;
        if(!isEmail(email)) return console.log(`${email} is not a valid email address`);

        const data = JSON.stringify({
            subject,
            name,
            email,
            details
        });

        const response = await ipfs.add(data);
        const hash = `https://ipfs.io/ipfs/${response.path}`;
        return hash
    }

    return (
        <ContactContainer className='center contact'>
            <div className="center my desc">
                {/* Address */}
                <div className="center container">
                    <div className="center icon-container">
                        <FaBehance className='icon' />
                    </div>
                    <div className="center">
                        <h2>binghamton, new york</h2>
                        <small>
                            4343 hinkle deegan lake road
                        </small>
                    </div>
                </div>
                {/* Telephone */}
                <div className="center container">
                    <div className="center icon-container">
                        <FaBehance className='icon' />
                    </div>
                    <div className="center">
                        <h2>+2349055092611</h2>
                        <small>
                            Mon to Fri 8am to 6 pm
                        </small>
                    </div>
                </div>
                {/* Email */}
                <div className="center container special">
                    <div className="center icon-container">
                        <FaBehance className='icon' />
                    </div>
                    <div className="center">
                        <h2>zakariyyaopeyemi@gmail.com</h2>
                        <small>
                            Send us your query anytime!
                        </small>
                    </div>
                </div>
            </div>

            <form className="center form-group" onSubmit={handleSubmit}>
                <div className="center">
                    <h2>Send us a message</h2>
                </div>
                <div className="center">
                    <input 
                        value={subject}
                        type="text" 
                        placeholder="Enter Subject" 
                        onChange={e => setSubject(e.target.value)}
                    />
                </div>
                <div className="center main">
                    <input 
                        value={name}
                        type="text" 
                        placeholder='Enter your name' 
                        onChange={e => setName(e.target.value)}
                    />
                    <input 
                        value={email}
                        type="email" 
                        placeholder='Enter email address' 
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="center">
                    <textarea 
                        cols="30" 
                        rows="10" 
                        value={details}
                        placeholder='Enter Message' 
                        onChange={e => setDetail(e.target.value)}
                    />
                </div>
                <div className="center">
                    <button type='submit' className='mainSpacing btn'>Send</button>
                </div>
            </form>
        </ContactContainer>
    )
}

export default ErrorBoundary(Contract)
