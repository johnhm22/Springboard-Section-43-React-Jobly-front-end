import React, { useState } from 'react';
import {
    Button,
    Form, FormGroup, Label, Input, Container, Row, Col
  } from "reactstrap";
import './Companies.css';



const SignupForm = ({signup}) => {

    const initialState = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    }
    const [formData, setFormData] = useState(initialState);

//note: this is using ES2015 computed property names
//allowing a generic onChange handler for both inputs
const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(formdata => ({
        ...formdata,
        [name]: value
    }))
}

const handleSubmit = (e) => {
    e.preventDefault();
    const {username, password, firstName, lastName, email} = formData;
    signup(username, password, firstName, lastName, email);
    setFormData(initialState);
}

return (
    <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <Form method="get" onSubmit={handleSubmit} className="mt-5">
        <h2>Sign Up</h2>
            <FormGroup>
            <Label htmlFor="username" className="float-left">Username</Label>
            <Input type="text" name="username" id="username" value={formData.username} onChange={handleChange} placeholder="Enter username..." />
            </FormGroup>
            <FormGroup>
            <Label htmlFor="password" className="float-left">Password</Label>
            <Input type="text" name="password" id="password" value={formData.password} onChange={handleChange} placeholder="Enter password..." />
            </FormGroup>
            <FormGroup>
            <Label htmlFor="firstName" className="float-left">First name</Label>
            <Input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter first name..." />
            </FormGroup>
            <FormGroup>
            <Label htmlFor="lastName" className="float-left">Last name</Label>
            <Input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter last name..." />
            </FormGroup>
            <FormGroup>
            <Label htmlFor="email" className="float-left">Email address</Label>
            <Input type="text" name="email" id="email" value={formData.email} onChange={handleChange} placeholder="Enter email..." />
            </FormGroup>
            <Button color="primary" className="float-right">Sign up</Button>
        </Form>
       
        </div>
    )
  
};

export default SignupForm;