import React from 'react'
import { Outlet,Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown';
import logo from '../../assets/logo.png'

const ChatScreenLayout = () => {
  return (
    <>
    
    
    <div className='mentor-navbar'>
            <Row>
                <Col sm = {10}>
                    <img src={logo} className='mentor-nav-logo ' alt="" />
                
                </Col>
                <Col sm = {2} className='d-flex'>
                    
                </Col>

            </Row>
        </div>
        <Outlet/>
    </>
  )

}

export default ChatScreenLayout