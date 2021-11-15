import React, {useState} from "react";

import { Link } from "react-router-dom";
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import ListItemIcon from "@mui/material/ListItemIcon";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import StarBorder from "@mui/icons-material/StarBorder";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CategoryIcon from '@mui/icons-material/Category';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { Menu } from "antd";
const { SubMenu, Item } = Menu;

const AdminNav = () => {
  const [category, setCategory] = useState(true);
  const [subcategory, setSubCategory] = useState(true);
  const [product, setProduct] = useState(true);

  const handleSubcategoryClick = () => {
    setSubCategory(!subcategory);
  };

  const handleCategoryClick = () => {
   
    setCategory(!category);
  };

  const handleProductClick = () => {
   
    setCategory(!product);
  };

  return (
    <nav>
      <ul className="nav flex-column mt-2 cl-2">
      {/* Category.............................................................. */}
        <ListItemButton onClick={handleCategoryClick}  style={{borderRadius: 10, }}>
          <ListItemText primary="Category" />
          {category ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={category} timeout="auto" unmountOnExit >
          <List component="div" disablePadding >
            <ListItemButton sx={{ pl: 4 }} className="bg-secondary" style={{borderRadius: 10}}> 
              <ListItemIcon>
                <AddCircleIcon />
              </ListItemIcon>
              {/* <ListItemText primary="add new category" to="/user/password"/> */}
              <Link to="/category" >New</Link>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} className="bg-danger mt-1" style={{borderRadius: 10}}>
              <ListItemIcon>
                <DeleteOutlineIcon />
              </ListItemIcon>
              {/* <ListItemText primary="add new category" to="/user/password"/> */}
              <Link to="/category" className="text-white" >remove</Link>
            </ListItemButton>
          </List>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} className="bg-primary mt-1" style={{borderRadius: 10}}>
              <ListItemIcon>
                <FormatListBulletedIcon />
              </ListItemIcon>
              {/* <ListItemText primary="add new category" to="/user/password"/> */}
              <Link to="/category" className="text-white">List</Link>
            </ListItemButton>
          </List>
        </Collapse>

        {/* Products ................................................ */}
        <ListItemButton onClick={handleProductClick}  style={{borderRadius: 10, }}>
          <ListItemText primary="Product" />
          {product ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={product} timeout="auto" unmountOnExit >
          <List component="div" disablePadding >
            <ListItemButton sx={{ pl: 4 }} className="bg-secondary" style={{borderRadius: 10}}> 
              <ListItemIcon>
                <AddCircleIcon />
              </ListItemIcon>
              {/* <ListItemText primary="add new category" to="/user/password"/> */}
              <Link to="/category" >New</Link>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} className="bg-danger mt-1" style={{borderRadius: 10}}>
              <ListItemIcon>
                <DeleteOutlineIcon />
              </ListItemIcon>
              {/* <ListItemText primary="add new category" to="/user/password"/> */}
              <Link to="/category" className="text-white" >remove</Link>
            </ListItemButton>
          </List>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} className="bg-primary mt-1" style={{borderRadius: 10}}>
              <ListItemIcon>
                <FormatListBulletedIcon />
              </ListItemIcon>
              {/* <ListItemText primary="add new category" to="/user/password"/> */}
              <Link to="/category" className="text-white">List</Link>
            </ListItemButton>
          </List>
        </Collapse>
    {/*  Subcategory.............................................................*/}
        
    <ListItemButton onClick={handleSubcategoryClick}  style={{borderRadius: 10, }}>
          <ListItemText primary="Product" />
          {subcategory? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={subcategory} timeout="auto" unmountOnExit >
          <List component="div" disablePadding >
            <ListItemButton sx={{ pl: 4 }} className="bg-secondary" style={{borderRadius: 10}}> 
              <ListItemIcon>
                <AddCircleIcon />
              </ListItemIcon>
              {/* <ListItemText primary="add new category" to="/user/password"/> */}
              <Link to="/category" >New</Link>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} className="bg-danger mt-1" style={{borderRadius: 10}}>
              <ListItemIcon>
                <DeleteOutlineIcon />
              </ListItemIcon>
              {/* <ListItemText primary="add new category" to="/user/password"/> */}
              <Link to="/category" className="text-white" >remove</Link>
            </ListItemButton>
          </List>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} className="bg-primary mt-1" style={{borderRadius: 10}}>
              <ListItemIcon>
                <FormatListBulletedIcon />
              </ListItemIcon>
              {/* <ListItemText primary="add new category" to="/user/password"/> */}
              <Link to="/category" className="text-white">List</Link>
            </ListItemButton>
          </List>
        </Collapse>
     {/* orders................................................................. */}
        <li className="nav-item">
          <Link to="/admin/orders" className="nav-link btn btn-primary">
            sub category
          </Link>
        </li>
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
