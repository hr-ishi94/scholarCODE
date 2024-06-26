import React, { useCallback, useEffect } from 'react'
import { Outlet,Link, useNavigate } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown';
import logo from '../../assets/logo.png'
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { UserLogin } from '../../Redux/Slices/UserAuthSlice';

const ChatScreenLayout = () => {
  const userSelector = useSelector((state)=>state.UserToken)
  const isAdmin = userSelector.is_superuser
  const user = userSelector.access?'user' :'mentor'
  const navigate = useNavigate()
  const handleBackButton = useCallback (()=>{
    if (isAdmin){
      navigate('/admin/users/')
    }else if (user === 'mentor'){
      navigate('/mentor/users/')
    }else{
      navigate('/')
    }
  },[navigate])
  
  console.log(user)
  return (
    <>
    
    
    <div className='mentor-navbar'>
            <Row>
                <Col sm = {1} className='d-flex'>
                    
                </Col>
                <Col sm = {10}>
                    <Button className='p-2 rounded-circle  text-light' variant='' onClick={handleBackButton}><i className="fa-solid fa-arrow-left"></i></Button>
                    <img src={logo} className='mentor-nav-logo ' alt="" />
                
                </Col>
                <Col sm = {1} className='d-flex'>
                    
                </Col>

            </Row>
        </div>
        <Outlet/>
    </>
  )

}

export default ChatScreenLayout