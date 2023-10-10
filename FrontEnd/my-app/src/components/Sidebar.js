import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Signin from '../LoginPage/Login';
import {
FaBars,
FaSignOutAlt,
FaHome,
FaSun,
FaUser,
FaCloudSun
} from "react-icons/fa";

const Sidebar = ({children}) => {
const [isOpen, setIsOpen] = useState(false);
const toggle = () => setIsOpen(!isOpen);
const location = useLocation();
const [logout,setLogout]=useState(false);
const logoutt=(e)=>{
    setLogout(true);
}
if(logout){
    return(
        <Signin/>
    )
}
const menuItem = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: <FaHome />
    },
    {
        path: "/morning",
        name: "Morning Batch",
        icon: <FaCloudSun />
    },
    {
        path: "/afternoon",
        name: "Afternoon Batch",
        icon: <FaSun />
    }
    // ,
    // {
    //     path: "/Atendance",
    //     name: "Attendance",
    //     icon: <FaUser />
    // }
];

if (location.pathname === '/logout') {
    return <>{children}</>;
}

return (
    <div className="container" style={{ margin: "0" , padding:"0"}}>
        <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
            <div className="top_section">
                <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">Admin</h1>
                <div style={{ marginLeft: isOpen ? "60px" : "0px" }} className="bars">
                    <FaBars onClick={toggle} />
                </div>
            </div>

            {
                menuItem.map((item, index) => (
                    <NavLink to={item.path} key={index} className="link" activeClassName="active">
                        <div className="icon">{item.icon}</div>
                        <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                    </NavLink>
                ))
            }
            
            <NavLink to="/" className="link">
                <div className="icon"><FaSignOutAlt /></div>
                <div style={{ display: isOpen ? "block" : "none" }} className="link_text" onClick={logoutt}>Logout</div>
            </NavLink>
        </div>
        <main>{children}</main>
    </div>
);
};

export default Sidebar;