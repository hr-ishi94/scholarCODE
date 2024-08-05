import React, { useEffect, useState } from 'react'
import Row  from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { fetchMentorCourse } from '../../Redux/Slices/mentorSide/MentorCourseSlice';
import { fetchUsers } from '../../Redux/Slices/UserListSlice';
import Loader from '../Utils/Loader';
import { Link } from 'react-router-dom';
import { fetchAllEnrolledCourses } from '../../Redux/Slices/Userside/AllEnrolledCoursesSlice';
import Pagination from '../Admin/utils/Pagination';
import { Form } from 'react-bootstrap';

const MentorUserList = () => {
    const MentorSelector = useSelector((state)=>state.MentorToken)
    const Token = jwtDecode(MentorSelector.access)
    const mentorId = Token.user_id
    
    const userSelector = useSelector((state)=>state.userList)
    const mentorCourseSelector = useSelector((state)=>state.MentorCourses)
    const EnrolledCourseSelector = useSelector((state)=>state.EnrolledCourses)
    const allEnrolledCourses = useSelector((state)=>state.AllEnrolls)

    const [searchQuery, setSearchQuery] = useState('')
    const [currentPage,setCurrentPage] = useState(1)
    const usersPerPage = 10;
    
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(fetchMentorCourse())
        dispatch(fetchAllEnrolledCourses())
        dispatch(fetchUsers())
    },[dispatch])
    
    
    const mentorCourseSet = new Set()
    const enrollUserSet = new Set()
    
    console.log(allEnrolledCourses.enrolls,'enro')
    mentorCourseSelector.courses.map((course)=>{
        if (course.mentor === mentorId){

            mentorCourseSet.add(course.id)
        }
    })

    allEnrolledCourses.enrolls.filter((enroll)=>mentorCourseSet.has(enroll.course.id)).map((enroll)=>{
        enrollUserSet.add(enroll.user.id)
    })
    const users = userSelector.users.filter((user)=>enrollUserSet.has(user.id))
    
    const fitleredUsers = users.filter((user)=>
        user.first_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      
      const indexOfLastUser = currentPage * usersPerPage
      const indexofFirstUser = indexOfLastUser - usersPerPage
      const currentUsers = fitleredUsers.slice(indexofFirstUser,indexOfLastUser)
      
      const paginate = (pageNumber) =>setCurrentPage(pageNumber)

    if (userSelector.status === 'loading'){
        return <Loader/>
    }

    const sortedUsers = [...currentUsers].sort((a,b)=>a.id-b.id)

    
    const style = {
        position: "absolute",
        left: "350px",
        right: "100px",
        top: "100px"
    }
  return (
    <div style={style}>
    <div>

    <Row className="mx-2 my-2" >
          <Col sm={9}>
            <h1>Assigned Users List</h1>
          </Col>
          <Col sm={3}>
            <Form.Control
            className='p-1'
              type="text"
              placeholder="Search Users"
              value={searchQuery}
              onChange={(e) => {setSearchQuery(e.target.value);
                setCurrentPage(1);}
              }
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
        {/* <th>Time</th> */}
        <th>Action</th>
        </tr>
    </thead>
    <tbody >
        {sortedUsers.map((user,index)=>(
        
            
        <tr key={index} >
            <td>{index + 1}</td>
            <td>{user.first_name} {user.last_name}</td>
            <td>{user.designation}</td>
            <td>{user.email}</td>
            {/* <td>sddd</td> */}
            <td><Link to={`/mentor/user/${user.id}/`}><Button className='p-1 text-light' variant='' style={{backgroundColor:'#12A98E'}}>View</Button></Link></td>
        </tr>
        
        ))}
        
    </tbody>
    </Table>
    <Pagination
          itemsPerPage={usersPerPage}
          totalItems={fitleredUsers.length}
          paginate={paginate}
          currentPage={currentPage}
        />
    
        
    </div>


</div>
  )
}

export default MentorUserList