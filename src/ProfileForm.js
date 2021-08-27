import React, { useState, useContext } from 'react';
import {
    Button,
    Form, FormGroup, Label, Input, Container, Row, Col
  } from "reactstrap";
import './Companies.css';
import UserContext from "./userContext";



const ProfileForm = ({updateProfile}) => {
    const username = useContext(UserContext);

    const initialState = {
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
    updateProfile(username, password, firstName, lastName, email);
    setFormData(initialState);
}

return (
    <Container>
        <Row>
        <Col md={{ size: 6, offset: 3 }}>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
            <p>Username: {username}</p>
            <Label htmlFor="firstName">First Name</Label>
            <Input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter first name..." />
            <Label htmlFor="lastName">Last Name</Label>
            <Input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter last name..." />
            <Label htmlFor="email">Email</Label>
            <Input type="text" name="email" id="email" value={formData.email} onChange={handleChange} placeholder="Enter email..." />
            <Label htmlFor="password">Confirm password to make changes</Label>
            <Input type="text" name="password" id="password" value={formData.password} onChange={handleChange} placeholder="Enter password..." />
            </FormGroup>
            <Button color="primary">Sign up</Button>
        </Form>
        </Col>
        </Row>
        </Container>
    )
  
};

export default ProfileForm;