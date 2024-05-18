import React, { useEffect, useState } from 'react'
import './AdminMentorList.css'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import { fetchMentors } from '../../Redux/Slices/MentorsSlice.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../Utils/Loader.jsx';

 

const MentorTableData=({props,index})=>{
  const mentor = props
 return (
 <>
    <td>{index+1}</td>
    <td>{mentor.first_name } {mentor.last_name} </td>
    <td>04</td>
    <td>{mentor.email}</td>
    <td>{mentor.isActive?<span className='text-success'>Active</span>:<span className='text-danger'>Inactive</span>}</td>
    
    
 </>
  )
}


const AdminMentorList = () => {

  const dispatch = useDispatch()
  const {mentors, status, error} = useSelector((state)=>state.Mentors)
  if (error && error.trim().length > 0){
    toast.error(error)
  }
  useEffect(() => {

    dispatch(fetchMentors())
    
  }, [dispatch])

  if (status === "loading") {
    return <Loader />;
  }

  
  return (
    <>
      <div className='mentor-table'>
        <h2>Mentors</h2>
           
    <div>

</div>
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
        {mentors.filter((mentor)=>mentor.is_staff===true).sort((a,b)=>a.id-b.id).map((activeMentor,index)=>(


        <tr key={activeMentor.id}>
          <MentorTableData props = {activeMentor} index ={index} />
          <td><Link to={`/admin/mentor/active/${activeMentor.id}/`}><Button className='p-1 m-1' style={{backgroundColor:"#12A98E"}}>View</Button></Link></td>
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
              <th>Designation</th>
              <th>Email</th>
              <th>Linkedin Id</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody >
            {mentors.filter((mentor)=>mentor.is_staff === false).sort((a,b)=>a.id - b.id).map((mentorRequest,index)=>(


            <tr  key={mentorRequest.id}>
              
              {/* <MentorTableData props= {mentorRequest}/> */}
              <td>{index+1}</td>
              <td>{mentorRequest.first_name } {mentorRequest.last_name} </td>
              <td>{mentorRequest.designation}</td>
              <td>{mentorRequest.email}</td>
              <td>{mentorRequest.linkedin_profile}</td>
              
              <td>
                  <Link to={`/admin/mentor/request/${mentorRequest.id}/`}>
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

