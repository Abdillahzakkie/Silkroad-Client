import React, { useState, useContext } from 'react';
import { NavLink, Link } from "react-router-dom";
import { FaAlignRight } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { web3Context } from "../Context";
import { NavbarContainer } from '../BackgroundStyle'
// import logo from '../../assets/logo.png';
import user from '../../assets/user_icon/male.jpg';
import './navbar.css';

export function Navbar({ theme }) {
    const [navOpen, setNavOpen] = useState(false);

    const web3Consumer = useContext(web3Context);
    const { isLoggedIn, userData } = web3Consumer;

    const _active = {
        'padding': '.75rem',
        'background': 'var(--mainGreen)',
        'borderTopLeftRadius': '1rem',
        'borderBottomRightRadius': '1rem'
    }
    let Navlist = ['', 'Products','Blog', 'About',  'Contact'];
    Navlist = Navlist.map((item, i) => {
        return (
            <NavLink 
                key={i} 
                exact
                activeStyle={_active} 
                to={item.replace('','/').toLowerCase()}
                className='mainSpacing'
            >
                {item === '' ? 'Home' : item}
            </NavLink>
        );
    });

    return (
        <NavbarContainer className='center navbar' theme={theme}>
            <div className="center nav-brand">
                <Link to='/'>
                    {/* <img src={logo} alt="Edumark"/> */}
                    <h2 className='mainSpacing'>
                        Silk<span>road</span>
                    </h2>
                </Link>
            </div>
            <div className={ navOpen ? 'center nav-list nav-list-mobile' : 'center nav-list' }>
                <ul>{Navlist}</ul>
            </div>
            <div className="center login">
                {/* <Link to={isLoggedIn ? '/my_account' : '/login'} className='center profile-picture'>
                    <img 
                        src={isLoggedIn ? userData.image : user} 
                        alt="user" 
                        className={isLoggedIn ? 'online': 'offline'}
                    />
                </Link> */}

                <Link to='/cart' className='center profile-picture'>
                    <AiOutlineShoppingCart className='icon' />
                </Link>

                <Link to={isLoggedIn ? '/products/auth/new' : '/login'} className='center profile-picture'>
                    <img 
                        src={isLoggedIn ? userData.image : user} 
                        alt="user" 
                        className={isLoggedIn ? 'online': 'offline'}
                    />
                </Link>
            </div>
            <div className="toggle">
                <FaAlignRight className='icon' onClick={() => setNavOpen(!navOpen)} />
            </div>
        </NavbarContainer>
    )
}