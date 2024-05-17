import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Courses = () => {
  const {courses,status,error} = useSelector((state)=>state.Courses)
  console.log(courses)
  
  
  return (
  <>
    <div className="container text-center">
      <br />

      <h1>Courses</h1>
      <div className='d-flex '>
        {courses.filter((course)=>course.status === true).map((course)=>(

      <Card style={{ width: '22rem' }} className='m-5 p-3'>
        <Link to={'/course/id/'}>
          <Card.Img variant="top" src={course.thumbnail?course.thumbnail:""} />
        </Link>
        <Card.Body>
          <Card.Title  className="pt-2" style={{color:"#12A98E"}}> <strong>{course.name}</strong> </Card.Title>
          <Card.Text>
            {course.description}
          </Card.Text>
          <Link to={'/course/id/'}>
            <Button variant="" style={{backgroundColor:'#12A98E'}} className='p-1 text-light'>Enroll Now</Button>
          </Link>
        </Card.Body>
      </Card>
      ))}
      </div>
    </div>
    </>
  )
}

export default Courses