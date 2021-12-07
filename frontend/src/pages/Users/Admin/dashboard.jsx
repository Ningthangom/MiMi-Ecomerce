import React from "react";
/* import { useNavigate } from 'react-router-dom';
import {useSelector} from "react-redux"; */
import AdminNav from "./nav/nav";
import ListProducts from '../../Products/ListProducts'

// media quries
import json2mq from "json2mq";
import useMediaQuery from "@mui/material/useMediaQuery";

const AdminDashBoard = () => {
  // media quries
  const matches = useMediaQuery(
    json2mq({
      minWidth: 500,
    })
  );

  return (
    <div className="container-fluid ">
      <div className="row">
        {matches ? (
          <React.Fragment>
            <div className="colmd-2 ml-3">
              <AdminNav />
            </div>
            <div className="col">
              {/* <p>Admin Dashboard</p> */}
              <ListProducts/>
            </div>
          </React.Fragment>
        ) : (
          <div className="col">
            {/* <p>Admin Dashboard</p> */}
           {/* This is Dashboard */}
           <ListProducts/>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashBoard;
