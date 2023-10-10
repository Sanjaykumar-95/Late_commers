import  { useState } from 'react';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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


const Logout = () => {
  const history = useHistory();

  useEffect(() => {
    // Perform any logout logic here, e.g. clearing local storage, etc.
    // ...

    // Redirect to the login page
    history.push('/login');
  }, []);

  return <div>Logging out...</div>;
};

export default Logout;
