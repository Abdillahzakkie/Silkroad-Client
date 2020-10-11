import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { ErrorBoundary } from "../ErrorBoundary";
import { Loading } from "../Loading";
import { productContext } from "../Context/product";
import './Styles/cart.css';

function Cart() {
    const productConsumer = useContext(productContext);
    const { carts, removeCartItem, handleSubmit, handleQuantityChange } = productConsumer;
    if(!carts) return <Loading />;
    
    const cartContainer = carts.map(cart => {
        const image = cart.images[0];
        const price = cart.price * cart.quantity;
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
                    <p className='center'>${Math.round(price)}</p>
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

    const priceList = carts.map(cart => Math.round(cart.price * cart.quantity));
    const totalPrice = priceList.reduce((curr, next) => {
        curr = Number(curr) + Number(next)
        return curr
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
                        <div className="center">
                            <h2>cart total</h2>
                        </div>
                        <div className="center">
                            <p>Subtotal</p>
                            <p>${totalPrice}</p>
                        </div>
                    </section>
                </div>
        </div>
    )
}

export default ErrorBoundary(Cart)
