import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import {
    Button,
    Form, FormGroup, Label, Input, Container, Row, Col
  } from "reactstrap";
import './Companies.css';




const LoginForm = ({login}) => {

    const initialState = {
        username: "",
        password: ""
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
    const {username, password} = formData;
    login(username, password);
    setFormData(initialState);
}

return (
    <Container>
        <Row>
        <Col md={{ size: 6, offset: 3 }}>
        <Form method="get" onSubmit={handleSubmit} className="mt-5">
            <FormGroup>
            <Label htmlFor="username"></Label>
            <Input type="text" name="username" id="username" value={formData.username} onChange={handleChange} placeholder="Enter username..." />
            <Label htmlFor="password"></Label>
            <Input type="text" name="password" id="password" value={formData.password} onChange={handleChange} placeholder="Enter password..." />
            </FormGroup>
            <Button color="primary">Log in</Button>
        </Form>
        </Col>
        </Row>
        </Container>
    )
  
};

export default LoginForm;

{/* <Redirect to='/' /> */}

