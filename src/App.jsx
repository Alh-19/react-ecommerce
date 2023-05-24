import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import ProductsPage from './pages/ProductsPage';
import ProductsDetails from'./pages/ProductsDetails';
import HomePage from'./pages/HomePage';
import React, { useState, useEffect } from 'react';
import Cards from '../src/components/Cards/Cards';
function App() {

  


  return (
    <Router>
      <div className="container">
  
        {/* <hr/> */}

        <Routes>
          <Route path="/"exact element={<HomePage />}/>
          <Route path="/men" element={<ProductsPage />}/>
          <Route path="/products/:id" element={<ProductsDetails />}/>
        </Routes>

      </div>
    </Router>
  );
};

export default App;
