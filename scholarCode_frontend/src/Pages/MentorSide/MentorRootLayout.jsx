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
import { MentorLogin, mentorLogout } from '../../Redux/Slices/MentorAuthSlice';
import { jwtDecode } from 'jwt-decode';
import { clearMentor, fetchMentor } from '../../Redux/Slices/MentorDetailSlice';
import { TimePicker } from '@mui/x-date-pickers';
import Badge from 'react-bootstrap/Badge';
import { fetchEnrolledCourses } from '../../Redux/Slices/Userside/EnrolledCoursesSlice';
import { fetchAllEnrolledCourses } from '../../Redux/Slices/Userside/AllEnrolledCoursesSlice';
import { fetchMentorCourse } from '../../Redux/Slices/mentorSide/MentorCourseSlice';
import { addTime, fetchMentortimings } from '../../Redux/Slices/MentorTimingSlice';
import { FastForward } from '@mui/icons-material';
import { MentorPostReviewTimings } from '../../Axios/MentorServer/MentorServer';
import { toast } from 'react-toastify';

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
                
                    <Link 
                      className=' text-light react-router-link px-3 mt-3'
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content=" Wallet "
                      data-tooltip-place="top">
                      <i className="fa-solid fa-wallet"></i>
                    </Link>
                    <Link 
                      className=' text-light react-router-link px-3 mt-3'
                      onClick={handleShow}
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Time slots"
                      data-tooltip-place="top">
                      <i className="fa-solid fa-clock"></i>
                    </Link>
                    <TimeSlots show={timeSlotModal} handleClose={handleClose}/>
                    <Link to={'/chat/'} 
                      className=' text-light react-router-link px-3 mt-3' 
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Messages"
                      data-tooltip-place="top">
                      <i className="fa-solid fa-message"></i>
                    </Link>

                    <Link  
                      className=' text-light react-router-link px-3 mt-3'
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Notification"
                      data-tooltip-place="top">
                      <i className="fa-solid fa-bell"></i>
                      </Link>
                    <Dropdown className='mt-3 px-3  ' >
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
        <Link to={'/mentor/dashboard/'} className="react-router-link text-dark"><h2 className='aside-content'>Dashboard</h2></Link>
        <Link to={'/mentor/reviews/'} className="react-router-link text-dark"><h2 className='aside-content'>Reviews List</h2></Link>
        <Link to={'/mentor/courses/'} className="react-router-link text-dark"><h2 className='aside-content'>Courses Assigned</h2></Link>
        <Link to={'/mentor/users/'} className="react-router-link text-dark"><h2 className='aside-content'>Users Assigned</h2></Link>
    </div>
    </>
    }
</>
  )
}

export default MentorRootLayout

function TimeSlots({ show, handleClose }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.MentorToken);
  const access = jwtDecode(token.access);
  const mentorId = access.user_id;
  const TimingSelector = useSelector((state) => state.MentorTimings);
  const [selectedDate, setSelectedDate] = useState('');
  const [createSlot,setCreateSlot] = useState(false)

  const OpenCreateSlot = ()=> setCreateSlot(true)
  const CloseCreateSlot = ()=> setCreateSlot(false)


  useEffect(() => {
  
    dispatch(fetchMentortimings(mentorId));
    dispatch(MentorLogin());
  
  }, [dispatch, mentorId]);

  const DateSet = new Set();

  TimingSelector.timings && TimingSelector.timings.forEach((time) => DateSet.add(time.date));
  
  const DateList = [...DateSet];

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const filteredTimings = TimingSelector.timings.filter((time) => (time.date === selectedDate) && !time.booked);
  
  const [formData,setFormData] = useState({
    'mentor':mentorId,
    'date':'',
    'time':'',
    'booked':false
  })

  const handleChange = (e) =>{
    const {name, value} = e.target
    setFormData((prevData)=>({
      ...prevData,
      [name]:value
    }))
    
  }
  
  const handleSubmit = async(e) =>{
    e.preventDefault()
    try{
      if (!formData.date || !formData.time){
        toast.error("All Fields required!")
        return
      }
      const res = await MentorPostReviewTimings(mentorId,formData)
      // console.log(res,'loiii')
      dispatch(addTime(res))
      toast.success('Time slot added')
      CloseCreateSlot()
    }
    catch(error){
      toast.error('Error while adding time')
    }
    
  }
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        
        <Modal.Body className="p-2">
          <Modal.Title>Free Time slots</Modal.Title>
          <Form className='p-2'>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Free Time slots</Form.Label>
              <div>
      <Form.Select aria-label="Default select example" onChange={handleDateChange}>
        <option value="">Choose review date</option>
        {
        DateList.map((date, index) => (
          
          <option key={index} value={date} >
            {date}
          </option>
        ))
        }
      </Form.Select>
    </div>
            </Form.Group>
          </Form>
          {selectedDate && (
            <>
              
                <h5>
                {filteredTimings.map((timing, index) => (
                  
                      <Badge key={timing.id} bg="" style={{ backgroundColor: '#12A98E' }} className="p-1 mx-1">
                          {timing.time} 
                      </Badge>

                
                ))}
                    </h5>
              
            </>
          )}

          
          <Button variant="secondary" onClick={handleClose} className="p-1">
            Close
          </Button>
          <Button variant="" onClick={OpenCreateSlot} style={{backgroundColor:'#12A98E'}} className="p-1 mx-1 text-light">
            Create new time slot
          </Button>
          {createSlot &&
          <Form  className='p-2'>
            
            <h5>New Time slots</h5>
            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" name="date" onChange={handleChange} value={formData.date}/>
            </Form.Group>

            <Form.Group controlId="formTime">
              <Form.Label>Time</Form.Label>
              <Form.Control type="time" name="time" onChange={handleChange} value={formData.time}/>
            </Form.Group>

            <Button variant="" type="submit" className='p-1 my-2 text-light' style={{backgroundColor:'#12A98E'}} onClick={handleSubmit}>
              Submit
            </Button>

        </Form>
        }
        </Modal.Body>
      </Modal>
    </>
  );
}
