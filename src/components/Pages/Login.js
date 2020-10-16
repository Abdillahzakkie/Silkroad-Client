import React, { useState, useContext, useEffect } from 'react';
import { Link, withRouter } from "react-router-dom";
import { web3Context } from "../Context";
import { helperContext } from "../Context/helper";
import { ErrorBoundary } from "../ErrorBoundary";
import { FormContainer } from "./Styles/form.styled";

export function Login({ history }) {
    const [password, setPassword] = useState('');
    const [link, setLink] = useState(null);

    const web3Consumer = useContext(web3Context);
    const helperConsumer = useContext(helperContext);
    const { decryptData } = helperConsumer;
    const { loading, login, isLoggedIn, findUserByAddress, user } = web3Consumer;

    useEffect(() => {
       (async () => {
            try {
                if(loading) return;
                if(isLoggedIn) history.push('/my_account');
                let response = await findUserByAddress(user);
                response = response.details;
                setLink(() => response);
            } catch (error) { console.log('User does not exit') }
       })();
    }, [history, loading, findUserByAddress, isLoggedIn, user]);

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
            let userData = {...data, encoded: decodedUserData};
            login(userData);
            localStorage.setItem('isLoggedIn', JSON.stringify(true))
            localStorage.setItem('userData', JSON.stringify(userData));

            history.push('/my_account');
            
        } catch (error) { console.log(error) }
    }

    return (
        <FormContainer className='center'>
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