import React, { useState } from 'react';
import { isEmail } from "validator";
import { ErrorBoundary } from "../ErrorBoundary";
import { ipfs } from "../IPFS_config/ipfs.config";
import './Styles/contact.css';

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
        <div className="center about">
            <form className="center form-group" onSubmit={handleSubmit}>
                <div className="center">
                    <h1>Get in touch</h1>
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
            <div className="center container-sub">

            </div>
        </div>
    )
}

export default ErrorBoundary(Contract)
