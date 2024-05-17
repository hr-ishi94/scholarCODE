import React from 'react'
import logo from '../../assets/logo.png'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown';
import {Outlet,Link, Navigate, useNavigate} from 'react-router-dom'
import './MentorRootLayout.css'

const MentorRootLayout = () => {
  return (
    <>    
        <div className='mentor-navbar'>
            <Row>
                <Col sm = {10}>
                    <img src={logo} className='mentor-nav-logo ' alt="" />
                
                </Col>
                <Col sm = {2} className='d-flex'>
                    <button className='noti-mentor text-center '><i className="fa-regular fa-bell mentor-drop"></i></button>
                    <Dropdown className='mt-3' >
                        <Dropdown.Toggle variant="success" style={{backgroundColor:'#12A98E',border:'none'}} id="dropdown-basic">
                            mentor
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='p-2 '>
                            <Dropdown.Item >Action</Dropdown.Item>
                            <Dropdown.Item ><Link to={'/mentor/profile/'} className="react-router-link text-dark"> Profile</Link></Dropdown.Item>
                            <Dropdown.Item >Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>

            </Row>
        </div>
        <Outlet/>
        <div className='aside-mentor py-1'>
        <Link  className="react-router-link text-dark"><h2 className='aside-content'>Dashboard</h2></Link>
        <Link to={'mentor/reviews/'} className="react-router-link text-dark"><h2 className='aside-content'>Reviews List</h2></Link>
        <Link to={'mentor/courses/'} className="react-router-link text-dark"><h2 className='aside-content'>Courses Assigned</h2></Link>
        <Link to={'mentor/users/'} className="react-router-link text-dark"><h2 className='aside-content'>Users Assigned</h2></Link>
    </div>
</>
  )
}

export default MentorRootLayout