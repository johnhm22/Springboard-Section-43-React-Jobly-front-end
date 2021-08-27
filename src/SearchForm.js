import React, { useState } from 'react';
import {
    Button,
    Form, FormGroup, Label, Input
  } from "reactstrap";




const SearchForm = ({ searchTerm }) => {

const [search, setSearch] = useState();


const handleChange = (e) => {
    setSearch(e.target.value)
}

const handleSubmit = (e) => {
    e.preventDefault();
    searchTerm(search);
}


return (
        <Form method="get" className="form-inline m-4" onSubmit={handleSubmit}>
            <FormGroup>
            <Label htmlFor="search"></Label>
            <Input type="text" name="search" id="search" value={search} onChange={handleChange} placeholder="Enter search term..." />
            </FormGroup>
            <Button className="float-right" color="primary">Search</Button>
        </Form>
    )
}

export default SearchForm;