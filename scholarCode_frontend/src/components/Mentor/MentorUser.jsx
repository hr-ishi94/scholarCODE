import React, { useCallback, useEffect } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table';
import { Button, Image } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchUser } from '../../Redux/Slices/UserDetailsSlice'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Utils/Loader'
import { Vurl, course } from '../../Axios/Urls/EndPoints';
import  avatar  from '../../assets/avatar.jpg';
import { jwtDecode } from 'jwt-decode';
import { addChatRoom } from '../../Axios/UserServer/UserServer';
import { fetchAllEnrolledCourses } from '../../Redux/Slices/Userside/AllEnrolledCoursesSlice';
import { fetchCoursesList } from '../../Redux/Slices/CoursesListSlice';




const MentorUser = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const {user,status,error} = useSelector((state)=>state.User)
    const MentorCourseSelector =  useSelector((state)=>state.MentorCourses)
    const EnrollCourseSelector = useSelector((state)=>state.AllEnrolls)
    const CoursesSelector = useSelector((state)=>state.Courses)
    const MentorToken = useSelector((state)=>state.MentorToken)
    const access = jwtDecode(MentorToken.access)
    const mentorId = access.user_id
    console.log(mentorId,'klo')
    const navigate = useNavigate()

    console.log(CoursesSelector.courses )
    
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchUser(params.id));
            dispatch(fetchAllEnrolledCourses());
            dispatch(fetchCoursesList());
        }
    }, [dispatch, params.id, status]);
        
        const mentorCourseSet = new Set()
        MentorCourseSelector.courses.map((course)=>{
            mentorCourseSet.add(course.id)
    })

    
    console.log(params.id)
    const UserEnrolledCourses= EnrollCourseSelector.enrolls.filter((enroll)=>enroll.user.id == params.id && mentorCourseSet.has(enroll.course.id))
    const handleChat=useCallback(async()=>{
        const ids = {
            "user_id1":user.id,
            "user_id2":mentorId,
        }
        try{
            const res = await addChatRoom(ids)
            console.log(res,'ss')
            // navigate('/chat/')
            window.open(`${Vurl}chat/`)
            
          }catch(error){
            console.log(error,"error in chat")
          }
    },[])
    
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
                
                <Image src={user.profile_img?user.profile_img:avatar} className='w-25 mx-3 rounded' />
                <br />
                <h4>{user.username}</h4>
                <h4>{user.email}</h4>
               
                
            </Col>
            <Col sm={6} >
                <h2>Student Details</h2>
                <br />
                    <h5 className='m-2'>Name: {user.first_name} {user.last_name} </h5>
                    <h6 className='m-2'>Email:{user.email} </h6>
                    <h6 className='m-2'>Designation: {user.designation} </h6>

                    <h6 className='m-2'>Courses Enrolled :<strong> {UserEnrolledCourses.length} nos</strong></h6>
                    <br />
                    <Button className="p-2 text-light" variant="" style={{backgroundColor:"#12A98E"}} onClick={handleChat}> <i className="fa-solid fa-comment"></i> Chat with {user.first_name}</Button>
                    
                    
                
            </Col>
            
        </Row>
        <h3>Enrolled Courses</h3>
        <br />
        <Table striped bordered hover className='text-center'>
    <thead>
        <tr>
        <th>id</th>
        <th>Course</th>
        <th>Current Module</th>
        <th>status</th>
        {/* <th>Action</th> */}
        </tr>
    </thead>
    <tbody>
      
        {
            UserEnrolledCourses.map((enroll,index)=>(
            
            
            <tr key={index}>
            <td>{index + 1}</td>
            
                {CoursesSelector.courses.filter((course)=> course.id == enroll.course.course).map((course)=>
                <td>{course.name}</td>
                )}
            <td>{enroll.curr_module}</td>
            <td>{!enroll.is_completed?<span className='text-primary'>Ongoing</span>:<span className='text-success'>Completed <i className="fa-solid fa-check "></i></span>}</td>
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