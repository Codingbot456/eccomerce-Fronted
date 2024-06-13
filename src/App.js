import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import HomePage from './pages/homePage';
import ProductPage from './pages/productPage';
import Kids from './productCategories/kids';
import Cart from './cart/cart'; // Ensure this path is correct
import { CartProvider } from './context/CartContext'; 
import WatchesProducts from './productCategories/watches';
import KidsProducts from './productCategories/kids';
import WomenProducts from './productCategories/women';
import BagsProducts from './productCategories/Bags';
import SneakersProducts from './productCategories/sneakers';
import SportsProducts from './productCategories/sports';
import GlassesProducts from './productCategories/glasses';
import Registration from './Registering/register';
import Login from './Registering/login';
import CheckoutPage from './checkout/checkout';
import TrendingProducts from './products/trending';
import Payment from './checkout/pay';
import PaymentForm from './Payments/Pay';
import ProductList from './multer/ProductList';
import ProductForm from './multer/ProductForm';
import AllProducts from './productCategories/All';
import MenProducts from './productCategories/Men';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track authentication status

  // Check if user is authenticated (you may adjust this logic based on your authentication method)
  useEffect(() => {
    // Example: Check if user is logged in (you might use localStorage or sessionStorage)
    const userLoggedIn = !!localStorage.getItem('token');

    setIsLoggedIn(userLoggedIn);
  }, []);

  const [cartWidth, setCartWidth] = useState('0');
  const [cartBgColor, setCartBgColor] = useState('');

  useEffect(() => {
    const handleCartIconClick = () => {
      if (window.innerWidth <= 768) {
        setCartWidth('0px');
      } else {
        setCartWidth('450px');
      }
      // Change background color to red when cart icon is clicked
    };

    window.addEventListener('cartIconClicked', handleCartIconClick);

    return () => {
      window.removeEventListener('cartIconClicked', handleCartIconClick);
    };
  }, []);

  const handleCloseCart = () => {
    setCartWidth('0');
  };

  return (
    <CartProvider>
      <Router>
        <Cart width={cartWidth} bgColor={cartBgColor} onClose={handleCloseCart} />
        <Routes>
          <Route element={<Outlet />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/women" element={<WomenProducts />} />
            <Route path="/kids" element={<KidsProducts />} />
            <Route path="/bags" element={<BagsProducts />} />
            <Route path="/sneakers" element={<SneakersProducts />} />
            <Route path="/watches" element={<WatchesProducts />} />
            <Route path="/sports" element={<SportsProducts />} />
            <Route path="/glasses" element={<GlassesProducts />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/checkout" element={ <CheckoutPage />} />
         
         <Route path="/payment" element={<PaymentForm />} />
         <Route path='/product/form' element={<ProductForm />}/>
         <Route path='/product/list' element={<ProductList/>}/>
        <Route path='/All' element={<AllProducts />}/>
        <Route path='/men' element={<MenProducts />}/>
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;