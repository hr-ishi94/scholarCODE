
import React, { useEffect } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import { Button } from 'react-bootstrap'
import samplecourse from '../../assets/samplecourse.png'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCourseDetails } from '../../Redux/Slices/CourseDetailsSlice'
import Loader from '../Utils/Loader'
import Card from 'react-bootstrap/Card';
import { fetchTasksList } from '../../Redux/Slices/TasksListSlice'
import Form from 'react-bootstrap/Form';

const SingleCourse = () => {
  const params = useParams()
  const {course,status,error} = useSelector((state)=>state.Course)
  const TaskSelector  = useSelector((state)=>state.Tasks)
  
  const tasks  = TaskSelector.tasks
  const moduleSet= new Set()
  tasks.map((task)=>
    moduleSet.add(task.module))
  
  const modules = [...moduleSet]

  modules.sort();
  
  
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchCourseDetails(params.id))
    dispatch(fetchTasksList(params.id))
  },[dispatch])




  if (status === 'loading'){
    return <Loader/>
  }

  return (
    <div className='container'>
        <br />
        <br />
        <br />
    <Row>
        <Col sm={4} className='text-center'>
            
        <Card style={{ width: '20rem',marginLeft:"10px" }}>
      <Card.Img variant="top" src={course.thumbnail?course.thumbnail:samplecourse} />
      <Card.Body>
        <Card.Title>{course.name}</Card.Title>
        <Card.Text>
         {course.description}
        </Card.Text>
      </Card.Body>
      
    </Card>
            
        </Col>
        <Col sm={8} >
          
            <h1 style={{color:"#12A98E"}}><strong>{course.name} </strong></h1>       
              <p >Explore the world of programming and enhance your skills with {course.name}. Enroll in this course to embark on a journey of self-learning and discovery.</p>
                <div className='d-flex justify-content-between mx-5 px-5'style={{color:"#12A98E"}}>
                  <h6><strong><i className="fa-solid fa-book-open"></i> {modules.length} Modules</strong></h6>
                  <h6><strong><i className="fa-solid fa-video"></i> Weekly Reviews</strong></h6>
                  <h6><strong><i className="fa-solid fa-certificate"></i> Certification</strong></h6>
                  
                </div>
                <h5 >Course Description</h5>
                <h5>{course.description}</h5>
                <br />
                <h4 >Price: ₹{course.price}* only</h4>
                <br />
                <Button className='p-2 text-light' variant='' style={{backgroundColor:"#12A98E"}}>Enroll now</Button>
                
            
        </Col>
        
    </Row>
    <br />
    <br />
    <Row>
      <Col sm={4}>
      <h3 className='mx-3'><i className="fa-solid fa-certificate"></i> Certifications</h3>
      <br />
      <h3 className='mx-3'><i className="fa-solid fa-clock"></i> 24x7 support</h3>
      <br />
      <h3 className='mx-3'><i className="fa-solid fa-chalkboard-user"></i> Individual mentor <br />support</h3>
      <br />
      <h3 className='mx-3'><i className="fa-solid fa-video"></i> Weekly review <br />sessions</h3>
      <br />
      <br />
      </Col>
      <Col sm={8}>
      <h2><strong>Syllabus</strong></h2>
      <br />
      {modules.map((module,index)=>(
        <div key={index}>
        
        <h2>{module}</h2>
        {tasks.filter((task)=>task.module === module).map((task,index)=>(
          <h4 key={index}><i className="fa-solid fa-lock"></i> task{index+1}
          <Form.Check
            inline
            disabled
            type="checkbox"
            id={'inline-checkbox'}
          />
          </h4>
        ))}
        </div>
        
      ))}

      <Button disabled className='p-2 my-3 text-light' variant='' style={{backgroundColor:"#12A98E"}}>Click to download your certificate</Button> 

      </Col>
    </Row>

    </div>



  )
}

export default SingleCourse



