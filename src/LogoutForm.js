import React from 'react';
import { Redirect } from "react-router-dom";
import {
    Button,
    Form, FormGroup, Label, Input
  } from "reactstrap";
import './Companies.css';



const LogoutForm = ({logout}) => {

    const handleLogout = () => {
        logout();
    }
handleLogout();

return (
    <>
    <Redirect to='/' />
    </>
    )
  
};

export default LogoutForm;