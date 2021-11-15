import React, { useState, useEffect } from "react";
import {useNavigate, useParams} from 'react-router-dom';
import { toast } from "react-toastify";

import { useSelector } from "react-redux";
import {
  getAcategory,
  updateAcategory,

} from "../../connectBackend/category";

import FormCategory from '../../components/Forms/Form'


const UpdateCategory = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();



  const { user } = useSelector((state) => ({ ...state }));
  const {slug} = useParams();

  useEffect(() => {
    loadACategory();
  }, []);

  const loadACategory = async () => {

        await getAcategory(slug, user.token)
        .then((res) => {
            console.log(res.data.name)
            setName(res.data.name);
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default UpdateCategory;
