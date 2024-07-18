import React, { useEffect } from 'react'
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

const MentorUserList = () => {
    const MentorSelector = useSelector((state)=>state.MentorToken)
    const Token = jwtDecode(MentorSelector.access)
    const mentorId = Token.user_id
    
    const userSelector = useSelector((state)=>state.userList)
    const mentorCourseSelector = useSelector((state)=>state.MentorCourses)
    const EnrolledCourseSelector = useSelector((state)=>state.EnrolledCourses)
    const allEnrolledCourses = useSelector((state)=>state.AllEnrolls)
    
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
    console.log(mentorCourseSet,'mcourse')

    allEnrolledCourses.enrolls.filter((enroll)=>mentorCourseSet.has(enroll.course.id)).map((enroll)=>{
        enrollUserSet.add(enroll.user.id)
    })
    const users = userSelector.users.filter((user)=>enrollUserSet.has(user.id))
    console.log(users,'sedi')

    if (userSelector.status === 'loading'){
        return <Loader/>
    }
    
    const style = {
        position: "absolute",
        left: "350px",
        right: "100px",
        top: "100px"
    }
  return (
    <div style={style}>
    <div>

    <Row>
            <h1>Assigned Users List</h1>
        
    </Row>

    <Table striped bordered hover>
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
        {users.map((user,index)=>(
        
            
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
    
        
    </div>


</div>
  )
}

export default MentorUserList