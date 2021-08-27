import React, { useContext } from "react";
import "./NavBar.css";
import {NavLink} from 'react-router-dom'
import { Nav, NavItem, Container, Row, Col } from "reactstrap";
import UserContext from "./userContext";


function NavBar() {
  const username = useContext(UserContext);
  if(username){
    return (
            <nav className="Navbar">
            <Nav>
                  <NavLink exact to="/">Jobly</NavLink>
                  <NavLink to="/companies">Companies</NavLink>
                  <NavLink to="/jobs">Jobs</NavLink>
                  <NavLink to="/profile">Profile</NavLink>
                  <NavLink to="/logout">Logout {username}</NavLink>
              </Nav>
            </nav>
            
       
        );
        }
            {
      return (
                <div>
                  <nav className="Navbar">
                  <Nav>
                        <NavLink exact to="/">Jobly</NavLink>                                 
                        <NavLink to="/login">Login</NavLink>
                        <NavLink to="/signup">Sign up</NavLink>
                    </Nav>
                  </nav>
                </div>
              );

            }
}

export default NavBar;