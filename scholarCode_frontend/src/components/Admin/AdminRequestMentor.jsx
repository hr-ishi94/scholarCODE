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
import { mentorDeleteInstance, mentorStatusInstance } from '../../Axios/AdminServer/AdminServer'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const AdminRequestMentor = () => {

  const [approvalModalShow, setApprovalModalShow] = React.useState(false);
  const [rejectModalShow, setRejectModalShow] = React.useState(false);

  const params = useParams()
  const [mentorRequest, setMentorRequest] = useState([])

  const dispatch = useDispatch()
  const {mentor, status, error} = useSelector((state) => state.Mentor)
  const navigate = useNavigate()
  
  if (error && error.trim().length>0){
    toast.error(error)
  }
  
  useEffect(()=>{
  dispatch(fetchMentor(params.id))  
  if(mentor?.length!==0){
    setMentorRequest(mentor)
  }

   },[dispatch])
  
   
  


  


  return (
    <>
      <div className='mentor-section'>
        <Row>
        <Col sm={4} className='text-center'>
          <Image src={avatar} className='w-50 mx-3' roundedCircle />
          <br />
          <h4>{mentorRequest.username}</h4>
          <h6>{mentorRequest.email}</h6>
          <h6>{mentorRequest.designation}</h6>
        </Col>
        <Col sm={8} >
          <h3>Mentor Details</h3>
          <br />
          
            
            <label className='m-2'>First name: {mentorRequest.first_name}</label>
            <br />
            <label className='m-2'>Last name: {mentorRequest.last_name}</label>
            <br />
            <label className='m-2'>Email: {mentorRequest.email}</label>
            <br />
            <label className='m-2'>Designation: {mentorRequest.designation}</label>
            <br />
            <label className='m-2'>LinkedIn ID: {mentorRequest.linkedin_profile}</label>
            <br />
            <br />
            
            <Button className='p-2 w-25 ' variant='success' onClick={() => setApprovalModalShow(true)}>Approve</Button>
            <Button className='p-2 w-25 mx-3' variant='danger' onClick={()=> setRejectModalShow(true)} > Reject </Button>

        </Col>

        </Row>
      </div>
      {/* <Button variant="primary" onClick=>
        Launch vertically centered modal
      </Button> */}

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
      const res = await mentorStatusInstance(id,updateStaff)
      console.log("new mentor selected")
      dispatch(mentorApproval())
      console.log("new mentor selecteds")
      navigate('/admin/mentors/')
      toast.success(`${props.mentor.first_name} have been approved`)
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
        <Button onClick={handleApproval}>Confirm</Button>
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
      console.log("mentor deleted successfully!")
      
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
        <Button onClick={handleRejection} variant='warning'>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
}

