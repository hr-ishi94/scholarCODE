import React from 'react'
import logo from '../../assets/logo.png'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import './AdminNavBar.css'

const AdminNavBar = () => {
  return (
    <div className='admin-navbar'>
        <Row>
            <Col sm = {10}>
                <img src={logo} className='admin-nav-logo ' alt="" />
            
            </Col>
            <Col sm = {2}>
            <button className='noti-admin text-center'><i className="fa-regular fa-bell admin-drop"></i></button>
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
  )
}

export default AdminNavBar