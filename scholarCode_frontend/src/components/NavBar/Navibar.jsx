import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from './logo.png'
import './Navibar.css'
import { Link } from 'react-router-dom';

const Navibar = () => {
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home"><img src={logo} className='logo'/></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            <Nav>
            <Link to={'/'}><Nav.Link href="#deets" className='options'>Home</Nav.Link></Link> 
              <Nav.Link href="#deets" className='options'> Courses</Nav.Link>
              <Link to={'/mentors/'}><Nav.Link href="#deets" className='options'>Mentors</Nav.Link></Link>
              <Nav.Link href="#deets" className='options'>Contact Us</Nav.Link>
              <Link to={'/user/signup/'}><Nav.Link href="#deets" className='options'>Signup</Nav.Link></Link>
              <Link to={'/user/login/'}><Nav.Link href="#deets" className='options'>Login</Nav.Link></Link>
              <NavDropdown title="User" className='options' id="collapsible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1" className='options'>User Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4" className='options'>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default Navibar