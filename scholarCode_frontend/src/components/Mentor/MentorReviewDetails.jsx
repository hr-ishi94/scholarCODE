import React, { useEffect, useState } from 'react'
import  Row  from 'react-bootstrap/Row'
import  Col from 'react-bootstrap/Col'
import  Button  from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import  Table  from 'react-bootstrap/Table'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../../Redux/Slices/UserDetailsSlice'
import { enrollPut, fetchEnrolledCourses } from '../../Redux/Slices/Userside/EnrolledCoursesSlice'
import { fetchReviewMarks } from '../../Redux/Slices/mentorSide/ReviewMarkSlice';
import { ReviewMarkPost } from '../../Axios/MentorServer/MentorServer';
import { EnrollCourse, EnrollPut, EnrolledAllCourses } from '../../Axios/UserServer/UserServer';
import { toast } from 'react-toastify';
import { fetchAllEnrolledCourses } from '../../Redux/Slices/Userside/AllEnrolledCoursesSlice';
import { Vurl } from '../../Axios/Urls/EndPoints';

const MentorReviewDetails = () => {
  
  const params = useParams()
  const dispatch = useDispatch()
  const UserSelector = useSelector((state)=>state.userList)
  const MentorCourseSelector = useSelector((state)=>state.MentorCourses)
  const EnrolledCourseSelector = useSelector((state)=>state.EnrolledCourses)
  const ReviewMarkSelector = useSelector((state)=>state.ReviewMarks)
  
  useEffect(()=>{
    dispatch(fetchAllEnrolledCourses())  
    dispatch(fetchReviewMarks())
    },[dispatch])
  
  const [CurrCourse] = EnrolledCourseSelector.enrolls.filter((course)=>course.id == params.id)
  const[ mentorCourse ]= MentorCourseSelector.courses.filter((course)=>course.id == CurrCourse.course)
  console.log(mentorCourse.mentor,'sddd')
  console.log(CurrCourse,'sd')
  const ReviewMarksList = ReviewMarkSelector.marks.filter((n)=>n.course === CurrCourse.id && n.user === CurrCourse.user)
  
  console.log(ReviewMarksList)
  
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
    handleReviewButton()  
    };
    const [button,setButton] = useState(true)
    const handleReviewButton = () => setButton(!button)
    
    const [review, setReview] = useState(false);
    
    const handleConfirmClose = () => setReview(false);
    const handleConfirmShow = () => {
      handleReviewButton()  
      setReview(true)
      };
      
    const [currTime,setCurrTime]=useState( CurrCourse.next_review_time?CurrCourse.next_review_time.time:'') 
  console.log(currTime,'cirry')

    const TimeChange = (e)=>{
        const {name,value} = e.target
        setCurrTime(value)
      
      }
    const handleTimeSubmit = async()=>{
      try {
        const res = await EnrollPut(CurrCourse.user,{next_review_time:currTime})
        

      }catch(error){
        console.log(error,'error')
      }

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
      {UserSelector.users.filter((user)=>user.id === CurrCourse.user).map((user)=>
      <h5>Student Name:  <strong>  {user.first_name} {user.last_name}</strong></h5>
      )}
      <h6>Course Enroll ID:  <strong>  {CurrCourse.enroll_id}</strong></h6>
      <br />
      <h5>Course Name:  <strong>  {CurrCourse.course}</strong></h5>
      <br />
      {!CurrCourse.is_completed ?
    <>
      <h5>Current module:  <strong>  {CurrCourse.curr_module}</strong></h5>
      <br />
      
      <h5>Upcoming Review Date:  <strong className='text-primary'>  {CurrCourse.next_review_date}</strong></h5>
      <input type="date" value={CurrCourse.next_review_date} />
      <br />
      <input type="time" min="09:00" max='18:00' value={CurrCourse.next_review_time ?CurrCourse.next_review_time.time: null } />


      <h5>Time scheduled:  <strong>  <input type='time' min="09:00" name='next_review_time' max="18:00" onChange={TimeChange} value={currTime && currTime}></input></strong><Button className='mx-1 p-1 text-light' variant='' onClick={handleTimeSubmit} style={{backgroundColor:"#12A98E"}} > <i className="fa-solid fa-check "></i></Button></h5>
      
      <br />
      <Row className='mx-5'>
      
       <Col sm={4}>
      {
        button &&
        <Button className='p-2 text-light' style={{backgroundColor:"#12A98E"}} variant='' onClick={handleConfirmShow}>Conduct Review</Button>
      
        }
    <ReviewConfirmModal handleConfirmClose={handleConfirmClose} review={review} userid = {CurrCourse.user} mentorid = {mentorCourse.mentor} courseid = {params.id}/>
      {
        ! button && 
        <Button className='p-2 text-light' style={{backgroundColor:'#12A98E'}} variant='' onClick={handleShow}>Submit Review</Button>
        }
      </Col>
      <Col sm={4}>
      <Button className='p-2'>Extend Review</Button>
      </Col>
      <Col>
        
      <ReviewMarkModal handleClose={handleClose} show={show} CurrCourse = {CurrCourse} module={CurrCourse.curr_module} user={CurrCourse.user} course={CurrCourse.id} review_date= {CurrCourse.next_review_date} />
      </Col>
      </Row>

  </>:
      <>
      <p className='text-primary'>Candidate Completed the course please Issue the Certificate.</p>
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
  console.log(CurrCourse,'edi')
  const [formData,setFormData] =useState({
    module:CurrCourse.curr_module,
    user:CurrCourse.user,
    course:CurrCourse.id,
    mark:null

  })
  let curr_module = CurrCourse.curr_module 
  let is_completed = CurrCourse.is_completed
  for(let i = 1;i<=CurrCourse.total_modules +1; i++){
    if(CurrCourse.curr_module == `module ${i}`){
      curr_module = `module ${i+1}`
    }
    if (curr_module == `module ${CurrCourse.total_modules+1}`){
      is_completed = true
      break
    } 
  }
  console.log(is_completed?'sd':'sfffffffff')
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
    next_review_time: null,
    vcall_link:null
  }
  console.log(CurrCourse.id,'sed')
  

  const handleSubmit = async()=>{
    try{
      const res = await ReviewMarkPost(formData)
      const ne = await EnrollPut(CurrCourse.user,enrollForm)
      // console.log(res,'s.ll')
      
      if (res.id){
        toast.success('Mark added successfully')
        }else {  
          toast.error('Enter mark in between 0 and 50')
          }
          
          }catch(error){
            console.log(error.response,'ss')
            }
      
            handleClose()
            dispatch(fetchReviewMarks())
            // dispatch(fetchEnrolledCourses(CurrCourse.user))
            dispatch(enrollPut(CurrCourse.id,ne))
  }

  const handleChange = (e)=>{
    const {name, value} = e.target
    setFormData((prevData)=>
      ({
        ...prevData,
      [name] : Number(value) 
   }) )
  }
// console.log(formData,'sdf')

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
  console.log(url,'s')
  const handleConfirm = ()=>{
    navigate(`/meeting/${userid}/${mentorid}/${courseid}/`)
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
