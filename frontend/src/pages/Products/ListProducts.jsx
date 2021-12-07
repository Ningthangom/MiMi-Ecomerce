import React, {useEffect, useState } from 'react';

import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom';
import { useSelector } from "react-redux";


import {getAllProducts, removeAproduct} from '../../connectBackend/product'
import AdminProductCard from '../../components/Cards/AdminProductCard'




const ListProducts = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false );
    const {user}= useSelector((state) => ({...state}))
   
    const navigate = useNavigate();

    useEffect(() => {
        getProducts();
    },[])
    

    const getProducts = () => {
        setLoading(true);
        getAllProducts(100)
          .then((c) => {
            setProducts(c.data);
            console.log("this is products from: ", c.data)
            setLoading(false);
          })
          .catch((error) => {
            toast.error("products could not be loaded");
            console.log(error);
            setLoading(false);
          });
      };


      const handleRemove = async (slugfromfunc) => {
        console.log("delete Proudct is called", slugfromfunc);
        await removeAproduct(slugfromfunc, user.token)
          .then((res) => {
            console.log(res.data);
            toast.success(`product name: "${slugfromfunc}" has been deleted`);
            getProducts();
          })
          .catch((error) => {
            toast.error("product could not be deleted");
            console.log("error in deleting product", error);
          
          });
      };

      const handleUpdate = (slug) => {
        navigate(`/admin/products/update/${slug}`)
      }


    return (
      <div className="container-fluid">
      <div className="row">
        {/* <div className="col-md-2">
          <AdminNav />
        </div> */}
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>All Products</h4>
          )}
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-4 ">
                <AdminProductCard product={product} handleRemove={handleRemove} handleUpdate={handleUpdate}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    )
}


export default ListProducts;