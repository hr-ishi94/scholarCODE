import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllEnrolledCourses } from '../../Redux/Slices/Userside/AllEnrolledCoursesSlice'
import Loader from '../Utils/Loader'
import { Link } from 'react-router-dom'

const AdminReviewsList = () => {
    const EnrolledCourseSelector = useSelector((state)=>state.AllEnrolls)
    const MentorSelector = useSelector((state)=>state.Mentors)
    const CoursesSelector = useSelector((state)=> state.Courses)

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchAllEnrolledCourses() )
    },[dispatch])

    
    if (EnrolledCourseSelector.status === 'loading'){
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
        
            <h1>Reviews List</h1>
            <br />
        <Table striped bordered hover>
        <thead>
            <tr>
            <th>id</th>
            <th>Name</th>
            <th>Course</th>
            <th>Next Review date</th>
            <th>Time</th>
            <th>Mentor Name</th>
            <th>Action</th>
            </tr>
        </thead>
        
        <tbody>
        {EnrolledCourseSelector.enrolls.map((course,index)=>(
        
            <tr key = {index}>
                <td className='text-center'>{index + 1}</td>
                <td className='text-center'>{course.user.first_name}</td>
                {CoursesSelector.courses.filter((crs)=>crs.id === course.course.course).map((crs)=>
                <td key = {crs.id}>{crs.name}</td>
                )}
                
                <td className='text-center'>{!course.is_completed? course.next_review_date: <span style={{color:'#12A98E'}}>Course Completed <i className="fa-solid fa-circle-check"></i></span> }</td>
                <td className='text-center'>{course.review_time?course.review_time: (course.is_completed? '--' :<span className='text-primary'> Time not scheduled</span>) }</td>
                {MentorSelector.mentors.filter((mentor)=>mentor.id === course.course.mentor).map((mentor)=>
                <td className='text-center' key={mentor.id}>{mentor.first_name}</td>
                )}
                <td ><Link to={`/admin/review-details/${course.id}/`}><Button variant='' className='p-1 text-light' style={{backgroundColor:'#12A98E'}}>View </Button></Link></td>

            </tr>
        ))}
        </tbody>
        </Table>
    </div>
  )
}

export default AdminReviewsList