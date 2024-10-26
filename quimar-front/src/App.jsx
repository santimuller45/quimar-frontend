import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// CUSTOM HOOK ---->
import { useProducts } from './customHooks/useProducts.js';
import { useUser } from './customHooks/useUser.js';
// <----------------

// URL DE RESPUESTA DEL BACKEND ---->
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";

// URL PARA COMPARTIR
// axios.defaults.baseURL = "https://zw1l1ft7-3001.brs.devtunnels.ms/"; 

//<-----------------------------------------------

// VIEWS ------>
import { 
  LandingPage, 
  AccountPanel,
  ProductPanel,
  OrdersPanel,
  RubroPanel, 
  MyAccount, 
  ProductsPage, 
  AboutUs, 
  Contact, 
  ProductDetail,
  RegisterPage,
  LoginUser,
  ForgotPassword,
  ChangePassword,
  OrderTable,
  OrderCheckout,
  MyOrders 
} from './views/indexViews.js';
//<-------------

// COMPONENTES ----->
import { NavBar, Footer } from './components/indexComponents.js'
//<------------------

function App() {

  const { getAllProducts, getAllRubros } = useProducts();
  const { getAllUsers } = useUser();

  useEffect(() => {
    getAllProducts();
    getAllRubros();
    getAllUsers();
  },[]);

  return (
    <div className="App">
      {/* HEADER */}
      <NavBar/>
      {/* HEADER */}
      <div className="content">
        <Routes>
          <Route path='/' element={<LandingPage/>}></Route>
          <Route path='/products' element={<ProductsPage/>}></Route>
          <Route path='/product-panel' element={<ProductPanel/>}></Route>
          <Route path='/detail/:productID' element={<ProductDetail/>} />
          <Route path='/orders-panel' element={<OrdersPanel/>}></Route>
          <Route path='/rubro-panel' element={<RubroPanel/>}></Route>
          <Route path='/account' element={<MyAccount/>}></Route>
          <Route path='/account/orders' element={<MyOrders/>}></Route>
          <Route path='/account-panel' element={<AccountPanel/>}></Route>
          <Route path='/contact-us' element={<Contact/>}></Route>
          <Route path='/about-us' element={<AboutUs/>}></Route>
          <Route path='/register' element={<RegisterPage/>}></Route>
          <Route path='/log-in' element={<LoginUser/>}></Route>
          <Route path='/forgot-password' element={<ForgotPassword/>}></Route>
          <Route path='/change-password' element={<ChangePassword/>}></Route>
          <Route path='/order' element={<OrderTable/>}></Route>
          <Route path='/order-checkout' element={<OrderCheckout/>}></Route>
        </Routes>
      </div>
      {/* FOOTER */}
      <Footer/>
      {/* FOOTER */}
    </div>
  );
};

export default App;
