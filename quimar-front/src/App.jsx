import React from 'react'
import { Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';

// URL DE RESPUESTA DEL BACKEND ---->
// import axios from "axios";
// axios.defaults.baseURL = "http://localhost:3001";
//<-----------------------------------------------

// VIEWS ------>
import { LandingPage , AccountPanel , MyAccount } from './views/indexViews.js';
//<-------------

// COMPONENTES ----->
import { NavBar, Footer } from './components/indexComponents.js'
//<------------------

function App() {

  return (
    <div className="App">
      <header>
        <NavBar/>
      </header>
      <Routes>
         <Route path='/' element={<LandingPage/>}></Route>
         <Route path='/account' element={<MyAccount/>}></Route>
         <Route path='/account-panel' element={<AccountPanel/>}></Route>
      </Routes>
      <footer>
        <Footer/>
      </footer>
    </div>
  );
};

export default App;
