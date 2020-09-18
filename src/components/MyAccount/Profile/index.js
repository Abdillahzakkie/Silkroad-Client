import React, { useContext, useState } from 'react';
import { web3Context } from "../../Context";
import { helperContext } from "../../Context/helper";
import { ipfs } from "../../IPFS_config/ipfs.config";
import { ErrorBoundary } from "../../ErrorBoundary";
import './profile.css';

export function Profile() {
    const web3Consumer = useContext(web3Context);
    const helperConsumer = useContext(helperContext);
    const { userData, updateAccountDetails, products } = web3Consumer;
    const { encryptData } = helperConsumer;
    const { username, encoded, image } = userData;
    const { email, password } = encoded;


    const [newUsername, setNewUsername] = useState(username);
    const [newEmail, setNewEmail] = useState(email);
    const [newpassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    console.log(products)

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            if(!newUsername || !email) throw new Error('All input fields are marked as required!');
            
            if(newpassword !== confirmPassword) throw new Error('Password fields does not match'); 
            
            console.log('Submitting form response...');

            const currentPassword = newpassword ? newpassword : password;
            console.log('current', currentPassword);

            // Encrypt user data
            const encodedUserData = encryptData(JSON.stringify({
                email: newEmail,
                password: currentPassword,
                preference: {
                    ...encoded.preference
                }
            }), currentPassword);

            // Upload encrypted user data to IPFS
            const data = {
                username: newUsername,
                encoded: encodedUserData,
                image 
            }
            const response = await ipfs.add(JSON.stringify(data));
            const link = `https://ipfs.io/ipfs/${response.path}`;
            await updateAccountDetails(link);
            console.log(link)
            // history.push('/login');

        } catch (error) { console.log(error) }
    }

    return (
        <div className='center profile'>
            <form action="" className="center form-group" onSubmit={handleSubmit}>
                <div className="center">
                <h3>Account information</h3>
                </div>
                <div className="center">
                    <p>Username</p>
                    <input 
                        type="text" 
                        value={newUsername}
                        placeholder='New username'
                        onChange={e => setNewUsername(e.target.value)}
                    />
                </div>
                <div className="center">
                    <p>Email</p>
                    <input 
                        type="email" 
                        value={newEmail}
                        placeholder='New email address'
                        onChange={e => setNewEmail(e.target.value)}
                    />
                </div>
                <div className="center">
                    <p>Password</p>
                    <input 
                        type="password" 
                        vlaue={newpassword}
                        placeholder='New password'
                        onChange={e => setNewPassword(e.target.value)}
                    />
                    <input 
                        type="password" 
                        value={confirmPassword}
                        placeholder='Confirm password'
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div className="center">
                    <button type='submit' className='btn'>Save changes</button>
                </div>
            </form>
            <div className="center"></div>
        </div>
    )
}

export default ErrorBoundary(Profile)
