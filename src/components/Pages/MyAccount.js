import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import { web3Context } from "../Context";
import Profile from "../MyAccount/Profile";
import Trades from '../MyAccount/Trades';
import MyProduct from '../MyAccount/MyProducts';
import Notifications from "../MyAccount/Notifications";
import './Styles/my_account.css';


export function MyAccount() {
    const [viewState, setViewState] = useState('profile');

    const web3Consumer = useContext(web3Context);
    const { userData } = web3Consumer;
    const { username, image, encoded } = userData;
    const { email } = encoded;

    let Navlist = ['Profile', 'My products','Notifications', 'Trades'];
    Navlist = Navlist.map((item, i) => {
        return <li key={i} onClick={() => setViewState(() => item.toLowerCase())} className='mainSpacing'>{item}</li>;
    });

    return (
        <div className='center my_account'>
            <div className="sub-container">
                <div className="center user-detail">
                    <div className="center image">
                        <img src={image} alt="name"/>
                    </div>
                    <div className="center info">
                        <h3>{username}</h3>
                        <small>{email}</small>
                    </div>
                </div>
                <div className="center newProductBtn">
                    <Link to='/products/auth/new' className="btn">
                        <button>Create a product</button>
                    </Link>
                </div>

                <div className="center">
                    <ul className='center list-item'>{Navlist}</ul>
                </div>
            </div>
            <div className="center main-container">
                {
                    viewState === 'my products'
                        ? <MyProduct /> : viewState === 'trades' 
                        ? <Trades /> : viewState === 'notifications'
                        ? <Notifications /> : <Profile />
                }
            </div>
        </div>
    )
}

export default MyAccount
