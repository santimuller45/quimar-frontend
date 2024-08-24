import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './main.css';
import { BrowserRouter } from "react-router-dom";

// CONTEXT ----->
import { ShopProvider } from './context/Shop.jsx';
import { UserProvider } from './context/User.jsx';
import { ProductProvider } from './context/Products.jsx';
//<---------------

const Root = () => (
    <BrowserRouter>
      <ProductProvider>
        <ShopProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </ShopProvider>
      </ProductProvider>
    </BrowserRouter>
);

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);