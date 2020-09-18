import React, { useState, useContext, useEffect } from 'react';
import { Link, withRouter } from "react-router-dom";
import { web3Context } from "../Context";
import { helperContext } from "../Context/helper";
import { ErrorBoundary } from "../ErrorBoundary";
import { FormContainer } from "../BackgroundStyle";
import './Styles/form.css';

export function Login({ history }) {
    const [password, setPassword] = useState('');
    const [link, setLink] = useState(null);

    const web3Consumer = useContext(web3Context);
    const helperConsumer = useContext(helperContext);
    const { decryptData } = helperConsumer;
    const { loading, login, isLoggedIn, getUserData } = web3Consumer;

    useEffect(() => {
       (async () => {
            try {
                if(loading) return;
                
                let response = await getUserData();
                response = response._hashID;
                setLink(() => response);
                if(isLoggedIn) console.log(isLoggedIn);

            } catch (error) { 
                // console.log(error.message)
                console.log('User does not exit')
            }
       })();

    }, [loading, getUserData, isLoggedIn]);

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            if(!password) throw new Error('Input field can not be empty');
            if(!link) throw new Error('User does not exist');
            /**
                 * Fetch user credentials from Blockchain and IPFS and decrypt 
                 * encrypted parts with user's password 
             * **/

            const data = await (await fetch(link)).json();
            const { encoded  } = data;
            let decodedUserData;
            try {
                decodedUserData = {
                    ...decryptData(encoded, password),
                    password
                };
            } catch (error) {
                throw new Error('Invalid password')
            }

            login({...data, encoded: decodedUserData});
            // console.log({...data, encoded: decodedUserData});
            history.push('/my_account');
            
        } catch (error) { console.log(error) }
    }

    return (
        <FormContainer className='center form-container'>
            <form className="center form-group" onSubmit={handleSubmit}>
                <div className="brand">
                    <h2 className="center">Welcome back General</h2>
                </div>
                <div className="center">
                    <input 
                        value={password}
                        type="password" 
                        id='password' 
                        placeholder='Enter password' 
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className="center">
                    <button type='submit' className="btn">Sign in</button>
                </div>
                <div className="center">
                    <p> Don't have an account? 
                        <Link to='/register'>Sign Up</Link>
                    </p>
                </div>
            </form>
        </FormContainer>
    )
}
export default ErrorBoundary(withRouter(Login))