import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { ErrorBoundary } from "../ErrorBoundary";
import { Loading } from "../Loading";
import { web3Context } from "../Context";
import './Styles/cart.css';

function Cart() {
    const web3Consumer = useContext(web3Context);
    const { carts, removeCartItem, handleSubmit, handleQuantityChange } = web3Consumer;

    if(!carts) return <Loading />;

    const cartContainer = carts.map(cart => {
        const image = cart.images[0];
        const price = Number(cart.price).toFixed(2) * Number(cart.quantity).toFixed(2);

        return (
            <section key={cart.id} className='center cart-list-item'>
                <div className="center">
                    <img src={image} alt=""/>
                </div>
                <div className="center">
                    <p className='center'>{cart.name}</p>
                </div>
                <div className="center quantity">
                    {/* eslint-disable-next-line */}
                    <button onClick={() => handleQuantityChange(cart.id)("decrement")}>➖</button>
                    <span>{cart.quantity}</span>
                    {/* eslint-disable-next-line */}
                    <button onClick={() => handleQuantityChange(cart.id)("increment")}>➕</button>
                </div>
                <div className="center">
                    <p className='center'>${price}</p>
                </div>
                <div className="center">
                    {/* eslint-disable-next-line */}
                    <button type='button' className='btn' onClick={() => removeCartItem(cart.id)}>
                        ❌
                    </button>
                </div>
            </section>
        )
    });

    const priceList = carts.map(cart => Number(cart.price).toFixed(2) * Number(cart.quantity).toFixed(2));
    const totalPrice = priceList.reduce((curr, next) => {
        curr = Number(curr) + Number(next)
        return curr.toFixed(2);
    }, [0]);

    return (
        <div className='cart'>
            <div className="center wrapper">
                <header className="center">
                    <div className="center">
                        <h3 className='center'>image</h3>
                    </div>
                    <div className="center">
                        <h3 className='center'>product</h3>
                    </div>
                    <div className="center">
                        <h3 className='center'>quantity</h3>
                    </div>
                    <div className="center">
                        <h3 className='center'>total</h3>
                    </div>
                    <div className="center">
                        
                    </div>
                </header>
                <div className="center cart-container">{cartContainer}</div>
            </div>

            <div className="center container-fluid">
                    <section className="center">
                        <div className="center btns">
                            <button type='button' className='btn'>update cart</button>
                            <button type='button' className='btn continue-shopping'>
                                <Link to='/products'>continue shopping</Link>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <h2>Coupon</h2>
                            <p>Enter your coupon code if you have one.</p>
                            <input type="text" placeholder='Coupon Code' />
                            <button type='submit' className='btn'>Apply Coupon</button>
                        </form>
                    </section>

                    <section className="center">
                        <h2>cart total</h2>
                        <div className="center">
                            <div className="center price-info">
                                <p>Subtotal: </p>
                                <p>${totalPrice}</p>
                            </div>
                            <div className="center price-info">
                                <p>Total: </p>
                                <p>${totalPrice}</p>
                            </div>
                            <div className="center">
                                <button type='button' className='btn'>
                                    proceed to checkout
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
        </div>
    )
}

export default ErrorBoundary(Cart)
