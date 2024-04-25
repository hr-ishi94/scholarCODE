import React,{useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import avatar from '../../assets/avatar.jpg'
import './AdminActiveMentor.css'
import {Button} from 'react-bootstrap'
import axios from 'axios'

const baseUrl = 'http://127.0.0.1:8000/'

const AdminActiveMentor = () => {
  const params = useParams()
  const [mentor, setMentor] = useState([])
  
  useEffect(()=>{
    
    async function mentorFetch(){
      const response = await axios.get(`${baseUrl}/main/mentor/${params.id}`)
      setMentor(response.data)
    }
    mentorFetch()
  },[])
  return (
      <div className='mentor-section'>
        <Row>
        <Col sm={4} className='text-center'>
          <Image src={avatar} className='w-50 mx-3'roundedCircle />
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
            <label className='m-2'>No. of courses assigned: </label>
            <br />
            <label className='m-2'>Status:{mentor.isActive?<span className='bg-success'> Active</span>:<span className='bg-danger'> Blocked</span>}</label>
            <br />
            {mentor.isActive? <Button className='p-2 bg-danger ' > Block </Button>:<Button className='p-2 bg-success ' >Unblock</Button>}
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