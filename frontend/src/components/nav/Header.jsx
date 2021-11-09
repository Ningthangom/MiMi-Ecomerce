
import React, {useState} from 'react';
import {  Menu  } from  'antd';
import { 
     ShopOutlined,
     AppstoreOutlined,
     SettingOutlined,
     UserAddOutlined,
     UserOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';


const { SubMenu, Item } = Menu;


const Header = () => {

    const [current, setCurrent] = useState('home');
    
    const handleClick = (e) => {
        //
     /*    console.log(e.key); */

     setCurrent(e.key);

    }

    return (
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Item key="home" icon={<ShopOutlined />}>
          <Link to="/">Store</Link>
        </Item>
        <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Username">
          <Item key="setting:1">Option 1</Item>
          <Item key="setting:2">Option 2</Item>
        </SubMenu>
        <Item
          key="login"
          icon={<UserOutlined />}
          style={{ position: "absolute", right: 100 }}
        >
         <Link to="/login">Login</Link>
        </Item>
        <Item
          key="register"
          icon={<UserAddOutlined />}
          style={{ position: "absolute", right: 0 }}
        >
          <Link to="/register">Register</Link>
        </Item>
      </Menu>
    );

}

export default Header;