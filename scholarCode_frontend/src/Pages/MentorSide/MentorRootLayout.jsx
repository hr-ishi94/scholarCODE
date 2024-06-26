import React, { useCallback, useEffect } from 'react'
import logo from '../../assets/logo.png'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown';
import {Outlet,Link, Navigate, useNavigate} from 'react-router-dom'
import './MentorRootLayout.css'
import { useDispatch, useSelector } from 'react-redux';
import { mentorLogout } from '../../Redux/Slices/MentorAuthSlice';
import { jwtDecode } from 'jwt-decode';
import { clearMentor, fetchMentor } from '../../Redux/Slices/MentorDetailSlice';

const MentorRootLayout = () => {
    const dispatch = useDispatch()
    const selector = useSelector((state)=>state.MentorToken)
    const MentorAuthenticated= selector.is_authenticated
    const {mentor,status,error} = useSelector((state)=>state.Mentor)
    const navigate = useNavigate()

    console.log(mentor,'krishnasi')
    useEffect(()=>{
        const fetchMentorDetails = async () =>{
            try{
                if(selector.access){
                    const access = selector.access
                    const decodedToken = jwtDecode(selector.access)
                    const mentorId = decodedToken.user_id
                    dispatch(fetchMentor(mentorId))
                
            }
            
        }catch(error){
            console.log("not logged in")
        }

       }
       fetchMentorDetails()
    },[selector,dispatch])



    const handleLogout = useCallback(()=>{
        dispatch(mentorLogout())
        dispatch(clearMentor())
        navigate('/mentor/login/')
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')

    },[dispatch])


  return (
    <>    
    {(!selector.is_authenticated | !selector.type == 'mentor')?<Navigate to={'/mentor/login/'}/>:<>
        <div className='mentor-navbar'>
            <Row>
                <Col sm = {9}>
                    <img src={logo} className='mentor-nav-logo ' alt="" />
                
                </Col>
                <Col sm = {3} className='d-flex '>
                    <button className='noti-mentor text-center px-2 '><  i className="fa-regular fa-bell mentor-drop"></i></button>
                    <Link to={'/chat/'} className=' text-light react-router-link px-2 mt-3'>Messages</Link>
                    <Dropdown className='mt-3 px-1  ' >
                        <Dropdown.Toggle variant="success" style={{backgroundColor:'#12A98E',border:'none'}} id="dropdown-basic">
                           Mentor: {mentor.first_name}
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='p-2 '>
                            <Dropdown.Item >Action</Dropdown.Item>
                            <Dropdown.Item ><Link to={'/mentor/profile/'} className="react-router-link text-dark"> Profile</Link></Dropdown.Item>
                            <Dropdown.Item  onClick={handleLogout}>Logout</Dropdown.Item>
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
    </div></>}
</>
  )
}

export default MentorRootLayout