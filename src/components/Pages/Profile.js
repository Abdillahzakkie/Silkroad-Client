import React, { useContext, useState } from 'react';
import { ErrorBoundary } from "../ErrorBoundary";
import { web3Context } from "../Context";
import { BackgroundStyle } from "../BackgroundStyle";
import { ProfilePhoto } from "../BackgroundStyle/profile";
import ProfileTimeline from "../Profile/ProfileTimeline";
import ProfileEdit from "../Profile/ProfileEdit";
import ProfileSetting from "../Profile/ProfileSetting";
import './Styles/profile.css';

export function Profile() {
    const [viewState, setViewState] = useState('timeline');
    const web3Consumer = useContext(web3Context);
    const { userData, products } = web3Consumer;
    const { username, image, encoded } = userData;
    const { email } = encoded;
    console.log(userData)
    console.log('products', products)
    return (
        <div className='center profile'>
            <BackgroundStyle className='center' height={50}>
                <ProfilePhoto image={image} className='online' />
                <div className="center background" />
                <h3 className='center'>{username}</h3>
                <p className='center email'>{email}</p>
            </BackgroundStyle>
            <div className="center btns">
                <button className='btn' onClick={() => setViewState('timeline')}>Timeline</button>
                <button className='btn' onClick={() => setViewState('edit')}>my product</button>
                <button className='btn' onClick={() => setViewState('settings')}>settings</button>
            </div>
            <div className="center container">
                {
                    viewState === 'timeline' 
                        ? <ProfileTimeline />
                        : viewState === 'edit'
                        ? <ProfileEdit />
                        : <ProfileSetting />
                }
            </div>
        </div>
    )
}

export default ErrorBoundary(Profile)
