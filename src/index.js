import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import {BrowserRouter as Router} from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import { Web3Provider } from "./components/Context";
import { ProductProvider } from "./components/Context/product";
import { HelperProvider } from "./components/Context/helper";
import { ReviewProvider } from "./components/Context/review";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Web3Provider>
        <ProductProvider>
          <HelperProvider>
            <ReviewProvider>
              <App />
            </ReviewProvider>
          </HelperProvider>
        </ProductProvider>
      </Web3Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.unregister();
