import React, { useCallback, useEffect } from 'react'
import {Outlet,Link, useNavigate} from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../assets/logo.png'
import '../../components/NavBar/Navibar.css'
import '../../components/Footer/Footer.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../../Redux/Slices/UserAuthSlice';
import { jwtDecode } from 'jwt-decode';
import { fetchUser, logoutUser } from '../../Redux/Slices/UserDetailsSlice';
import { toast } from 'react-toastify';
import Loader from '../../components/Utils/Loader';
import { clearEnrolls } from '../../Redux/Slices/Userside/EnrolledCoursesSlice';
import { clearAllEnrolls } from '../../Redux/Slices/Userside/AllEnrolledCoursesSlice';
import { Dropdown } from 'react-bootstrap';
import Notifications from '../../components/Home/Notifications';

const Homelayout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userSelector = useSelector((state)=>state.UserToken)
  const {user,status,error} = useSelector((state)=>state.User)
  const userAuthenticated = userSelector.is_authenticated
  
  useEffect(()=>{
    const fetchUserData = async(user)=>{
      
      try{
        if(userSelector.access){
          
          const access = userSelector.access
          const decodedToken = jwtDecode(access)
          const userId = decodedToken.user_id
          dispatch(fetchUser(userId))
          

        }
      }
      catch(error){
        console.log("not logged in")
      }
    }
    fetchUserData(user)
    
  },[userSelector,dispatch])

  useEffect(() => {
    if (userAuthenticated && !user.first_name) {
      setTimeout(() => {
        toast.warning('Please update your profile details!');
      }, 6000); // Delay of 3 seconds
    }
  }, [user]);

  // if (user && user.first_name){
  //   toast.warning('Please update your profile details')
  // }
  
  
  const handleLogout = useCallback(()=>{
    dispatch(userLogout())
    dispatch(logoutUser())
    dispatch(clearEnrolls())
    dispatch(clearAllEnrolls())
    navigate('/')
    toast.success("Logout successful")
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
  },[dispatch])
  console.log("user:",user)
  
  if (status === "loading") {
    return <Loader />;
  }
  
  
  return (
    <>
     <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
        <Link to={'/'} className="react-router-link"><Navbar.Brand href="#home"><img src={logo} className='logo'/></Navbar.Brand></Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            <Nav>
            <Link to={'/'} className="react-router-link"><Nav.Link href="#deets" className='options'>Home</Nav.Link></Link> 
              <Link to={'/courses/'} className='react-router-link'><Nav.Link href="#deets"  className='options'> Courses</Nav.Link></Link>
              <Link to={'/mentors/'} className="react-router-link"><Nav.Link href="#deets" className='options'>Mentors</Nav.Link></Link>
              {/* <Link to={'/user/signup/'} className="react-router-link"><Nav.Link href="#deets" className='options'>Signup</Nav.Link></Link> */}
              {!userAuthenticated?
              <Link to={'/user/login/'} className="react-router-link"><Nav.Link href="#deets" className='options'>Login</Nav.Link></Link>
              :
              <>
              
              <Link to={'/chat/'} className="react-router-link"><Nav.Link href="#deets" className='options'>Messages</Nav.Link></Link>
              <Notifications/>
              <NavDropdown title={( user.first_name)?user.first_name:"User"} className='options ' id="collapsible-nav-dropdown">
                <NavDropdown.Item href="" className='options'><Link to={'/user/profile/'} className='react-router-link text-dark'> My courses</Link></NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="" className='options'><Link to={'/user/profile/'} className='react-router-link text-dark'> User Profile</Link></NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="" className='options' onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
              </>
              }
              
            </Nav>
          </Navbar.Collapse>
          </Container>
      </Navbar>
      
      <Outlet/>

      <div className='footer p-5' style={{marginTop:'20em'}}>

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