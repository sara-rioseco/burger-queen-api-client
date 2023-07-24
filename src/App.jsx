/* eslint-disable no-unused-vars */
import React from 'react'
import { Route, Routes } from 'react-router-dom';

import './App.css'

import Home from './components/pages/Home/home.jsx';
import Login from './components/pages/Login/login.jsx';
import Menu from './components/pages/Menu/menu.jsx';
import Orders from './components/pages/Orders/orders.jsx';
import Kitchen from './components/pages/Kitchen/kitchen.jsx';
import Users from './components/pages/Users/users.jsx';
import Products from './components/pages/Products/products.jsx';
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/kitchen" element={<Kitchen />} />
        <Route path="/users" element={<Users />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </>
  )
}

export default App
