import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Customer from './components/Customer/Customer';
import Home from './components/Home/Home';
import Login from './components/Login/Login.js';
import ProductAdmin from './components/Products/ProductAdmin.js';
import Basket from './components/Basket/Basket.js';
import Products from './components/Products/Products.js';
import CategoryProducts from './components/CategoryProducts/CategoryProducts.js';
import CustomerProfile from './components/CustomerProfile/CustomerProfile.js';
import AdminRoute from './components/Admin/AdminRoute.js';
import Register from './components/Register/Register.js';
import ProductPage from './components/Products/ProductPage.js';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customers" element={<Customer />} />
          <Route path="/customers/:customerId" element={<Customer />} />
          <Route path="/admin" element={<AdminRoute><Customer /></AdminRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />} />
          <Route path="/category/:id" element={<CategoryProducts />} />
          <Route path="/customer-profile" element={<CustomerProfile />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/product_admin" element={<ProductAdmin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<ProductPage />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;