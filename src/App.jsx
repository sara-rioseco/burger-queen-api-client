/* eslint-disable no-unused-vars */
import React from 'react'
import { createBrowserRouter } from 'react-router-dom';
import './App.css'

import Home from './components/pages/Home/home.jsx';
import Login from './components/pages/Login/login.jsx';
import Menu from './components/pages/Menu/menu.jsx';
import Orders from './components/pages/Orders/orders.jsx';
import Kitchen from './components/pages/Kitchen/kitchen.jsx';
import Users from './components/pages/Users/users.jsx';
import Products from './components/pages/Products/products.jsx';
import ErrorPage from './components/pages/Error/error-page.jsx';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/menu",
    element: <Menu />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/orders",
    element: <Orders />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/kitchen",
    element: <Kitchen />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/users",
    element: <Users />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/products",
    element: <Products />,
    errorElement: <ErrorPage />,
  },
])

