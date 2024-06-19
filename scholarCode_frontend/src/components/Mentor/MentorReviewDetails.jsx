import React, { useEffect, useState } from 'react'
import  Row  from 'react-bootstrap/Row'
import  Col from 'react-bootstrap/Col'
import  Button  from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import  Table  from 'react-bootstrap/Table'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../../Redux/Slices/UserDetailsSlice'
import { fetchEnrolledCourses } from '../../Redux/Slices/Userside/EnrolledCoursesSlice'
import { fetchReviewMarks } from '../../Redux/Slices/mentorSide/ReviewMarkSlice';
import { ReviewMarkPost } from '../../Axios/MentorServer/MentorServer';
import { EnrollCourse, EnrollPut } from '../../Axios/UserServer/UserServer';

const MentorReviewDetails = () => {
  
  const params = useParams()
  const dispatch = useDispatch()
  const UserSelector = useSelector((state)=>state.userList)
  const MentorCourseSelector = useSelector((state)=>state.MentorCourses)
  const EnrolledCourseSelector = useSelector((state)=>state.EnrolledCourses)
  const ReviewMarkSelector = useSelector((state)=>state.ReviewMarks)
  useEffect(()=>{
    dispatch(fetchEnrolledCourses())  
    dispatch(fetchReviewMarks())
    },[])
    const [CurrCourse] = EnrolledCourseSelector.enrolls.filter((course)=>course.id == params.id)
    const CourseId = MentorCourseSelector.courses.filter((course)=>course.id == CurrCourse.course)
  console.log(CourseId,'sddd')
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

      <br />
      <h5>Course Name:  <strong>  {CurrCourse.course}</strong></h5>
      <br />
      <h5>Current module:  <strong>  {CurrCourse.curr_module}</strong></h5>
      <br />
      <h5>Upcoming Review Date:  <strong className='text-primary'>  {CurrCourse.next_review_date}</strong></h5>
      <br />
      <h5>Time scheduled:  <strong>  {CurrCourse.next_review_time ?CurrCourse.next_review_time.time :<input type='time' min="09:00" max="18:00"></input>}</strong></h5>
      <br />
      <Row className='mx-5'>
      <Col sm={4}>
      {
        button &&
      <Button className='p-2 text-light' style={{backgroundColor:"#12A98E"}} variant='' disabled onClick={handleReviewButton}>Conduct Review</Button>
      }
      {/* {
       ! button &&
       } */}
      <Button className='p-2 text-light' style={{backgroundColor:'#12A98E'}} variant='' onClick={handleShow}>Submit Review</Button>
      </Col>
      <Col sm={4}>
      <Button className='p-2'>Extend Review</Button>
      </Col>
      <Col>
        
      <ReviewMarkModal handleClose={handleClose} show={show} CurrCourse = {CurrCourse} module={CurrCourse.curr_module} user={CurrCourse.user} course={CurrCourse.id} review_date= {CurrCourse.next_review_date} />
      </Col>
      </Row>

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
    module:CurrCourse
    next_review_date: addDays(CurrCourse.next_review_date,7),
    next_review_time: null
  }
  console.log(enrollForm,'sed')

  const handleSubmit = async()=>{
    const res = await ReviewMarkPost(formData)
    const ne = await EnrollPut(enrollForm)
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
console.log(formData,'sdf')

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
