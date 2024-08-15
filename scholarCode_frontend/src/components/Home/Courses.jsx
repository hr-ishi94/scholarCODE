import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form';
import { fetchMentorCourse } from '../../Redux/Slices/mentorSide/MentorCourseSlice';
import { fetchCoursesList } from '../../Redux/Slices/CoursesListSlice';
import { jwtDecode } from 'jwt-decode';
import { fetchAllEnrolledCourses } from '../../Redux/Slices/Userside/AllEnrolledCoursesSlice';
import HomeLoader from '../Utils/HomeLoader';
import { fetchCategoryList } from '../../Redux/Slices/CategoryListSlice';

const CourseCard = ({ course, enrolledset }) => (
  <Card style={{ width: '22rem' }} className='m-3 p-3'>
    <Link to={`/course/${course.id}/`}>
      <Card.Img variant="top" src={course.thumbnail ? course.thumbnail : ""} />
    </Link>
    <Card.Body>
      <Card.Title className="pt-2" style={{ color: "#12A98E" }}>
        <strong>{course.name}</strong>
      </Card.Title>
      <Card.Text>{course.description.slice(0, 160) + "..."}</Card.Text>
      <Link to={`/course/${course.id}/`}>
        {enrolledset.has(course.id) ?
          <Button variant="secondary" className='p-1 text-light'>Continue learning</Button>
          : <Button variant="" style={{ backgroundColor: '#12A98E' }} className='p-1 text-light'>Enroll Now</Button>
        }
      </Link>
    </Card.Body>
  </Card>
)

const Courses = () => {
  const { courses, status, error } = useSelector((state) => state.Courses)
  const MentorCourseSelector = useSelector((state) => state.MentorCourses)
  const EnrolledCourseSelector = useSelector((state) => state.AllEnrolls)
  const UserTokenSelector = useSelector((state) => state.UserToken)
  const user = UserTokenSelector
  const access = UserTokenSelector.access ? jwtDecode(UserTokenSelector.access) : null
  const user_id = access ? access.user_id : null
  const dispatch = useDispatch()
  const CategorySelector = useSelector((state)=>state.Categories  )

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    dispatch(fetchMentorCourse())
    dispatch(fetchCoursesList())
    dispatch(fetchCategoryList())
    if (user && user.is_authenticated) {
      dispatch(fetchAllEnrolledCourses())
    }
  }, [dispatch])

  const CourseIdSet = new Set()
  const EnrolledSet = new Set()
  const MentorCourseSet = new Set()

  if (MentorCourseSelector && Array.isArray(MentorCourseSelector.courses)) {
    MentorCourseSelector.courses.forEach((course) => {
      CourseIdSet.add(course.course);
      MentorCourseSet.add(course.id);
    });
  }

  user_id && EnrolledCourseSelector.enrolls.filter((course) => course.user.id === user_id).map((course) => EnrolledSet.add(course.course.course))

  const activeCourses = courses && courses.filter((course) => 
    course.status === true && 
    CourseIdSet.has(course.id) &&
    (course.name.toLowerCase().includes(searchTerm.toLowerCase()) || course.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategory === 'All' || course.category === selectedCategory)
  )

  const renderRows = (courses) => {
    const rows = [];
    for (let i = 0; i < courses.length; i += 3) {
      const courseRow = courses.slice(i, i + 3);
      rows.push(
        <Row key={i} className="justify-content-center">
          {courseRow.map(course => (
            <CourseCard key={course.id} course={course} enrolledset={EnrolledSet} />
          ))}
        </Row>
      );
    }
    return rows;
  };

  if (status === 'loading') {
    return <HomeLoader />
  }

  return (
    <>
      <div className="container text-center">
        <br />
        <h1>Courses</h1>
        <br />
        <Form className='mb-4 '>
          <Row className="align-items-center justify-content-center">
            <Col xs="auto" >
              <Form.Control
                type="text"
                className='p-1 px-5'
                placeholder="Search Courses"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Col>
            <Col xs="auto">
              <Form.Select
                value={selectedCategory}
                className='p-1 px-5'
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                {/* Replace the below options with your actual categories */}
                {CategorySelector.categories.map((cat)=>
                <option value={cat.id}>{cat.name}</option>
                )}
              </Form.Select>
            </Col>
          </Row>
        </Form>
        <div className='d-flex'>
          <Col>
            {renderRows(activeCourses)}
          </Col>
        </div>
      </div>
    </>
  )
}

export default Courses
