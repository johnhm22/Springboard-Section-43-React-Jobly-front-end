import React, {useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";
import {
    CardGroup,
    Card,
    CardBody,
    CardTitle,
    CardText,
    CardImg,
    Container,
    Row,
    Col,
    Button,
    Form, FormGroup, Label, Input
  } from "reactstrap";
import './Companies.css';
import Company from './Company';
import JoblyApi from './api';
import SearchForm from './SearchForm';
import {NavLink} from 'react-router-dom'





const Companies = ({updateCompanies, companies, searchCompanies}) => {

    console.log("companies in companies: ", companies);

    const [isLoading, setIsLoading] = useState(true);



const handleUpdateCompanies = (companies) => {
    updateCompanies(companies);
}

    useEffect( () => {
        async function getCompanies() {
               let companies = await JoblyApi.getCompanies();
              handleUpdateCompanies(companies)
              setIsLoading(false);
        }
        getCompanies();
        }, [] 
        )

        if (isLoading) {
            return <p>Loading &hellip;</p>;
          }

if(localStorage.token) {
    return (
        <Container>
            <Row>
                <Col >
            <SearchForm searchTerm={searchCompanies}/>
            {companies.map(company => (
                <Card className="m-5">
                <CardBody>
                <NavLink to={`/companies/${company.name}`}>
                <CardTitle tag="h6">{company.name}
                {company.logoUrl && 
                <img className="float-right" src={company.logoUrl} alt="Card image cap" /> }
                </CardTitle>
                </NavLink>
              
                <CardText>{company.description}</CardText>
                </CardBody>
                </Card>
                    ))}
                    </Col>
            </Row>   
        </Container>
        )
    }

    return(
        <Redirect to='/login' />
    )
}

export default Companies;

