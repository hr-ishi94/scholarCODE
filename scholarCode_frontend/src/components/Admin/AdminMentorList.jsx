import React, { useEffect, useState } from 'react'
import './AdminMentorList.css'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { Link } from 'react-router-dom';

const baseUrl = 'http://127.0.0.1:8000/'

const MentorTableData=({props})=>{
  const mentor = props
 return (
 <>
    <td>{mentor.id}</td>
    <td>{mentor.first_name } {mentor.last_name} </td>
    <td>04</td>
    <td>{mentor.email}</td>
    <td>{mentor.isActive?<span className='text-success'>Active</span>:<span className='text-danger'>Inactive</span>}</td>
    
    
 </>
  )
}


const AdminMentorList = () => {
  const [activeMentors, setActiveMentors] = useState([])
  const [requestMentors, setRequestMentors] = useState([])
  
  useEffect(() => {
    async function fetchMentors(){

      const response_active = await axios.get(`${baseUrl}/main/mentors/active/`)
      setActiveMentors(response_active.data)

      const response_request = await axios.get(`${baseUrl}/main/mentors/request/`)
      setRequestMentors(response_request.data)
    }

    fetchMentors()
  }, [])
  
  return (
    <>
      <div className='mentor-table'>
        <h2>Mentors</h2>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>No. of Courses</th>
          <th>Email</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody >
        {activeMentors.map((mentor)=>(


        <tr >
          <MentorTableData props = {mentor} key={mentor.id}/>
          <td><Link to={`/admin/mentor/active/${mentor.id}/`}><Button className='p-1 m-1' style={{backgroundColor:"#12A98E"}}>View</Button></Link></td>
        </tr>
        ))}
        
        
      </tbody>
        </Table>

        <br />
        <br />

        <h2>Mentors Requests</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>No. of Courses</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody >
            {requestMentors.map((mentor)=>(


            <tr >
              
              <MentorTableData props= {mentor} key={mentor.id}/>
              <td>
                  <Link to={`/admin/mentor/request/${mentor.id}/`}>
                  <Button className="p-1 m-1" style={{ backgroundColor: "#12A98E" }}>View</Button>
                  </Link>
              </td>
                      
            </tr>

            ))}
            
            
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default AdminMentorList

