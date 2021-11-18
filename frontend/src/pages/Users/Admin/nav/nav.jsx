import React, {useState} from "react";

import { Link } from "react-router-dom";


import CategoryNav from './Category'
import ProductNav from './Product'
import SubCategory from './SubCategory'


const AdminNav = () => {
 
  return (
    <nav>
      <li className="nav-item">
          <Link to="/admin/dashboard" className="nav-link btn btn-primary">
            Dashboard
          </Link>
        </li>
      <ul className="nav flex-column mt-2 cl-2">
      <li className="nav-item">
          <Link to="/admin/category" className="nav-link btn btn-primary">
           category
          </Link>
        </li>
        <ProductNav />
       <SubCategory/>
     {/* orders................................................................. */}
        <li className="nav-item">
          <Link to="/admin/orders" className="nav-link btn btn-primary">
            coupon
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/user/password" className="nav-link btn btn-primary">
            password
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;
