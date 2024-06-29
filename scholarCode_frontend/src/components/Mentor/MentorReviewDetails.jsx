import React, { useEffect, useState } from 'react'
import  Row  from 'react-bootstrap/Row'
import  Col from 'react-bootstrap/Col'
import  Button  from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import  Table  from 'react-bootstrap/Table'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../../Redux/Slices/UserDetailsSlice'
import { enrollPut, fetchEnrolledCourses } from '../../Redux/Slices/Userside/EnrolledCoursesSlice'
import { fetchReviewMarks } from '../../Redux/Slices/mentorSide/ReviewMarkSlice';
import { ReviewMarkPost } from '../../Axios/MentorServer/MentorServer';
import { EnrollCourse, EnrollPut, EnrolledAllCourses } from '../../Axios/UserServer/UserServer';
import { toast } from 'react-toastify';
import { fetchAllEnrolledCourses } from '../../Redux/Slices/Userside/AllEnrolledCoursesSlice';
import { Vurl } from '../../Axios/Urls/EndPoints';
import { fetchCoursesList } from '../../Redux/Slices/CoursesListSlice';
import Loader from '../Utils/Loader';
import ReviewExtendModal from './ReviewExtendModal';

const MentorReviewDetails = () => {
  
  const params = useParams()
  const dispatch = useDispatch()
  const UserSelector = useSelector((state)=>state.userList)
  const MentorCourseSelector = useSelector((state)=>state.MentorCourses)
  const EnrolledCourseSelector = useSelector((state)=>state.EnrolledCourses)
  const CourseSelector = useSelector((state)=>state.Courses)
  const ReviewMarkSelector = useSelector((state)=>state.ReviewMarks)

  
  function getFormattedDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  // Function to get formatted time
  function getFormattedTime() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }
  const [currentDate, setCurrentDate] = useState(getFormattedDate());
  const [currentTime, setCurrentTime] = useState(getFormattedTime());

  useEffect(()=>{
    dispatch(fetchAllEnrolledCourses())  
    dispatch(fetchReviewMarks())
    dispatch(fetchCoursesList())

    const dateInterval = setInterval(() => {
      setCurrentDate(getFormattedDate());
    }, 24 * 60 * 60 * 1000); // Update the date every 24 hours

    const timeInterval = setInterval(() => {
      setCurrentTime(getFormattedTime());
    }, 1000); // Update the time every second

    // Cleanup intervals on component unmount
    return () => {
      clearInterval(dateInterval);
      clearInterval(timeInterval);
    };
    
  },[dispatch])
  
  const [CurrCourse] = EnrolledCourseSelector.enrolls.filter((course)=>course.id == params.id)
  const[ mentorCourse ]= MentorCourseSelector.courses.filter((course)=>course.id == CurrCourse.course)
  
  const CourseName = ()=>{
    const res = MentorCourseSelector.courses.find((course)=> course.id === CurrCourse.course)
    const course = CourseSelector.courses.find((crs)=>crs.id === res.course)
    return course.name
  }
  const course = CourseName()

  const ReviewMarksList = ReviewMarkSelector.marks.filter((n)=>n.course === CurrCourse.id && n.user === CurrCourse.user)
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
    handleReviewButton()  
  };
  
  const [extendModalShow,setExtendModalShow] = useState(false)
  
  const handleExtendShow = () => setExtendModalShow(true)
  const handleExtendClose = () => setExtendModalShow(false) 
  

  const [button,setButton] = useState(true)
  const handleReviewButton = () => setButton(!button)
  
  const [review, setReview] = useState(false);
  
  const handleConfirmClose = () => setReview(false);

  const handleConfirmShow = () => {
    handleReviewButton()  
    setReview(true)
    };

    const [currTime,setCurrTime] = useState(CurrCourse.review_time)  
    
    const isDisabled = !((currentTime >= currTime ) && (currentDate === CurrCourse.next_review_date))
    const TimeChange = (e)=>{
        const {name,value} = e.target
        setCurrTime(value)
      
      }
    const handleTimeSubmit = async()=>{
      try {
        const time = {
          ...CurrCourse,
          review_time:currTime
        }
        const ne = await EnrollPut(CurrCourse.user,time)
        console.log(ne.data,CurrCourse.id,'kiii')
        const payload = { enroll_id: CurrCourse.id, formData: ne.data };
        dispatch(enrollPut(payload));
        toast.success('Review Time has been scheduled')

      }catch(error){
        console.log(error,'error')
      }

    }

    if(EnrolledCourseSelector.status === 'loading'){
      return <Loader/>
    }

  const style = {
    position: "absolute",
    left: "350px",
    right: "100px",
    top: "100px"
    }
  return (
    <div style={style}>
      <h1>Review Details</h1>
      <Row>
        <Col>
        
      <br />
      {UserSelector.users.filter((user)=>user.id === CurrCourse.user).map((user)=><>
      <h5>Student Name:  <strong>  {user.first_name} {user.last_name}</strong></h5>
      <Link to={`/mentor/user/${user.id}/`}><Button className='pb-2 text-primary' variant=''>View User Details</Button></Link>
      </>
      )}
      <h6>Course Enroll ID:  <strong>  {CurrCourse.enroll_id}</strong></h6>
      <br />
      <h5>Course Name:  <strong>  {course}</strong></h5>
      {/* {CourseSelector.courses.filter((crs)=>crs.id === CurrCourse.course).map((n)=>
      )} */}
      <br />
      {!CurrCourse.is_completed ?
    <>
      <h5>Current module:  <strong>  {CurrCourse.curr_module}</strong></h5>
      <br />
      
      <h5>Upcoming Review Date:  
      <input type="date" value={CurrCourse.next_review_date} disabled/></h5>
      <br />
      <h5>Time scheduled:  <strong>  <input type='time' min="09:00" name='review_time' max="18:00" onChange={TimeChange} value={currTime?currTime:null}></input></strong>
      <Button className='mx-1 p-1 text-light' variant='' onClick={handleTimeSubmit} style={{backgroundColor:"#12A98E"}} > <i className="fa-solid fa-check "></i></Button></h5>
      
        {
          (!currTime && CurrCourse.next_review_date === currentDate ) &&

        <p className='text-danger'><i className="fa-solid fa-circle-exclamation"></i> Please Schedule the time for today's review</p>
        }
      <br />
      <Row className='mx-5'>
      
       <Col sm={4}>
       
      {
        button &&
        <>
        <Button className='p-2 text-light' style={{backgroundColor:"#12A98E"}} variant='' onClick={handleConfirmShow} disabled={isDisabled}>Conduct Review</Button>
        {!isDisabled && <p className='text-danger'><i className="fa-solid fa-circle-exclamation"></i> Please Conduct the review now!</p>}
        </>
        
      }
      <ReviewConfirmModal handleConfirmClose={handleConfirmClose} review={review} userid = {CurrCourse.user} mentorid = {mentorCourse.mentor} courseid = {params.id}/>
      {
        ! button && 
        <Button className='p-2 text-light' style={{backgroundColor:'#12A98E'}} variant='' onClick={handleShow}>Submit Review</Button>
      }
   
      </Col>
      <Col sm={4}>
        <Button className='p-2' onClick={handleExtendShow}>Extend Review</Button>
        <ReviewExtendModal show={extendModalShow} handleClose= {handleExtendClose} course= {CurrCourse}/>
      </Col>
      <Col>
        
      <ReviewMarkModal handleClose={handleClose} show={show} CurrCourse = {CurrCourse} module={CurrCourse.curr_module} user={CurrCourse.user} course={CurrCourse.id} review_date= {CurrCourse.next_review_date} />
      </Col>
      </Row>

  </>
  :
      <>
      <p style={{color:"#12A98E"}}>Candidate Completed the course please Issue the Certificate. <i className="fa-solid fa-circle-check"></i></p>
      <Col sm={4}>
      <Button className='p-2 text-light' style={{backgroundColor:'#12A98E'}} variant='' >Issue Certificate</Button>
      </Col>
      </>
      }
      </Col>

      <Col>
      <Row className='m-1'>
        <Col sm={10}>
          <h5><strong> Review Marks</strong></h5>        
        </Col>

        <Col sm={2}>
       </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No.</th>
            <th>Module Number</th>
            <th>Mark Scored (Out of 50)</th>
          </tr>
        </thead>
        <tbody>
        {ReviewMarksList && ReviewMarksList.map((n,index)=>
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{n.module}</td>
            <td>{n.mark}</td>
          </tr>
        )}
        
        </tbody>


      </Table>
      </Col>
    </Row>
    </div>
  )
}

