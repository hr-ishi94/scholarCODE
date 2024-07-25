import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import DashComp from './utils/DashComp'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMentorCourse } from '../../Redux/Slices/mentorSide/MentorCourseSlice'
import { fetchAllEnrolledCourses } from '../../Redux/Slices/Userside/AllEnrolledCoursesSlice'
import { jwtDecode } from 'jwt-decode'

const MentorDashboard = () => {
    const MentorToken = useSelector((state)=>state.MentorToken)
    const access = jwtDecode(MentorToken.access)
    const user_id = access.user_id
    const MentorCourseSelector = useSelector((state)=>state.MentorCourses)
    const EnrolledCourseSelector = useSelector((state)=>state.AllEnrolls)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchMentorCourse())
        dispatch(fetchAllEnrolledCourses())
    },[dispatch])

    const courses = MentorCourseSelector.courses.filter((course)=>course.mentor == user_id).map((course)=>course.id)
    const userEnrolls = EnrolledCourseSelector.enrolls.filter((enroll)=> courses.includes(enroll.course.id))
    

    const style = {
        position: "absolute",
        left: "350px",
        right: "100px",
        top: "100px",
        }

  return (
    <div style={style}>
        <h2><strong> Mentor Dashboard</strong></h2>
         <Row>
            <Col sm={6}>
                <DashComp title={'Courses Assigned'} count = {courses.length} />
            </Col>
            <Col sm={6}>
                <DashComp title={'Reviews Conducted'} />
            </Col>
            
        </Row>   
         <Row>
            <Col sm={6}>
                <DashComp title={'Wallet'} />
            </Col>
            <Col sm={6}>
                <DashComp title={'User Enrolls'} count ={userEnrolls.length} />
            </Col>
            
        </Row>
    </div>
  )
}

export default MentorDashboard