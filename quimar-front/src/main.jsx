import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
// REDUX ----->
// import { Provider } from "react-redux";
// import store from "./redux/store.js";
//<-----------

// CONTEXT ----->

// import { ShopProvider } from './context/Shop/shop.jsx';
//<---------------
// import './main.css'

import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <Provider store={store}>
      // <ShopProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      // </ShopProvider>
  // </Provider>
);

