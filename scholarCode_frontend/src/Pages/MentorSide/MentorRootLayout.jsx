import React, { useCallback, useEffect, useState } from 'react'
import logo from '../../assets/logo.png'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown';
import {Outlet,Link, Navigate, useNavigate} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './MentorRootLayout.css'
import { useDispatch, useSelector } from 'react-redux';
import { mentorLogout } from '../../Redux/Slices/MentorAuthSlice';
import { jwtDecode } from 'jwt-decode';
import { clearMentor, fetchMentor } from '../../Redux/Slices/MentorDetailSlice';
import { TimePicker } from '@mui/x-date-pickers';
import Badge from 'react-bootstrap/Badge';
import { fetchEnrolledCourses } from '../../Redux/Slices/Userside/EnrolledCoursesSlice';
import { fetchAllEnrolledCourses } from '../../Redux/Slices/Userside/AllEnrolledCoursesSlice';
import { fetchMentorCourse } from '../../Redux/Slices/mentorSide/MentorCourseSlice';

const MentorRootLayout = () => {
    const dispatch = useDispatch()
    const selector = useSelector((state)=>state.MentorToken)
    const MentorAuthenticated= selector.is_authenticated
    const {mentor,status,error} = useSelector((state)=>state.Mentor)
    const navigate = useNavigate()

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

    const [timeSlotModal, setTimeSlotModal] = useState(false)
    
    const handleClose =()=> setTimeSlotModal(false)
    const handleShow =()=> setTimeSlotModal(true)



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
                
                    <Link    className=' text-light react-router-link px-2 mt-3' onClick={handleShow}>Time Slots</Link>
                    <TimeSlots show={timeSlotModal} handleClose={handleClose}/>
                    <Link to={'/chat/'} className=' text-light react-router-link px-2 mt-3'>Messages</Link>
                    <button className='noti-mentor text-center px-2 '><  i className="fa-regular fa-bell mentor-drop"></i></button>
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
    </div>
    </>
    }
</>
  )
}

export default MentorRootLayout


function TimeSlots({show,handleClose}) {
    const EnrolledCourses = useSelector((state)=>state.AllEnrolls)
    const MentorCourses = useSelector((state)=>state.MentorCourses)
    const mentorId = jwtDecode(localStorage.getItem('access')).user_id
    const dispatch = useDispatch()
    console.log(mentorId)

    useEffect(()=>{
        dispatch(fetchAllEnrolledCourses())
        dispatch(fetchMentorCourse())
    },[dispatch])

    const mentorCourseSet = new Set()
    MentorCourses.courses.filter((course)=>course.mentor === mentorId).map((course)=>{
        if (!mentorCourseSet.has(course.id)){
            mentorCourseSet.add(course.id)
        }
    })
    const DateMap = {}

    EnrolledCourses.enrolls
  .filter((enroll) => mentorCourseSet.has(enroll.course))
  .forEach((course) => {
    DateMap[course.id] = course.next_review_date;
  });
  
  const [dates, setDates] = useState([]);
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    const newDates = [];
    EnrolledCourses.enrolls
      .filter((enroll) => enroll.next_review_date == value)
      .forEach((course) => {
        newDates.push(course.review_time);
      });
      setDates(newDates)
  }, [dates]);
  console.log(dates,'hi')
  
return (
      <>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton className='p-3'>
            <Modal.Title>Time slots</Modal.Title>
          </Modal.Header>
          <Modal.Body className='p-2'>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Scheduled Review Dates</Form.Label>
                
                <Form.Select aria-label="Default select example" onChange={handleChange}>
                    <option >Choose review date</option>
                    {Object.entries(DateMap).map(([id, date]) => (
                    <option key={id} value={date}>{date}</option>
                    ))}                
                    </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Review Times</Form.Label>
                {dates.map((date)=>(

                <h4>
                    {date?
                   <Badge bg="" style={{backgroundColor:'#12A98E'}} className='p-1'>{date}</Badge>:
                   <Badge bg="secondary"  className='p-1'>Time not Scheduled</Badge>
                    }
                </h4>
                ))}
                
                
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose} className='p-1'>
              Close
            </Button>
            
          </Modal.Footer>
        </Modal>
      </>
    );
  }



