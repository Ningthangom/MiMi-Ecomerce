import React, {useEffect, useState} from "react";
import {
    useRoutes,
    Outlet
  } from "react-router-dom";

import Login from "../../pages/Auth/Login";
import Register from "../../pages/Auth/Register";
import RegisterComplete from "../../pages/Auth/RegisterComplete";
import ForgotPassword from "../../pages/Auth/ForgotPassword";
import Home from "../../pages/Home";

// Admin components
import AdminDashBoard from "../../pages/Users/Admin/dashboard"
import Category from "../../pages/Users/Admin/Category"
import OrdersAdmin from "../../pages/Users/Admin/OrdersAdmin"
import UpdateCategory from '../../pages/Category/UpdatCategory'


import { currentAdmin } from "../../connectBackend/auth";

// user
import History from "../../pages/Users/Customer/History";
import Password from "../../pages/Users/Customer/Password";
import Wishlist from "../../pages/Users/Customer/Wishlist"

// Admin routes
import LoadingToRedirect from './LoadingToRedirect';



export const App = ({isProtected}) => {

    /* const object = isProtected; */
      /* console.log("isProtected", object); */
      const [isAdmin , setIsAdmin] = useState(false);

      useEffect(() => {
         /*  console.log("useEffect in routes is called") */
      if(isProtected && isProtected.token) {
        currentAdmin(isProtected.token)
        .then((res) => {
         /*  console.log("current admin", res) */
          setIsAdmin(true);
        })
        .catch((err) => {
          /* console.log("Admin route error in routes", err); */
          setIsAdmin(false);
        })
      }
  
  
    }, [isProtected])



    let routes = useRoutes([
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/register/complete", element: <RegisterComplete /> },
      { path: "/forgot/password", element: <ForgotPassword /> },
      { path: "/user", element: isProtected !== null ?  <Outlet /> 
        : <LoadingToRedirect />,
       children: [
          {path: "/user/history", element: <History />},
          {path: "/user/password", element: <Password />},
          {path: "/user/wishlist", element: <Wishlist />}, 
      ]},
      { path: "/admin", element: isAdmin ?  <Outlet /> 
      : <LoadingToRedirect />,
     children: [
        {path: "/admin/dashboard", element:  <AdminDashBoard />},
        {path: "/admin/orders", element:  <OrdersAdmin />},
        {path: "/admin/category/:slug", element:  <UpdateCategory />},
        {path: "/admin/category", element:  <Category />},

    ]},
      
      // ...
    ]);
    return  routes;
    ;
  };