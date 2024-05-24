import React, { useCallback, useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import { Button } from 'react-bootstrap'
import samplecourse from '../../assets/samplecourse.png'
import Modal  from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCourseDetails } from '../../Redux/Slices/CourseDetailsSlice'
import { fetchTasksList } from '../../Redux/Slices/TasksListSlice'
import Loader from '../Utils/Loader'
import { mentorCourseDelete } from '../../Axios/MentorServer/MentorServer'
import { toast } from 'react-toastify'
import { fetchMentorCourse } from '../../Redux/Slices/mentorSide/MentorCourseSlice'



const MentorCourseDetails = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const {course,status,error} = useSelector((state)=>state.Course)
    const taskSelector = useSelector((state)=>state.Tasks)
    const mentorCourseSelector = useSelector((state)=>state.MentorCourses)
    const mentorCourse = mentorCourseSelector.courses.filter((mentorCourse)=>mentorCourse.course == course.id )
    const id = mentorCourse[0].id
    const [modalShow, setModalShow] = useState(false);
    
    useEffect(()=>{
        dispatch(fetchCourseDetails(params.id))
        dispatch(fetchTasksList(params.id))
    },[dispatch])
    
    const modulesSet = new Set()

    taskSelector.tasks.filter((task)=>{
        if(!modulesSet.has(task.module)){
            modulesSet.add(task.module)
            return true
        }
        return false
    })

    if (status === 'loading'){
        return <Loader/>
    }
    
    const modulesArray = [...modulesSet]
    modulesArray.sort()


    const style = {
        position: "absolute",
        left: "350px",
        right: "100px",
        top: "100px"
    }
  return (
    <div style={style}>
    <Row>
        <Col sm={3} className='text-center'>
            
            <Image src={course.thumbnail?course.thumbnail:samplecourse} className='w-50 mx-3 rounded' />
            <br />
            <br />
            <h4>{course.name}</h4>
           
        </Col>
        <Col sm={7} >
            <h3>Course Details</h3>
            <br />
                <h5 className='m-2'>{course.name}</h5>
                <h6 className='m-2'>{course.description}</h6>
                <br />
                <h6 className='m-2'>Total Modules: {modulesArray.length} nos </h6>
                <h6 className='m-2'>Price: ₹{course.price}* only</h6>
                <h6 className='m-2'>Course status: {course.status?<span className='bg-success p-1'>ACTIVE</span>:<span className='bg-danger p-1'>INACTIVE</span>}</h6>
                <br />
                <Row>
                        <h4>Syllabus</h4>
                   
                </Row>
                {modulesArray.map((module)=>(
                    
                    <div key={module}>
                            <h5 className='m-2'>{module}</h5>
                            {taskSelector.tasks.filter((task)=>task.module==module).sort((a, b) => a.id - b.id).map((task)=>(
                                
                                <ul key={task.id}>
                                <li >{task.name}</li>
                                </ul>
                            
                        ))} 
    
                    </div>
                    
                ))}
                



        </Col>
        <Col sm={2}>
                
        <Button className='p-1 m-1' variant='warning' onClick={(e)=>setModalShow(true)}>Relieve course</Button>
        </Col>
       
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        id = {id}
      />
    </Row>
    
    </div>
  )
}

export default MentorCourseDetails

function MyVerticallyCenteredModal(props) {
    const handleDelete =useCallback(async ()=>{
    try{

        const res = await mentorCourseDelete(props.id)
        console.log("success")
    }catch(error){
        toast.error('Failed to releive from the course')
    }        
   
},[])     
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className='p-2 m-2'>
        <Modal.Title id="contained-modal-title-vcenter">
         Relieve course
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='p-2'>
      
        <p>Are you sure you want to relieve this course ?</p>

      </Modal.Body>
      <Modal.Footer className='p-2'>
        <Button onClick={handleDelete} variant='' style={{backgroundColor:"#12A98E"}} className='p-1 text-light' >Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
}
