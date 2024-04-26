import React from 'react'
import logo from '../../assets/logo.png'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {Outlet,Link} from 'react-router-dom'
import './AdminRootLayout.css'

const AdminRootLayout = () => {
  return (
    <>
    
    
       <div className='admin-navbar'>
        <Row>
            <Col sm = {10}>
                <img src={logo} className='admin-nav-logo ' alt="" />
            
            </Col>
            <Col sm = {2}>
            <button className='noti-admin text-center'><i class="fa-regular fa-bell admin-drop"></i></button>
            <Dropdown as={ButtonGroup} >
                <Button variant="" className='admin-drop'>Admin</Button>

                <Dropdown.Toggle split variant="" className='admin-drop' id="dropdown-split-basic" />

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            </Col>

        </Row>
    </div>
    <Outlet/>
     <div className='aside-admin py-1'>
     <Link className="react-router-link text-dark"><h2 className='aside-content'>Dashboard</h2></Link>
     <Link to={'/admin/users/'} className="react-router-link text-dark"><h2 className='aside-content'>Users</h2></Link>
     <Link to={'/admin/mentors/'} className="react-router-link text-dark"><h2 className='aside-content'>Mentors</h2></Link>
     <Link to={'/admin/courses/'} className="react-router-link text-dark"><h2 className='aside-content'>Courses</h2></Link>
     <Link to={'/admin/category/'} className="react-router-link text-dark"><h2 className='aside-content'>Categories</h2></Link>
     <Link className="react-router-link text-dark"><h2 className='aside-content'>Reviews</h2></Link>
 </div>
 </>
)

  
}

export default AdminRootLayout