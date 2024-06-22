import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './main.css';
import { BrowserRouter } from "react-router-dom";

// REDUX ----->
// import { Provider } from "react-redux";
// import store from "./redux/store.js";
//<-----------

// CONTEXT ----->
// import { ShopProvider } from './context/Shop/shop.jsx';
//<---------------

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

