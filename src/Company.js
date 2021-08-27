import React, {useEffect, useState, useContext} from 'react';
import {useParams, Redirect} from 'react-router-dom';
import JoblyApi from './api';
import {
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
  import UserContext from "./userContext";



const Company = ({updateJobs, jobs, applyForJob}) => {

    const username = useContext(UserContext);


    const {company} = useParams();

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

          const companyJobs = jobs.filter(job => job.companyName == company)
          console.log("companyJobs are: ", companyJobs);  

    if(localStorage.token) {
        return (
          <Container>
            <Row>
              <Col md={{ size: 12 }}>
                <h4>{company}</h4>
              {companyJobs.map(job => (
                      <Card className="m-5">
                      <CardBody>
                      <CardTitle><b>{job.title}</b></CardTitle>
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
};

export default Company;