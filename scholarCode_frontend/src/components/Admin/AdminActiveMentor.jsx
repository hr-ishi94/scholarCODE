import React,{useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import avatar from '../../assets/avatar.jpg'
import './AdminActiveMentor.css'
// import {Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMentor, mentorReject, mentorStatus } from '../../Redux/Slices/MentorDetailSlice'
import { toast } from 'react-toastify'
import Loader from '../Utils/Loader'
import { mentorDeleteInstance, mentorStatusInstance } from '../../Axios/AdminServer/AdminServer'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const AdminActiveMentor = () => {
  const params = useParams()
  const [mentorDetail, setMentorDetail] = useState([])

  const [modalShow, setModalShow] = useState(false);
  const [deleteModal,setDeleteModal] = useState(false)
  
  const dispatch = useDispatch()
  const {mentor,status, error} = useSelector((state)=>state.Mentor)
  useEffect(()=>{
    dispatch(fetchMentor(params.id))
    if (mentor?.length!==0){
      setMentorDetail(mentor)
    }
  },[dispatch])
  
  if(error && error.trim().length>0){
    toast.error(error)
  }
  
  if (status === "loading") {
    return <Loader/>;
  }

  

  return (
      <div className='mentor-section'>
        <Row>
        <Col sm={4} className='text-center'>
          <Image src={avatar} className='w-50 mx-3'roundedCircle />
          <br />
          <h4>{mentorDetail.username}</h4>
          <h6>{mentorDetail.email}</h6>
          <h6>{mentorDetail.designation}</h6>
        </Col>
        <Col sm={6} >
          <h3>Mentor Details</h3>
          <br />
          
            
            <label className='m-2'>First name: {mentorDetail.first_name}</label>
            <br />
            <label className='m-2'>Last name: {mentor.last_name}</label>
            <br />
            <label className='m-2'>Email: {mentorDetail.email}</label>
            <br />
            <label className='m-2'>Designation: {mentorDetail.designation}</label>
            <br />
            <label className='m-2'>LinkedIn ID: {mentorDetail.linkedin_profile}</label>
            <br />
            <label className='m-2'>No. of courses assigned: </label>
            <br />
            <label className='m-2'>Status:{mentor.isActive?<span className='bg-success p-1'> ACTIVE</span>:<span className='bg-danger p-1'> INACTIVE</span>}</label>
            <br />
            <Button className='p-2' variant={mentor.isActive?"danger":"success"} onClick={() => setModalShow(true)}>{mentor.isActive?"Block":"UnBlock"}</Button>
          <br />
          <br />
          {/* <h4>Courses Assigned</h4>
          <br />
          <ul>
            <li>course1 <Button className='p-1 bg-danger'>X</Button></li>
            <li>course1 <Button className='p-1 bg-danger'>X</Button></li>
            <li>course1 <Button className='p-1 bg-danger'>X</Button></li>
          </ul>

          */}
          
        </Col>
        <Col sm={2}>
        <Button className='p-2'variant='outline-danger' onClick={()=>setDeleteModal(true)}>Delete Mentor</Button></Col>

        </Row>
        

      <MentorStatusModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        mentor = {mentor}
        id = {params.id}
      />

      <MentorDeleteModal
        show = {deleteModal}
        onHide= {() => setDeleteModal(false)}
        mentor = {mentor}
        id = {params.id}

      />
      </div>

  )
}

export default AdminActiveMentor


const MentorDeleteModal = (props)=>{
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const deleteMentor = async ()=>{
    try{
      const id = props.id
      const res = await mentorDeleteInstance(id)
      console.log("mentor deleted successfully")
      dispatch(mentorReject())
      navigate('/admin/mentors/')
      toast.success(`${props.mentor.first_name} have been deleted successfully` )
   
    }catch(error){
      toast.error('Failed to delete the mentor')
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
          Are you sure you want to delete {props.mentor.first_name}?
        </p>
      </Modal.Body>
      <Modal.Footer className='p-2'>
        <Button className='p-2' variant='warning' onClick={deleteMentor}>Confirm</Button>
      </Modal.Footer>
    </Modal>

  )
}


function MentorStatusModal(props) {
  const id = props.id
  const status = props.mentor.isActive?"block":"unblock"
  const dispatch = useDispatch()
  const changeStatus = async()=>{
    try{
      const statusUpdate = {isActive:!props.mentor.isActive}
      const response = await mentorStatusInstance(id,statusUpdate)
      console.log("mentorupdate response",response.data)
      dispatch(mentorStatus())
      console.log(props.mentor.isActive)
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

