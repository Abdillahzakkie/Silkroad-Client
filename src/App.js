import React, { useContext } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { web3Context } from "./components/Context";
import './App.css';
import './components/Pages/Styles/scrollbar_style.css';
import { AppContainer } from "./components/BackgroundStyle";

import { Navbar } from './components/Navbar';
import { ScrollTop } from "./components/ScrollTop";
import { handleEffect } from "./components/Helper/handleEffect";
import { Footer } from "./components/Footer";

import Home from "./components/Pages/Home";
import About from './components/Pages/About';
import Blog from './components/Pages/Blog';
import SingleProduct from './components/Pages/SingleProduct';
import Product from "./components/Pages/Product";
import Contact from "./components/Pages/Contact";
import Login from "./components/Pages/Login";
import Register from "./components/Pages/Register";
import Profile from "./components/Pages/Profile";
import CreateNewProduct from "./components/Pages/CreateNewProduct";
import Cart from "./components/Pages/Cart";
import Error from "./components/Pages/Error";

export function App() {
  const web3Consumer = useContext(web3Context);
  const { isLoggedIn, userData } = web3Consumer;
  let theme;
  if(isLoggedIn) theme = userData.encoded.preference.theme;
  return (
    <AppContainer theme={theme}>
      <Navbar theme={theme} />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/products' component={Product} />
        <Route exact path='/about' component={About} />
        <Route exact path='/blog' component={Blog} />
        <Route exact path='/contact' component={Contact} />
        <Route exact path='/products/auth/new' component={CreateNewProduct} />
        <Route exact path='/products/:id' component={SingleProduct} />
        <Route exact path='/cart' component={Cart} />
        <Route exact 
          path='/my_account' 
          render={() => isLoggedIn ? <Profile /> : <Redirect to='/login' /> } 
        />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route path='*' component={Error} />
      </Switch>
      <ScrollTop />
      <Footer theme={theme} />
    </AppContainer>
  );  
}
document.addEventListener('scroll', handleEffect);