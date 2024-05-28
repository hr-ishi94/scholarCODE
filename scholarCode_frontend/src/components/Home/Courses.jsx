import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const CourseCard = ({course})=>(

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
          <Button variant="" style={{ backgroundColor: '#12A98E' }} className='p-1 text-light'>Enroll Now</Button>
        </Link>
      </Card.Body>
    </Card>

)


const Courses = () => {
  const {courses,status,error} = useSelector((state)=>state.Courses)
  const MentorCourseSelector = useSelector((state)=>state.MentorCourses)
  
  const CourseIdSet = new Set()
  
  MentorCourseSelector && MentorCourseSelector.courses.map((course)=>{
    CourseIdSet.add(course.course)
  })
  
  console.log(MentorCourseSelector,'sfdg')
  console.log(CourseIdSet,'set')
  



  const activeCourses = courses.filter((course)=>course.status === true && CourseIdSet.has(course.id))
  
  const renderRows = (courses) => {
    const rows = [];
    for (let i = 0; i < courses.length; i += 3) {
      const courseRow = courses.slice(i, i + 3);
      rows.push(
        <Row key={i} className="justify-content-center">
          {courseRow.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </Row>
      );
    }
    return rows;
  };
  
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