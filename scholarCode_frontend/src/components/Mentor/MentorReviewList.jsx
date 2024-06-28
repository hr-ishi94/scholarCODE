import React, { useEffect } from 'react'
import Row  from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMentorCourse } from '../../Redux/Slices/mentorSide/MentorCourseSlice';
import { fetchUsers } from '../../Redux/Slices/UserListSlice';
import { fetchCoursesList } from '../../Redux/Slices/CoursesListSlice';
import { fetchAllEnrolledCourses } from '../../Redux/Slices/Userside/AllEnrolledCoursesSlice';
import Loader from '../Utils/Loader';

const MentorReviewList = () => {
    const EnrolledCourseSelector = useSelector((state)=>state.EnrolledCourses)
    const MentorCourseSelector = useSelector((state)=>state.MentorCourses)
    const MentorSelector = useSelector((state)=>state.Mentor)
    const UserSelector = useSelector((state)=>state.userList)
    const CourseSelector = useSelector((state)=>state.Courses)
    const dispatch = useDispatch()
    console.log(UserSelector,'sd')
    useEffect(()=>{
        dispatch(fetchUsers())
        dispatch(fetchCoursesList())
        dispatch(fetchMentorCourse())
        dispatch(fetchAllEnrolledCourses())

    },[dispatch])

    const MentorCourseSet = new Set()
    for(let course of MentorCourseSelector.courses){
        if(!MentorCourseSet.has(course.id)){
            MentorCourseSet.add(course.id)
        }
    }
    const CoursesObject = {}
    for(let mentorCourse of MentorCourseSelector.courses){
        for (let course of CourseSelector.courses){
            if(mentorCourse.course === course.id){
                CoursesObject[mentorCourse.id] = course.name
    
            }
            
        }
    }
    console.log(CoursesObject,'sed')

    const MentorCoursesList = EnrolledCourseSelector && EnrolledCourseSelector.enrolls.filter((enroll)=>MentorCourseSet.has(enroll.course))

    if(EnrolledCourseSelector.status === 'loading'){
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
        
            <h1>Upcoming Reviews</h1>
            <br />
        <Table striped bordered hover>
        <thead>
            <tr>
            <th>id</th>
            <th>Name</th>
            <th>Course</th>
            <th>Next Review date</th>
            <th>Time</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody >
            {MentorCoursesList.map((course,index)=>(

                <tr key={index}>
                <td>{index+1}</td>
                {UserSelector.users.filter((user)=>user.id === course.user).map((n)=>
                <td>{n.first_name}</td>
                )
                }
                <td>{CoursesObject[course.course]}</td>
                
                {course.is_completed?<>
                
                    <td className='text-success'>Course Completed  <i className="fa-solid fa-circle-check"></i></td>
                    <td>----</td>
                </>:
                <>
                <td>{course.next_review_date}</td>
                <td>{course.review_time?course.review_time: <span className='text-primary'> Not Scheduled</span>}</td>

                </>}
                <td><Link to={`/mentor/review/${course.id}/`}><Button variant='' style={{backgroundColor:"#12A98E"}} className='text-light p-1'>view</Button></Link></td>
            </tr>
            ))}
            
            
        </tbody>
        </Table>
        
            
        

        <br />
        <br />
        <br />
        <br />
       

    </div>
    

  )
}

export default MentorReviewList