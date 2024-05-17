import React from 'react'
import {Outlet} from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../assets/logo.png'
import '../../components/NavBar/Navibar.css'
import '../../components/Footer/Footer.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

const Homelayout = () => {
  return (
    <>
     <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home"><img src={logo} className='logo'/></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            <Nav>
            <Link to={'/'} className="react-router-link"><Nav.Link href="#deets" className='options'>Home</Nav.Link></Link> 
              <Link to={'/courses/'} className='react-router-link'><Nav.Link href="#deets"  className='options'> Courses</Nav.Link></Link>
              <Link to={'/mentors/'} className="react-router-link"><Nav.Link href="#deets" className='options'>Mentors</Nav.Link></Link>
              <Nav.Link href="#deets" className='options'>Contact Us</Nav.Link>
              {/* <Link to={'/user/signup/'} className="react-router-link"><Nav.Link href="#deets" className='options'>Signup</Nav.Link></Link> */}
              <Link to={'/user/login/'} className="react-router-link"><Nav.Link href="#deets" className='options'>Login</Nav.Link></Link>
              <NavDropdown title="User" className='options' id="collapsible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1" className='options'><Link to={'/user/profile/'} className='react-router-link text-dark'> User Profile</Link></NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4" className='options'>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      <Outlet/>

      <div className='footer p-5'>

            <br />
            <Row>
                <Col sm={4}>
                    <img src={logo} className="footer-logo" alt="" />
                    <p>329 Queensberry Street, Bangalore, 
                        <br />
                        Karnataka,India.
                        <br />
                        +91 9123 456 789
                        <br/>
                        support@scholarcode.com
                    </p>
                    <i className="fa-brands fa-square-facebook m-1 "></i>
                    <i className="fa-brands fa-square-instagram m-1"></i>
                    <i className="fa-brands fa-linkedin m-1"></i>
                    <i className="fa-brands fa-square-twitter m-1"></i>

                </Col>
                <Col sm={2}>
                    <ul>
                        <h5>Our Company</h5>
                        <li>Our Company</li>
                        <li>About Us</li>
                        <li>Contact Us</li>
                        <li>Community</li>
                        <li>Student Perks</li>
                        <li>Blog</li>
                        <li>Affiliate Program</li>
                        <li>Careers</li>
                            
                    </ul>
                </Col>
                <Col sm={2}>
                    <ul>
                        <h5>Our Company</h5>
                        <li>Our Company</li>
                        <li>About Us</li>
                        <li>Contact Us</li>
                        <li>Community</li>
                        <li>Student Perks</li>
                        <li>Blog</li>
                        <li>Affiliate Program</li>
                        <li>Careers</li>
                            
                    </ul>
                </Col>
                <Col sm={2}>
                    <ul>
                        <h5>Our Company</h5>
                        <li>Our Company</li>
                        <li>About Us</li>
                        <li>Contact Us</li>
                        <li>Community</li>
                        <li>Student Perks</li>
                        <li>Blog</li>
                        <li>Affiliate Program</li>
                        <li>Careers</li>
                            
                    </ul>
                </Col>
                <Col sm={2}>
                    <ul>
                        <h5>Our Company</h5>
                        <li>Our Company</li>
                        <li>About Us</li>
                        <li>Contact Us</li>
                        <li>Community</li>
                        <li>Student Perks</li>
                        <li>Blog</li>
                        <li>Affiliate Program</li>
                        <li>Careers</li>
                            
                    </ul>
                </Col>
            </Row>
            <br />
            <Row className='ml-5'>
                <Col sm={6} className='copyright'>Copyright © 2024 ScholarCODE . All Right Reserved.</Col>
                <Col sm={1} className='copyright'>Home</Col>
                <Col sm={1} className='copyright'>Site Map</Col>
                <Col sm={1} className='copyright'>Privacy policy</Col>
                <Col sm={1} className='copyright'>Web use policy</Col>
                <Col sm={1} className='copyright'>Cookie policy</Col>
            </Row>
            <br />
    </div>  
      </>
  )
}

export default Homelayout