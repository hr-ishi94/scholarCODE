import React, { useEffect, useState } from 'react'
import './AdminRequestMentor.css'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import avatar from '../../assets/avatar.jpg'
import {useNavigate, useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import MentorDetailSlice, { fetchMentor, mentorApproval, mentorReject } from '../../Redux/Slices/MentorDetailSlice'
import { toast } from 'react-toastify'
import { mentorApprovalInstance, mentorDeleteInstance, mentorStatusInstance } from '../../Axios/AdminServer/AdminServer'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Loader from '../Utils/Loader'

const AdminRequestMentor = () => {

  const [approvalModalShow, setApprovalModalShow] = useState(false);
  const [rejectModalShow, setRejectModalShow] = useState(false);

  const params = useParams()
  const dispatch = useDispatch()
  const {mentor, status, error} = useSelector((state) => state.Mentor)
  const navigate = useNavigate()
  
  if (error && error.trim().length>0){
    toast.error(error)
  }
  
  useEffect(()=>{
  dispatch(fetchMentor(params.id))  
  

   },[dispatch])

   if (status === "loading") {
    return <Loader />;
  }

  

  return (
    <>
      <div className='mentor-section'>
        <Row>
        <Col sm={4} className='text-center'>
          <Image src={avatar} className='w-50 mx-3' roundedCircle />
          <br />
          <h4>{mentor.username}</h4>
          <h6>{mentor.email}</h6>
          <h6>{mentor.designation}</h6>
        </Col>
        <Col sm={8} >
          <h3>Mentor Details</h3>
          <br />
          
            
            <label className='m-2'>First name: {mentor.first_name}</label>
            <br />
            <label className='m-2'>Last name: {mentor.last_name}</label>
            <br />
            <label className='m-2'>Email: {mentor.email}</label>
            <br />
            <label className='m-2'>Designation: {mentor.designation}</label>
            <br />
            <label className='m-2'>LinkedIn ID: {mentor.linkedin_profile}</label>
            <br />
            <br />
            
            <Button className='p-2 w-25 ' variant='success' onClick={() => setApprovalModalShow(true)}>Approve</Button>
            <Button className='p-2 w-25 mx-3' variant='danger' onClick={()=> setRejectModalShow(true)} > Reject </Button>

        </Col>

        </Row>
      </div>
      

      <ApprovalModal
        show={approvalModalShow}
        onHide={() => setApprovalModalShow(false)}
        mentor={mentor}
        id= {params.id}
      />

      <RejectModal show={rejectModalShow}
      onHide={()=>setRejectModalShow(false)}
      mentor = {mentor}
      id = {params.id}
      />
    </>
  )
}

export default AdminRequestMentor



const ApprovalModal=(props)=> {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleApproval= async ()=>{
    try{
      const id = props.id
      const updateStaff = {is_staff:true}
      const res = await mentorApprovalInstance(id,updateStaff)
      console.log("new mentor selected")
      dispatch(mentorApproval())
      console.log("new mentor selected")
      navigate('/admin/mentors/')
      toast.success(`${props.mentor.first_name} have been approved. Verification mail has been sent to the mentor.`)
    }catch(error){
      toast.error("Failed to accept the mentor")
    }
  
  }

  return (
    <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    >
      <Modal.Header closeButton className='p-2'>
        <Modal.Title id="contained-modal-title-vcenter">
        <h4 style={{color:"#12A98E"}}>Delete mentor Request</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='p-2'>
       
        <p>
         Are you sure you want to Accept the mentor?
        </p>
      </Modal.Body>
      <Modal.Footer className='p-2'>
        <Button onClick={handleApproval} className='p-1' variant='success'>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
}

const RejectModal=(props)=> {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleRejection = async ()=>{

    try{

      const id = props.id 
      const res = await mentorDeleteInstance(id)
      dispatch(mentorReject())
      navigate('/admin/mentors/')
      toast.success(`${props.mentor.first_name} have been rejected successfully`)

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
      <Modal.Header closeButton className='p-2'>
        <Modal.Title id="contained-modal-title-vcenter">
        <h4 style={{color:"#12A98E"}}>Delete mentor Request</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='p-2'>
       
        <p>
         Are you sure you want to Reject the mentor?
        </p>
      </Modal.Body>
      <Modal.Footer className='p-2'>
        <Button onClick={handleRejection} className='p-1' variant='warning'>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
}

