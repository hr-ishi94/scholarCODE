import React, { useEffect } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table';
import { Button, Image } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { fetchUser } from '../../Redux/Slices/UserDetailsSlice'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Utils/Loader'
import { course } from '../../Axios/Urls/EndPoints';



const MentorUser = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const {user,status,error} = useSelector((state)=>state.User)
    const MentorCourseSelector =  useSelector((state)=>state.MentorCourses)
    const EnrollCoursSelector = useSelector((state)=>state.EnrolledCourses)
    const CoursesSelector = useSelector((state)=>state.Courses)
    console.log(CoursesSelector.courses )
    useEffect(()=>{
        dispatch(fetchUser(params.id))},
        [dispatch])
        
        const mentorCourseSet = new Set()
        MentorCourseSelector.courses.map((course)=>{
            mentorCourseSet.add(course.id)
    })

    
    console.log(params.id)
    const UserEnrolledCourses= EnrollCoursSelector.enrolls.filter((enroll)=>enroll.user == params.id && mentorCourseSet.has(enroll.course))
    
    if (status === 'loading'){
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
         <Row className=' my-5'>
            <Col sm={6} className='text-center'>
                
                <Image src={user.profile_img?user.profile_img:''} className='w-25 mx-3 rounded' />
                <br />
                <h4>{user.username}</h4>
                <h4>{user.email}</h4>
               
                
            </Col>
            <Col sm={6} >
                <h2>Mentor Profile</h2>
                <br />
                    <h5 className='m-2'>Name: {user.first_name} {user.last_name} </h5>
                    <h6 className='m-2'>Email:{user.email} </h6>
                    <h6 className='m-2'>Designation: {user.designation} </h6>

                    <h6 className='m-2'>Courses Enrolled : 0 </h6>
                    <br />
                    <Button className="p-2 text-light" variant="" style={{backgroundColor:"#12A98E"}}  >Chat with {user.first_name}</Button>
                    
                    
                
            </Col>
            
        </Row>
        <h3>Enrolled Courses</h3>
        <br />
        <Table striped bordered hover>
    <thead>
        <tr>
        <th>id</th>
        <th>Course</th>
        <th>Current Module</th>
        <th>status</th>
        {/* <th>Action</th> */}
        </tr>
    </thead>
    <tbody >
      
        {UserEnrolledCourses.map((enroll,index)=>(
            
            
            <tr>
            <td>{index + 1}</td>
            <td>course.name</td>
            <td>{enroll.curr_module}</td>
            <td>{!enroll.Is_completed?<span className='text-primary'>Ongoing</span>:<span className='text-success'>Completed</span>}</td>
            {/* <td>sddd</td> */}
            {/* <td><Link to={`/mentor/user/${user.id}/`}><Button className='p-1 text-light' variant='' style={{backgroundColor:'#12A98E'}}>View</Button></Link></td> */}
        </tr>
        
        ))}
        
        
    </tbody>
    </Table>



    </div>
  )
}

export default MentorUser