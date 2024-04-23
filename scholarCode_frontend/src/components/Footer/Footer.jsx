import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Footer.css'
import logo from './../../assets/logo.png'

const Footer = () => {
  return (
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
  )
}

export default Footer