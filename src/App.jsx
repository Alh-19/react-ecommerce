import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import ProductsPage from './pages/ProductsPage';
import ProductsDetails from'./pages/ProductsDetails';
import HomePage from'./pages/HomePage';
import React, { useState, useEffect } from 'react';
import SearchPage from "./pages/SearchPage";
// import React from 'react';


function App() {

  return (
    <Router>
      <div className="container">
  
        {/* <hr/> */}

        <Routes>
          <Route path="/"exact element={<HomePage />}/>
          <Route path="/men" element={<ProductsPage />}/>
          <Route path="/products/:id" element={<ProductsDetails />}/>
          <Route path="search" element={<SearchPage />}/>
        </Routes>

      </div>
    </Router>
  );
};

export default App;
