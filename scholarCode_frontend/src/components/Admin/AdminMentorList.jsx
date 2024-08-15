import React, { useEffect, useState } from 'react'
import './AdminMentorList.css'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import { fetchMentors } from '../../Redux/Slices/MentorsSlice.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../Utils/Loader.jsx';
import { Col, Form, Row } from 'react-bootstrap';
import Pagination from './utils/Pagination.jsx';

 

const MentorTableData=({props,index,indexOfFirstMentor})=>{
  const mentor = props
 return (
 <>
    <td>{indexOfFirstMentor+index+1}</td>
    <td>{mentor.first_name } {mentor.last_name} </td>
    <td>{mentor.designation}</td>
    <td>{mentor.email}</td>
    <td>{mentor.is_active?<span className='text-success'>Active</span>:<span className='text-danger'>Inactive</span>}</td>
    
    
 </>
  )
}


const AdminMentorList = () => {

  const dispatch = useDispatch()
  const {mentors, status, error} = useSelector((state)=>state.Mentors)

  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const mentorsPerPage = 5;

  const filteredMentors = mentors.filter((mentor)=>
  mentor.first_name.toLowerCase().includes(searchQuery.toLowerCase()))

  const indexOfLastMentor = currentPage * mentorsPerPage
  const indexOfFirstMentor = indexOfLastMentor - mentorsPerPage
  const currentMentors = filteredMentors.slice( indexOfFirstMentor,indexOfLastMentor )

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  if (error && error.trim().length > 0){
    toast.error(error)
  }

  
  useEffect(() => {
    dispatch(fetchMentors())
  }, [dispatch])
    

  if (status === "loading") {
    return <Loader />;
  }

  const sortedMentors = [...currentMentors].sort((a,b)=> a.id - b.id)

  
  return (
    <>
      <div className='mentor-table'>
        <h2>Mentors</h2>
           
    <div>

</div>
        <Row className="mx-2 my-2" >
          <Col sm={9}>
          </Col>
          <Col sm={3}>
            <Form.Control
              type="text"
              placeholder="Search Mentor"
              value={searchQuery}
              onChange={(e) => {setSearchQuery(e.target.value);
                setCurrentPage(1);}}
            />
          </Col>
        </Row>
        <Table striped bordered hover className='text-center'>
      <thead>
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>Designation</th>
          <th>Email</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody >
        {sortedMentors.filter((mentor)=>mentor.is_staff===true).map((activeMentor,index)=>(


        <tr key={activeMentor.id}>
          <MentorTableData props = {activeMentor} index ={index} indexOfFirstMentor={indexOfFirstMentor}/>
          <td><Link to={`/admin/mentor/active/${activeMentor.id}/`}><Button className='p-1 m-1 text-light' variant='' style={{backgroundColor:"#12A98E"}}>View</Button></Link></td>
        </tr>
        ))}
        
        
      </tbody>
        </Table>
        <Pagination
          itemsPerPage={mentorsPerPage}
          totalItems={filteredMentors.length}
          paginate={paginate}
          currentPage={currentPage}
        />

        <br />
        <br />

        <h2>Mentors Requests</h2>
        <Table striped bordered hover className='text-center'>
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
                  <Button className="p-1 m-1 text-light" variant='' style={{ backgroundColor: "#12A98E" }} >View</Button>
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

