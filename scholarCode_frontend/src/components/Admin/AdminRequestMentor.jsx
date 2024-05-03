import React, { useEffect, useState } from 'react'
import './AdminRequestMentor.css'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import avatar from '../../assets/avatar.jpg'
import {Button} from 'react-bootstrap'
import {useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import MentorDetailSlice, { fetchMentor } from '../../Redux/Slices/MentorDetailSlice'
import { toast } from 'react-toastify'


const AdminRequestMentor = () => {
  const params = useParams()
  const [mentorRequest, setMentorRequest] = useState([])

  const dispatch = useDispatch()
  const {mentor, status, error} = useSelector((state)=>state.Mentor)
  
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
          <Image src={avatar} className='w-50 mx-3'roundedCircle />
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
            
            <Button className='p-2 w-25 bg-success ' >Approve</Button>
            <Button className='p-2 w-25 bg-danger mx-3' > Reject </Button>

        </Col>

        </Row>
      </div>
    </>
  )
}

export default AdminRequestMentor