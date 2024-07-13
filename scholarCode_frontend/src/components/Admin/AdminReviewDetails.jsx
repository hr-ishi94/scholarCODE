import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Utils/Loader'
import { fetchEnrolledCourses } from '../../Redux/Slices/Userside/EnrolledCoursesSlice'
import { Link, useParams } from 'react-router-dom'
import { fetchAllEnrolledCourses } from '../../Redux/Slices/Userside/AllEnrolledCoursesSlice'
import { Col, Row, Table } from 'react-bootstrap'
import { fetchMentors } from '../../Redux/Slices/MentorsSlice'
import { fetchCoursesList } from '../../Redux/Slices/CoursesListSlice'
import { fetchReviewMarks } from '../../Redux/Slices/mentorSide/ReviewMarkSlice'

const AdminReviewDetails = () => {

    const EnrolledCourseSelector = useSelector((state)=>state.AllEnrolls)
    const MentorSelector = useSelector((state)=>state.Mentors)
    const CourseSelector = useSelector((state)=>state.Courses)
    const ReviewMarkSelector = useSelector((state)=>state.ReviewMarks)
    const params = useParams()
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(fetchAllEnrolledCourses())
        dispatch(fetchMentors())
        dispatch(fetchReviewMarks())
        dispatch(fetchCoursesList())
    },[dispatch])
    
    const course = EnrolledCourseSelector.enrolls.find((enroll)=> enroll.id == params.id)
    
    const ReviewMarksList = ReviewMarkSelector.marks.filter((n)=>n.course === course.id && n.user === course.user.id)
    
    console.log(course.user.id,course.id)
    console.log(ReviewMarkSelector.marks)
    console.log(ReviewMarksList,'lll')

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
        <h2>Review Details of {course.user.first_name } {course.user.last_name } </h2>
        <Row>
        <Col sm= {6}>
        <br />
        <br />

        <h5><strong> Enroll ID:{course.enroll_id}</strong></h5>
        <br />
        {CourseSelector.courses.filter((crs)=>crs.id === course.course.course).map((crs)=>
        <h5>Course: {crs.name}</h5>
        )}

        <br />
        {MentorSelector.mentors.filter((mentor)=>mentor.id === course.course.mentor).map((mentor)=>
        <>
        <h5>Mentor Name: {mentor.first_name} {mentor.last_name}</h5>
        <p><Link className='react-router-link' to = {`/admin/mentor/active/${mentor.id}/`}>View Mentor Details</Link></p>
        </>
        )}
        <br />
        {course.is_completed?
        <h5 style={{color:'#12A98E'}}><i className="fa-solid fa-circle-check"></i> Course Completed</h5> :
        <>
        <br />
        <h5>Total modules: {course.total_modules} no.s</h5>
        <br />
        <h5>Current Module: Module {course.current_module}</h5>
        <br />
        <h5>Next review date: {course.next_review_date}</h5>
        <br />
        <h5>Time Scheduled: {course.review_time?course.review_time: <span className='text-primary'>Time not yet scheduled</span> }</h5>

        
        </>
        }
        <br />
        {course.certificate? <h5><span style={{color:'#12A98E'}}><i className="fa-solid fa-circle-check"></i> Certificate issued</span></h5> :
        <h5>{!course.certificate && course.is_completed && <span className='text-danger '> <i className="fa-solid fa-circle-xmark"></i> Certificate yet to issue</span> }</h5>
         }
        
        </Col>
        <Col sm={6}>
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>No.</th>
            <th>Module </th>
            <th>Mark Scored (Out of 50)</th>
          </tr>
        </thead>
        <tbody>
        {ReviewMarksList && ReviewMarksList.map((n,index)=>
          <tr key={index}>
            <td>{index + 1}</td>
            <td>Module  {n.module}</td>
            <td>{n.mark}</td>
          </tr>
        )}
        
        </tbody>


      </Table>
        
        </Col>


        </Row>
            </div>
  )
}

export default AdminReviewDetails