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
import SubCategory from "../../pages/Users/Admin/SubCategory"
import AddSubCategory from "../../pages/SubCategory/AddSubCategory"

//admin product
import CreateProductAdmin from "../../pages/Users/Admin/Product/CreateProductAdmin"
import ListProducts from "../../pages/Products/ListProducts"
import UpdateProductAdmin from "../../pages/Users/Admin/Product/UpdateProductAdmin"

import UpdateSubCategory from "../../pages/SubCategory/UpdateSubcategory"
import OrdersAdmin from "../../pages/Users/Admin/OrdersAdmin"
import UpdateCategory from '../../pages/Category/UpdatCategory'


import { currentAdmin } from "../../connectBackend/auth";

// user
import History from "../../pages/Users/Customer/History";
import Password from "../../pages/Users/Customer/Password";
import Wishlist from "../../pages/Users/Customer/Wishlist"
import Payment from "../../pages/Stripe/Payment";

// Admin routes
import LoadingToRedirect from './LoadingToRedirect';
import CreateCouponPage from '../../pages/Users/Admin/coupon/CreateCoupon'

//general 
import ProductDetail from "../../pages/ProductDetail"
import CategoryHome from '../../components/Category/CategoryHome'
import SubProducts from '../../components/Subcategories/SubProducts'
import SearchProduct from '../../components/Forms/SearchProduct'
import Shop from '../../pages/Shop'
import Cart from '../../pages/Cart'
import CheckOut from '../../pages/CheckOut'



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
          {path: "/user/checkout", element: <CheckOut />}, 
          {path: "/user/payment", element: <Payment />}, 
      ]},
      { path: "/admin", element: isAdmin ?  <Outlet /> 
      : <LoadingToRedirect />,
     children: [
        {path: "/admin/dashboard", element:  <AdminDashBoard />},
        {path: "/admin/orders", element:  <OrdersAdmin />},
        {path: "/admin/category/:slug", element:  <UpdateCategory />},
        {path: "/admin/category", element:  <Category />},
        {path: "/admin/subcategory", element:  <SubCategory />},
        {path: "/admin/subcategory/new", element:  <AddSubCategory />},
        {path: "/admin/subcategory/:slug", element:  <UpdateSubCategory />},
        {path: "/admin/product/new", element:  <CreateProductAdmin />},
        {path: "/admin/products", element:  <ListProducts />},
        {path: "/admin/products/update/:slug", element:  <UpdateProductAdmin />},
        {path: "/admin/coupon/new", element:  <CreateCouponPage />},

    ]},
    // product routes 
    { path: "/product/:slug", element: <ProductDetail />},
      
      // ...
    // category routes 
    { path: "/category/:slug", element: <CategoryHome />},
    //subcategory products
    { path: "/subcategory/:slug", element: <SubProducts />},
    
    // search
    {path:'/shop?', element: <SearchProduct />},
    {path:'/shop', element: <Shop />},
    {path: '/cart', element: <Cart />}


    ]);
    return  routes;
    ;
  };