export default MentorReviewDetails


function ReviewMarkModal({handleClose,show,CurrCourse}) {
  const CourseSelector = useSelector((state) =>state.Course)
  const [formData,setFormData] =useState({
    module:CurrCourse.curr_module,
    user:CurrCourse.user,
    course:CurrCourse.id,
    mark:null

  })

  let curr_module = CurrCourse.current_module 
  let is_completed = CurrCourse.is_completed

  for(let i = 1 ; i<=CurrCourse.total_modules +1; i++){

    if(CurrCourse.curr_module == i){
      curr_module = i++
    }

    if (curr_module == CurrCourse.total_modules+1){
      is_completed = true
      break
    } 

  }
  // console.log(is_completed?'sd':'sfffffffff')
  const dispatch = useDispatch()
  const addDays = (dateString, days) => {
  const date = new Date(dateString);
    date.setDate(date.getDate() + days);
  
    // Format the date back to YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };



  const  enrollForm={
    ...CurrCourse,
    curr_module,
    is_completed,
    next_review_date: addDays(CurrCourse.next_review_date,7),
    review_time: null,
    vcall_link:null
  }
  

  const handleSubmit = async()=>{
    try{
      const res = await ReviewMarkPost(formData)
      const ne = await EnrollPut(CurrCourse.user,enrollForm)
      // console.log(res,'s.ll')
      
      if (res.id){
        const payload = { 
          enroll_id: CurrCourse.id,
          formData: ne.data 
        };
        dispatch(enrollPut(payload));
        toast.success('Mark added successfully')
      }else {  
        toast.error('Enter mark in between 0 and 50')
          }
          
          }catch(error){
            console.log(error.response,'ss')
            }
      
            handleClose()
            dispatch(fetchReviewMarks())

            

            
  }

  const handleChange = (e)=>{
    const {name, value} = e.target
    setFormData((prevData)=>
      ({
        ...prevData,
      [name] : Number(value) 
   }) )
  }

  return (
    <>

      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton className='p-3'>
          <Modal.Title>Review Mark</Modal.Title>
        </Modal.Header>
        <Modal.Body className='p-2'>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Module</Form.Label>
              <Form.Control
                type="text"
                value={formData.module}
                disabled
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Mark Scored (Out of 50)</Form.Label>
              <Form.Control
                type="number"
                onChange={handleChange}
                name='mark'
                value={formData.mark}
                autoFocus
                max={50}
                min={0}
              />
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer className='p-2'>
          <Button variant="secondary" onClick={handleClose} className='p-1'>
            Close
          </Button>
          <Button variant="" onClick={handleSubmit} className='p-1 text-light'style={{backgroundColor:"#12A98E"}} >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


function ReviewConfirmModal({handleConfirmClose,review,userid, mentorid,courseid}) {
  const navigate = useNavigate()
  const url = `${Vurl}meeting/${userid}/${mentorid}/${courseid}/`
  // console.log(url,'s')
  const handleConfirm = ()=>{
    // navigate(``)
    window.open(`${Vurl}meeting/${userid}/${mentorid}/${courseid}/`)
    handleConfirmClose()
  }
  
  return (
    <>
     

      <Modal show={review} onHide={handleConfirmClose} >
        <Modal.Header closeButton className='p-3'>
          <Modal.Title>Conduct Review</Modal.Title>
        </Modal.Header>
        <Modal.Body className='p-1'>Are you ready to conduct the review?</Modal.Body>
        <Modal.Footer className='p-1'>
          <Button variant="secondary" className='p-1' onClick={handleConfirmClose}>
            Close
          </Button>
          <Button variant="" className='p-1 text-light' style={{backgroundColor:'#12A98E'}} onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
