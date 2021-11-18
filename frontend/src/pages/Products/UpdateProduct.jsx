import React, { useState, useEffect } from "react";
import {useNavigate, useParams} from 'react-router-dom';
import { toast } from "react-toastify";

import { useSelector } from "react-redux";
import {
  getAcategory,
  updateAcategory,

} from "../../connectBackend/category";

import FormCategory from '../../components/Forms/Form'



const initialState = {
    title: "apple",
    description: "good",
    price: "120",
    category: "",
    subcategory: [],
    shipping: "Yes",
    quantity: "3",
    images: [],
    colors: [
      "Yellow",
      "Red",
      "Brown",
      "Silver",
      "White",
      "Blue",
      "Black",
      "others",
    ],
    brand: "apple",
    color: "Red",
  };

const UpdateProduct = () => {
    const [name, setName] = useState('')
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const {slug} = useParams();

    // destructing state 
    const { 
        title,
        description,
        price,
        category,
        // categories will be listed for the user to choose
        categories,
        subcategory,
        shipping,
        quantity,
        images,
        colors,
        brand,
        color
      } = values;

  useEffect(() => {
    loadACategory();
  }, []);

  const loadACategory = async () => {

        await getAcategory(slug, user.token)
        .then((res) => {
            console.log(res.data.name)
            /* setValues(res.data.name); */
        })
        .catch((err) => {
            toast.error(`couldn't get ${slug} category detail`)
        })
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // send name with token to connectBackend
    updateAcategory(slug,{name}, user.token)
      .then((res) => {
        toast.success(` "${name}" was created successfully`);
        setName("");
        setLoading(false);
        navigate('/admin/dashboard')
      })
      .catch((err) => {
        toast.error(`${err.response.data}`);
        setLoading(false);
        setName('');
      });
  };


  return (
    <div className="m-3">
       <FormCategory handleSubmit = {handleSubmit} name={name} setName={setName} />
    </div>
  );
};



export default UpdateProduct;
