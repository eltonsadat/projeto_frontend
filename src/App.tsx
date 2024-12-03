import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './ProductList';
import ProductDetails from './ProductDetails';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/product/:id/edit" element={<EditProduct />} />
      </Routes>
    </Router>
  );
};

export default App;
