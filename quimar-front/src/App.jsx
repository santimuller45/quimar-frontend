import React from 'react'
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom'

// URL DE RESPUESTA DEL BACKEND ---->
// import axios from "axios";
// axios.defaults.baseURL = "http://localhost:3001";
//<-----------------------------------------------

// COMPONENTES ----->
import LandingPage from './views/indexViews.js';
//<------------------

function App() {
 
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
      </Routes>
    </div>
  );
};

export default App;
