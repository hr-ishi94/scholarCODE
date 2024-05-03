import React,{useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import avatar from '../../assets/avatar.jpg'
import './AdminActiveMentor.css'
import {Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMentor } from '../../Redux/Slices/MentorDetailSlice'
import { toast } from 'react-toastify'

const AdminActiveMentor = () => {
  const params = useParams()
  const [mentorDetail, setMentorDetail] = useState([])

  const dispatch = useDispatch()
  const {mentor,status, error} = useSelector((state)=>state.Mentor)
  if(error && error.trim().length>0){
    toast.error(error)
  }
  
  useEffect(()=>{
    dispatch(fetchMentor(params.id))
    if (mentor?.length!==0){
      setMentorDetail(mentor)
    }
  },[dispatch])
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
        <Col sm={8} >
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
            <label className='m-2'>Status:{mentorDetail.isActive?<span className='bg-success p-1'> ACTIVE</span>:<span className='bg-danger p-1'> INACTIVE</span>}</label>
            <br />
            {mentorDetail.isActive? <Button className='p-2 bg-danger ' > Block </Button>:<Button className='p-2 bg-success ' >Unblock</Button>}
          <br />
          <br />
          <h4>Courses Assigned</h4>
          <br />
          <ul>
            <li>course1 <Button className='p-1 bg-danger'>X</Button></li>
            <li>course1 <Button className='p-1 bg-danger'>X</Button></li>
            <li>course1 <Button className='p-1 bg-danger'>X</Button></li>
          </ul>

          {/* 
          <br />
          */}
          
        </Col>

        </Row>
      </div>
  )
}

export default AdminActiveMentor