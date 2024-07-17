import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { fetchMentorCourse } from '../../Redux/Slices/mentorSide/MentorCourseSlice';
import Loader from '../Utils/Loader';
import { fetchCoursesList } from '../../Redux/Slices/CoursesListSlice';
import { jwtDecode } from 'jwt-decode';
import { fetchEnrolledCourses } from '../../Redux/Slices/Userside/EnrolledCoursesSlice';
import { fetchAllEnrolledCourses } from '../../Redux/Slices/Userside/AllEnrolledCoursesSlice';

const CourseCard = ({course,enrolledset})=>(


    <Card style={{ width: '22rem' }} className='m-3 p-3'>
      <Link to={`/course/${course.id}/`}>
        <Card.Img variant="top" src={course.thumbnail ? course.thumbnail : ""} />
      </Link>
      <Card.Body>
        <Card.Title className="pt-2" style={{ color: "#12A98E" }}>
          <strong>{course.name}</strong>
        </Card.Title>
        <Card.Text>{course.description}</Card.Text>
      
        <Link to={`/course/${course.id}/`}>
        {enrolledset.has(course.id)?
          <Button variant="secondary"  className='p-1 text-light'>Continue learning</Button>
          :<Button variant="" style={{ backgroundColor: '#12A98E' }} className='p-1 text-light'>Enroll Now</Button>
        }
        </Link>

      </Card.Body>
    </Card>

)


const Courses = () => {
  const {courses,status,error} = useSelector((state)=>state.Courses)
  const MentorCourseSelector = useSelector((state)=>state.MentorCourses)
  const EnrolledCourseSelector = useSelector((state) => state.AllEnrolls)
  
  const access_token = localStorage.getItem('access')
  const user = access_token?jwtDecode(access_token):null
  const user_id = user?user.user_id:null
  
  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(fetchMentorCourse())
    dispatch(fetchCoursesList())
    dispatch(fetchAllEnrolledCourses())
  },[dispatch])

  const CourseIdSet = new Set()
  const EnrolledSet = new Set()
  const MentorCourseSet = new Set()

  
  MentorCourseSelector && MentorCourseSelector.courses.map((course)=>{
    CourseIdSet.add(course.course)
    MentorCourseSet.add(course.id)
  })
 
  EnrolledCourseSelector.enrolls.map((course)=>EnrolledSet.add(course.course.course))
  
  
  const activeCourses = courses.filter((course)=>course.status === true && CourseIdSet.has(course.id))
  
  const renderRows = (courses) => {
    const rows = [];
    for (let i = 0; i < courses.length; i += 3) {
      const courseRow = courses.slice(i, i + 3);
      rows.push(
        <Row key={i} className="justify-content-center">
          {courseRow.map(course => (
            <CourseCard key={course.id} course={course} enrolledset = {EnrolledSet} />
          ))}
        </Row>
      );
    }
    return rows;
  };

  if (status === 'loading'){
    return <Loader/>
  }
  
  return (
  <>
    <div className="container text-center">
      <br />

      <h1>Courses</h1>
      <div className='d-flex '>
        <Col>
        {renderRows(activeCourses)}
        </Col>
      </div>
    </div>
    </>
  )
}

export default Courses