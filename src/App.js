import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import './App.css';
import NavBar from './NavBar';
import Home from './Home';
import Companies from './Companies';
import Company from './Company';
import Jobs from './Jobs';
import LoginForm from './LoginForm';
import LogoutForm from './LogoutForm';
import ProfileForm from './ProfileForm';
import SignupForm from './SignupForm';
import SearchForm from './SearchForm';
import axios from "axios";
import UserContext from './userContext';
import JoblyApi from "./api";
// import useLocalStorageState from './useLocalStorageState';


const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
// const BASE_URL = "http://localhost:3001";
// const BASE_URL = "https://jobly-jobsite.herokuapp.com"

function App() {

  const [companies, setCompanies] = useState();
  const [jobs, setJobs] = useState();
  // const [token, setToken] = useLocalStorageState('token', '');
  const [token, setToken] = useState(() => {
    let value
    // value = JSON.parse(window.localStorage.getItem('token') || '') //JSON.parse is causing an error
    value = window.localStorage.getItem('token') || '';
    return value;
  });
  useEffect(() => {
    window.localStorage.setItem('token', token);
  }, [token])


  const [currentUser, setUser] = useState();


  const updateCompanies = (companies) => {
    setCompanies(companies);
  }
  
  const updateJobs = (jobs) => {
    setJobs(jobs);
  }



async function searchCompanies(handle) {
       let res = await axios.get(`${BASE_URL}/companies/${handle}`);
       setCompanies([res.data.company]);
}

async function searchJobs(id) {
       let res = await axios.get(`${BASE_URL}/jobs/${id}`);
       setJobs([res.data.job]);
}



async function login(username, password) {
    try {
      //add in authentication of username and password
      console.log("process.env.REACT_APP_BASE_URL", process.env.REACT_APP_BASE_URL)
      console.log("BASE_URL is: ", BASE_URL);
      console.log("username passed to login: ", username);
      let res = await axios({
        method: 'post',
        url: `${BASE_URL}/auth/token`,
        data: {
          username,
          password
      }
    });
    console.log("res from user login", res);
      setToken(res.data.token);
      setUser(username);
      JoblyApi.token = res.data.token;
      return <Redirect to='/home' />
  } catch(err) {
      console.log(err);
  }
}

async function logout() {
  
  setToken('');
  setUser('');
  JoblyApi.token = '';
}



async function signup(username, password, firstName, lastName, email, isAdmin) {
    try{
    let res = await axios({
      method: 'post',
      url: `${BASE_URL}/auth/register`,
      data: {
        username,
        password,
        firstName,
        lastName,
        email
      }
    });
    
    setToken(res.data.token);
    console.log("token from signup is: ", token);
    JoblyApi.token = res.data.token;
    return <Redirect to='/companies' />
  } catch(err) {
    console.log("There has been an error");
  }
}


async function updateProfile(username, firstName, lastName, email, password) {
  try {
    if(!password){
      throw "Password is not recognised";
    };
    let res = await axios({
      method: 'patch',
      url: `${BASE_URL}/users/${username}`,
      data: {
        password,
        firstName,
        lastName,
        email
      }
    })
  } catch(err) {
    console.log("Couldn't update profile");
  }
}

async function applyForJob (username, id){
  console.log("Username in App function: ", username)
  console.log("Job id in App function: ", id)
  try {
    let res = await axios({
      method: 'post',
      url: `${BASE_URL}/users/${username}/jobs/${id}`,
      data: {
       username,
       id
      }
    })
    console.log("res in job apply is: ", res);

  } catch(err){
    console.log("Error is: ", err);
    console.log("There was an error when applying for this job");
  }
}

// Create an effect triggered by a state change of the token: this should call the backend to get information on the newly-logged-in user and store it in the currentUser state.
useEffect(() => {
async function getUser(currentUser) {
      try{
      let res = await axios.get(`${BASE_URL}/users/${currentUser}`)
      console.log("res from useEffect in App: ", res);
      setUser(res.data.user);
      }
      catch(err){
        console.log("There is an error with getting the user");
      }
    }
  }, [currentUser, token])


  return (
    <UserContext.Provider value={currentUser}>
      <div className="App">
        <BrowserRouter>
          <NavBar />
          <main>
            <Switch>
              <Route exact path="/companies">
                <Companies updateCompanies={updateCompanies} companies={companies} searchCompanies={searchCompanies}/>
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/companies/:company">
              <Company jobs={jobs} updateJobs={updateJobs} applyForJob={applyForJob}/>
              </Route>
              <Route path="/jobs">
              <Jobs updateJobs={updateJobs} jobs={jobs} searchJobs={searchJobs} applyForJob={applyForJob}/>
              </Route>
              <Route path="/login">
              <LoginForm login={login}/>
              </Route>
              <Route path="/logout">
              <LogoutForm logout={logout}/>
              </Route>
              <Route path="/signup">
              <SignupForm signup={signup}/>
              </Route>
              <Route path="/profile">
              <ProfileForm updateProfile={updateProfile} />
              </Route>
              <Redirect to='/' />
            </Switch>
          </main>
        </BrowserRouter>
      </div>
      </UserContext.Provider>

    );

}

export default App;
