import React from 'react'
import DashComp from '../Mentor/utils/DashComp'
import { Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const AdminDashboard = () => {
    const UserSelector = useSelector((state)=>state.userList)
    const MentorsSelector = useSelector((state)=>state.Mentors)
    const CourseSelector = useSelector((state)=>state.Courses)


    const activeMentors = MentorsSelector.mentors.filter((course)=> course.is_active === true )
    console.log(activeMentors.length,'loo')

    const style = {
        position: "absolute",
        left: "350px",
        right: "100px",
        top: "100px",
        }
  return (
    <div style={style}>
        <h2><strong> Admin Dashboard</strong></h2>
         <Row>
            <Col sm={6}>
                <DashComp title={'Users Enrolled'} count = {UserSelector.users.length} />
            </Col>
            <Col sm={6}>
                <DashComp title={'Active Mentors'} count = {activeMentors.length}/>
            </Col>
            
        </Row>   
         <Row>
            <Col sm={6}>
                <DashComp title={'Total Courses'} count={CourseSelector.courses.length}/>
            </Col>
            <Col sm={6}>
                <DashComp title={'Total Revenue'} />
            </Col>
            
        </Row>
    </div>
  )
}

export default AdminDashboard