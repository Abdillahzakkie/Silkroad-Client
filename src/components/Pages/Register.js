import React, { useState, useContext } from 'react';
import { Link, withRouter } from "react-router-dom";
import { ipfs } from "../IPFS_config/ipfs.config";
import { web3Context } from "../Context";
import { helperContext } from "../Context/helper";
import { ErrorBoundary } from "../ErrorBoundary";
import { FormContainer } from "./Styles/form.styled";
import { handleFileUpload } from "../Helper/handleFileUpload";

export function Register({ history }) {
    const [username, setUsername] =  useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const web3Consumer = useContext(web3Context);
    const helperConsumer = useContext(helperContext);

    const { createNewAccount }= web3Consumer;
    const { encryptData, buffer, setBuffer } = helperConsumer;

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            if(!username || !email || !password || !confirmPassword) 
                throw new Error('All input fields are marked as required!');
            if(!buffer) return;

            
            if(password !== confirmPassword) throw new Error('Password fields does not match');   
            
            console.log('Submitting form response...');
            
            // Encrypt user data
            const encodedUserData = encryptData(JSON.stringify({
                email,
                preference: {
                    theme: 'dark'
                }
            }), password);
            
            // Upload encrypted user data to IPFS
            const imageResponse = await ipfs.add(buffer);
            const data = {
                username,
                encoded: encodedUserData,
                image: `https://ipfs.io/ipfs/${imageResponse.path}` 
            }
            const response = await ipfs.add(JSON.stringify(data));
            const link = `https://ipfs.io/ipfs/${response.path}`;
            await createNewAccount(link);
            history.push('/login');

        } catch (error) { console.log(error) }
    }

    return (
        <FormContainer className='center'>
            <form className="center form-group" onSubmit={handleSubmit}>
                <div className="brand">
                    <h2 className="center">Create new Account</h2>
                </div>
                <div className="center">
                    <label htmlFor="username">Username:</label>
                    <input 
                        value={username}
                        type="text" 
                        id='username' 
                        placeholder='Username' 
                        onChange={e => setUsername((e.target.value).toLowerCase())}
                    />
                </div>
                <div className="center">
                    <label htmlFor="email">Email:</label>
                    <input 
                        value={email}
                        type="email" 
                        id='email' 
                        placeholder='Email' 
                        onChange={e => setEmail((e.target.value).toLowerCase())}
                    />
                </div>
                <div className="center">
                    <label htmlFor="password">Password:</label>
                    <input 
                        value={password}
                        type="password" 
                        id='password' 
                        placeholder='Enter password' 
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className="center">
                    <label htmlFor="confirmPassword">Confirm password:</label>
                    <input 
                        value={confirmPassword}
                        type="password" 
                        id='confirmPassword' 
                        placeholder='Confirm password' 
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div className="center">
                    <div>
                        <input type="file" className='real-btn' hidden />
                        <button type='button' className='custom-button' onClick={() => handleFileUpload(setBuffer)}>
                            CHOOSE A FILE
                        </button>
                        <small className='custom-text'>No file choosen yet</small>
                    </div>
                </div>
                <div className="center">
                    <button type='submit' className="btn">Register</button>
                </div>
                <div className="center">
                    <p>
                        Already have an account? 
                        <Link to='/login'>Login</Link>
                    </p>
                </div>
            </form>
        </FormContainer>
    )
}
export default ErrorBoundary(withRouter(Register))