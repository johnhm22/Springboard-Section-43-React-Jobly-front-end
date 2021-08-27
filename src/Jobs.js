import React, {useEffect, useState, useContext} from 'react';
import { Redirect } from "react-router-dom";
import {
    CardGroup,
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    CardImg,
    Container,
    Row,
    Col,
    Button
  } from "reactstrap";

import JoblyApi from './api';
import SearchForm from './SearchForm';
import UserContext from "./userContext";

const Jobs = ({updateJobs, jobs, searchJobs, applyForJob}) => {

    const username = useContext(UserContext);

    console.log("Jobs page called");
    console.log('jobs in jobs is: ', jobs);

    const [isLoading, setIsLoading] = useState(true);


    const handleUpdateJobs = (jobs) => {
        updateJobs(jobs);
    };

    
    const applications = new Set();
    const handleApplyForJob = (username, id) => {
        applications.add(id)
        applyForJob(username, id);
    }
        
    useEffect( () => {
        async function getAllJobs() {
            let jobs = await JoblyApi.getAllJobs();
            handleUpdateJobs(jobs)
            setIsLoading(false);
            }
            getAllJobs();
            }, [] 
        )

            if (isLoading) {
                return <p>Loading &hellip;</p>;
              }

    if(localStorage.token) {
              return (
            <Container>
                   <Row>
                <Col md={{ size: 12 }}>
              <SearchForm searchTerm={searchJobs}/>
                {jobs.map(job => (
                        <Card className="m-5">
                        <CardBody>
                        <CardTitle><b>{job.title}</b></CardTitle>
                        <CardSubtitle>{job.companyName}</CardSubtitle>
                        <CardText>Job ref: {job.id}</CardText>
                        <CardText>Salary: {job.salary}</CardText>
                        <CardText>Equity: {job.equity}</CardText>
                        <Button color='danger' className="float-right" onClick={()=> handleApplyForJob(username, job.id)}>
                            {applications.has(job.id) ? 'Applied' : 'Apply'}
                            </Button>
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

export default Jobs;