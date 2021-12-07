import React, {useState} from 'react';
import {Card,Tooltip } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import grocery from '../../images/general.jpg';

import {useNavigate, Link} from 'react-router-dom';
import {AverageRating} from './SingleProduct/rating';
import StarRating from 'react-star-ratings';
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";

const {Meta} = Card;




const ProductCard = ({product}) => {

  const [tooltip, setTooltip] = useState("Click to add");

   // redux
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  // add to cart function 
  const handleAddToCart = () => {
    // create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local storage
      // console.log('unique', unique)
      localStorage.setItem("cart", JSON.stringify(unique));

       // show tooltip
       setTooltip("Added");

       // add to redux state
       dispatch({
         type: "ADD_TO_CART",
         payload: unique,
       });
        // show cart items in side drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };

    const {images, title, description, slug, price} = product;
    return ( 

      <>
      
        <Card
       
        cover={
          <img
            src={images && images.length ? images[0].url: grocery}
            alt='grocery'
            style={{ height: "150px", objectFit: "cover", marginTop: 5 }}
            className="p-1"
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-warning" /> <br /> View Product
          </Link>,
          <a onClick={handleAddToCart}>
            <ShoppingCartOutlined className="text-danger" /> <br /> Add to Cart
          </a>,
        ]}
      >
        <Meta
     /*    style={{marginTop: 5}} */
          title={title }
          description={`${description && description.substring(0, 40)}...`}
         
        />
          <Meta
          className="text-danger"
          title={`$ ${price}`}
         
        />
         {product && product.ratings && product.ratings.length > 0 ? AverageRating(product)
            : <StarRating starRatedColor='grey' starDimension="25px" starSpacing=""/> }
      </Card>
      </>
    )

}

export default ProductCard;