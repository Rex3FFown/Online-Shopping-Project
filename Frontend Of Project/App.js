import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Customer from './components/Customer/Customer';
import Home from './components/Home/Home';
import Login from './components/Login/Login.js';
import AdminLogin from './components/Login/AdminLogin/AdminLogin.js';
import Products from './components/Products/Products.js';
import CategoryProducts from './components/CategoryProducts/CategoryProducts.js';
import CustomerProfile from './components/CustomerProfile/CustomerProfile.js';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customers" element={<Customer />} />
          <Route path="/api/admin/login" element={<AdminLogin />}/>
          <Route path="/customers/:customerId" element={<Customer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />} />
          <Route path="/category/:id" element={<CategoryProducts />} />
          <Route path="/customer-profile" element={<CustomerProfile />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;