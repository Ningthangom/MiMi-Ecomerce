import React, {useState} from "react";

import { Link } from "react-router-dom";

import ListItemIcon from "@mui/material/ListItemIcon";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


const SubCategory = () => {
  
  const [subcategory, setSubCategory] = useState(false);
 
  const handleSubcategoryClick = () => {
    setSubCategory(!subcategory);
  };


  return (
    <div>
    
    {/*  Subcategory.............................................................*/}
        
    <ListItemButton onClick={handleSubcategoryClick}  style={{borderRadius: 10, }}>
          <ListItemText primary="SubCategory" />
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
  
    </div>
  );
};

export default SubCategory;
