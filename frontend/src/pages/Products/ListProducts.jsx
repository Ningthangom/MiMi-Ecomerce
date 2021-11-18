import React, {useEffect, useState } from 'react';

import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom';


import {getAllProducts} from '../../connectBackend/product'



const ListProducts = () => {

    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getProducts();
    },[])
    

    const getProducts = () => {
        getAllProducts()
          .then((c) => {
            setProducts(c.data);
            console.log("this is category from: ", c.data)
          })
          .catch((error) => {
            toast.error("Categories could not be loaded");
            console.log(error);
          });
      };

      const onClickEdit = (slug) => {
        navigate(`/admin/products/${slug}`);
      };


    return (
        <div className="container-fluid">
           {products.map((product) => (
              <div key={product._id} className="alert alert-secondary">
                {product.title}
                <button
                  className="float-right btn btn-sm btn-danger mt-0 pt-1 text-white"
                  /* onClick={() => openModal(product.slug)} */
                >
                  Delete
                </button>
                <button
                  className=" mr-3 float-right btn btn-sm btn-primary mt-0 pt-1"
                  style={{ justifyContent: "center" }}
                  onClick={() => onClickEdit(product.slug)}
                >
                  Edit
                </button>
                </div>
           ))}
        </div>
    )
}


export default ListProducts;