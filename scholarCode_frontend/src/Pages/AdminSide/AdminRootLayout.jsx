import React, { useCallback } from 'react'
import logo from '../../assets/logo.png'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown';
import {Outlet,Link, Navigate, useNavigate} from 'react-router-dom'
import './AdminRootLayout.css'
import { useDispatch, useSelector } from 'react-redux';
import { AdminLogout } from '../../Redux/Slices/AdminAuthSlice';
import Notifications from '../../components/Home/Notifications';

const AdminRootLayout = () => {
    const selector = useSelector((state)=>state.AdminToken)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const logOut =useCallback( ()=>{
        dispatch(AdminLogout())
        navigate('/admin/login/')
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        },[dispatch])
        
  return (
   <div>

   
   
   {(!selector.is_authenticated | !selector.is_superuser)?<Navigate to={'/admin/login/'}/> :    <>
            
            <div className='admin-navbar'>
                <Row>
                    <Col sm = {10}>
                        <img src={logo} className='admin-nav-logo ' alt="" />
                    
                    </Col>
                    <Col sm = {2} className='d-flex'>

                        <Notifications />
                        <Dropdown className='mt-3 ' >
                            <Dropdown.Toggle variant="success" style={{backgroundColor:'#12A98E',border:'none'}} id="dropdown-basic">
                                Admin
                            </Dropdown.Toggle>

                            <Dropdown.Menu className='p-2'>
                                <Dropdown.Item onClick={logOut}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>

                </Row>
            </div>
            <Outlet/>
            <div className='aside-admin py-1'>
            <Link to={'/admin/dashboard/'} className="react-router-link text-dark"><h2 className='aside-content'>Dashboard</h2></Link>
            <Link to={'/admin/users/'} className="react-router-link text-dark"><h2 className='aside-content'>Users</h2></Link>
            <Link to={'/admin/mentors/'} className="react-router-link text-dark"><h2 className='aside-content'>Mentors</h2></Link>
            <Link to={'/admin/courses/'} className="react-router-link text-dark"><h2 className='aside-content'>Courses</h2></Link>
            <Link to={'/admin/category/'} className="react-router-link text-dark"><h2 className='aside-content'>Categories</h2></Link>
            <Link to={'/admin/list-of-reviews/'} className="react-router-link text-dark"><h2 className='aside-content'>Reviews</h2></Link>
            <Link to={'/admin/user-feedbacks/'} className="react-router-link text-dark"><h2 className='aside-content'>User Feedbacks</h2></Link>
        </div>
        </>}

 </div>
)

  
}

export default AdminRootLayout