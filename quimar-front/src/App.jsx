import React from 'react'
import { Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

// EJECUTO LA ACTION PARA TRAER TODOS LOS PRODUCTOS AL REDUX ----->
import { useDispatch } from 'react-redux';
import { getAllProductsDB } from './redux/actions/actionsProduct.js';
import { useEffect } from 'react';
// <-----------------------------------------------------------------

// URL DE RESPUESTA DEL BACKEND ---->
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";
//<-----------------------------------------------

// VIEWS ------>
import { LandingPage , AccountPanel , MyAccount, ProductsPage } from './views/indexViews.js';
//<-------------

// COMPONENTES ----->
import { NavBar, Footer } from './components/indexComponents.js'
//<------------------

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsDB())
  },[dispatch]);

  return (
    <div className="App">
      {/* HEADER */}
      <header>
        <NavBar/>
      </header>
      {/* HEADER */}
      <Routes>
         <Route path='/' element={<LandingPage/>}></Route>
         <Route path='/products' element={<ProductsPage/>}></Route>
         <Route path='/account' element={<MyAccount/>}></Route>
         <Route path='/account-panel' element={<AccountPanel/>}></Route>
      </Routes>
      {/* FOOTER */}
      <Footer/>
      {/* FOOTER */}
    </div>
  );
};

export default App;
