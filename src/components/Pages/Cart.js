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
        return (
            <section key={cart.id} className='center cart-list-item'>
                <div className="center">
                    <img src={image} alt=""/>
                </div>
                <div className="center">
                    <p className='center'>{cart.name}</p>
                </div>
                <div className="center">
                    <p className='center'>{cart.price} ether</p>
                </div>
                <div className="center quantity">
                    {/* <p className='center'>{cart.quantity}</p> */}
                    <button onClick={() => handleQuantityChange(cart.id)("increment")}>+</button>
                        <span>{1}</span>
                    <button onClick={() => handleQuantityChange(cart.id)("decrement")}>-</button>
                </div>
                <div className="center">
                    <p className='center'>$49.00</p>
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
                        <h3 className='center'>price</h3>
                    </div>
                    <div className="center">
                        <h3 className='center'>quantity</h3>
                    </div>
                    <div className="center">
                        <h3 className='center'>total</h3>
                    </div>
                    <div className="center">
                        <h3 className='center'>remove</h3>
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
                            <p>$230.00</p>
                        </div>
                    </section>
                </div>
        </div>
    )
}

export default ErrorBoundary(Cart)
