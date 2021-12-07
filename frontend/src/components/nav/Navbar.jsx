import React, {useState, useEffect} from "react";

import {Link, useNavigate} from "react-router-dom"
import SearchProductMui from '../../components/Forms/SearchProductMui'
import SearchProduct from '../../components/Forms/SearchProduct'
import { getAuth, signOut } from "firebase/auth";

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Badge from '@mui/material/Badge';

import {useSelector,useDispatch} from 'react-redux'

// toast
import {toast} from 'react-toastify';

const Navbar = () => {

   
    const { user, cart} = useSelector((state) => ({ ...state }));
    let dispatch = useDispatch();
    const navigate = useNavigate();

    const handleHome = () => {
        navigate('/')
    }
    const handleOrder = () => {
        navigate('/user/order')
    }
    const handleLogin = () => {
        navigate('/login')
    }
    const handleProfile = () => {
        navigate('/profile')
    }

    

    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
          // Sign-out successful.
          toast.success("logout successful")
        }).catch((error) => {
          // An error happened.
          toast.error("something went wrong")
          console.log(error)
        });

        dispatch({
            type: "LOGGED_OUT",
            payload: null
        })

        navigate('/login');

    }
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-primary" style={{
        /*   position:"sticky", */
          top:"0"

        }}>
        <div className="container-fluid">
            
         <Link smooth={true} to="/" className="navbar-brand" href="#"> 
            Store</Link>
            <Link smooth={true} to="/cart" className="navbar-brand" href="#"> 
            <Badge badgeContent={cart ? (cart.length) : 0} color="error" className='ml-4'><AddShoppingCartIcon/></Badge>
            </Link>
            <div className="ml-4"><SearchProductMui /></div>
            
        {/*     <SearchProduct/>
 */}
          <button className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNavDropdown" 
          aria-controls="navbarNavDropdown" 
          aria-expanded="false" 
          aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse navbaritems" id="navbarNavDropdown">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active" style={{cursor: "pointer"}}  >
                      <span smooth={true} onClick= {handleHome}
                      className="nav-link navbar-toggler" 
                      data-bs-target="#navbarNavDropdown" 
                      data-bs-toggle="collapse" 
                    href="#">Home</span>
                    </li>
                    <li className="nav-item" style={{cursor: "pointer"}}>
                    <span smooth={true} onClick= {handleOrder}
                      className="nav-link navbar-toggler" 
                      data-bs-target="#navbarNavDropdown" 
                      data-bs-toggle="collapse" 
                    href="#">orders</span>
                    </li>
                    {user ? ( <li className="nav-item" style={{cursor: "pointer"}} >
                    <span smooth={true} onClick= {handleProfile}
                      className="nav-link navbar-toggler" 
                      data-bs-target="#navbarNavDropdown" 
                      data-bs-toggle="collapse" 
                      
                    href="#">Profile</span>
                    </li>) : null}
                    {user ? (
                        
                         <li className="nav-item" style={{cursor: "pointer"}}>
                         <span smooth={true} onClick= {handleLogout}
                      className="nav-link navbar-toggler" 
                      data-bs-target="#navbarNavDropdown" 
                      data-bs-toggle="collapse" 
                    href="#">logout </span>
                          </li>
                    ): (
                        <li className="nav-item" style={{cursor: "pointer"}}>
                         <span smooth={true} onClick= {handleLogin}
                      className="nav-link navbar-toggler" 
                      data-bs-target="#navbarNavDropdown" 
                      data-bs-toggle="collapse" 
                    href="#">Log in</span>
                         </li> 
                    )}
                   
                </ul>
          </div>
        </div>
      </nav>
    )
}

export default Navbar