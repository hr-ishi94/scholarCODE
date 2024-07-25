import React,{useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import avatar from '../../assets/avatar.jpg'
import './AdminActiveMentor.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMentor, mentorReject, mentorStatus } from '../../Redux/Slices/MentorDetailSlice'
import { toast } from 'react-toastify'
import Loader from '../Utils/Loader'
import { mentorStatusInstance } from '../../Axios/AdminServer/AdminServer'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { fetchMentorCourse } from '../../Redux/Slices/mentorSide/MentorCourseSlice'
import { fetchCoursesList } from '../../Redux/Slices/CoursesListSlice'
import { Table } from 'react-bootstrap'
import MentorReviewCount from './MentorReviewCount'


const AdminActiveMentor = () => {
  const params = useParams()
  const [mentorDetail, setMentorDetail] = useState([])

  const [modalShow, setModalShow] = useState(false);
  
  const dispatch = useDispatch()
  const {mentor, status, error} = useSelector((state)=>state.Mentor)
  const MentorCourseSelector = useSelector((state)=>state.MentorCourses)
  const CourseSelector = useSelector((state)=>state.Courses)

  useEffect(()=>{
    dispatch(fetchMentor(params.id))
    dispatch(fetchMentorCourse())
    dispatch(fetchCoursesList())
   
  },[dispatch])
  
  const mentorCourse = MentorCourseSelector.courses.filter((course)=>course.mentor === mentor.id)
  console.log(mentorCourse,'loi')
  console.log(CourseSelector.courses,'lo')
  
  if (status === "loading") {
    return <Loader/>;
  }

  

  return (
      <div className='mentor-section'>
        <Row>
        <Col sm={3} className='text-center'>
          <Image src={avatar} className='w-50 mx-3'roundedCircle />
          <br />
          <h4>{mentor.username}</h4>
          <h6>{mentor.email}</h6>
          <h6>{mentor.designation}</h6>
        </Col>
        <Col sm={4} >
          <h3>Mentor Details</h3>
          <br />
          

            <label className='m-2'><h6>First name: {mentor.first_name}</h6></label>
            
            <br />
            <label className='m-2'><h6> Last name: {mentor.last_name}</h6></label>
            <br />
            <label className='m-2'><h6> Email: {mentor.email}</h6></label>
            <br />
            <label className='m-2'><h6> Designation: {mentor.designation}</h6></label>
            <br />
            <label className='m-2'><h6> LinkedIn ID: <a href={mentor.linkedin_profile} target='_blank' rel="noopener noreferrer">{mentor.linkedin_profile}</a></h6></label>
            <br />
            <label className='m-2'><h6> No. of courses assigned : <strong>{mentorCourse.length} nos</strong>  </h6></label>
            <br />
            <label className='m-2'><h6> Status:{mentor.is_active?<span className='bg-success p-1'> ACTIVE</span>:<span className='bg-danger p-1'> INACTIVE</span>}</h6></label>
            <br />
            <Button className='p-2' variant={mentor.is_active?"danger":"success"} onClick={() => setModalShow(true)}>{mentor.is_active?"Block":"UnBlock"}</Button>
          <br />
          <br />
          <h4>Courses self Assigned</h4>
          <br />
          <ul>
            {mentorCourse.map((course)=>
              CourseSelector.courses.filter((crs)=>crs.id == course.course).map((crs)=>
                <li>{crs.name} </li>
              )
            )}
          </ul>

         
          
        </Col>
        <Col sm = {5}>
        <MentorReviewCount mentor_id = {mentor.id}/>
        </Col>
        
        </Row>
        

      <MentorStatusModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        mentor = {mentor}
        id = {params.id}
      />
      </div>

  )
}

export default AdminActiveMentor




function MentorStatusModal(props) {
  const id = props.id
  const status = props.mentor.is_active?"block":"unblock"
  const dispatch = useDispatch()
  const changeStatus = async()=>{
    try{
      const statusUpdate = {is_active:!props.mentor.is_active}
      const response = await mentorStatusInstance(id,statusUpdate)
      console.log("mentorupdate response",response.data)
      dispatch(mentorStatus())
      console.log(props.mentor.is_active)
      props.onHide()
    }
    catch(error){
      console.log("error is updating user status",error)
    }
    
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className='p-3'>
        <Modal.Title id="contained-modal-title-vcenter">
          Mentor status
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='p-3'>
        <p>
          Are you sure you want to {status} {props.mentor.first_name}?
        </p>
      </Modal.Body>
      <Modal.Footer className='p-2'>
        <Button className='p-2' variant='warning' onClick={changeStatus}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
}

