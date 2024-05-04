import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import { Button } from 'react-bootstrap'
import samplecourse from '../../assets/samplecourse.png'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCourseDetails } from '../../Redux/Slices/CourseDetailsSlice'
import { fetchTask } from '../../Redux/Slices/TaskEditSlice'
import { fetchTasksList } from '../../Redux/Slices/TasksListSlice'

const AdminCourse = () => {
    const style = {
        position: "absolute",
        left: "350px",
        right: "100px",
        top: "100px"
    }


    const params = useParams()
    const dispatch = useDispatch()
    const courseSelector= useSelector((state)=>state.Course)
    const taskSelector = useSelector((state)=>state.Tasks)
    
    const [course, setCourse] = useState([])
    const [tasksList,setTasksList] =useState([])

    useEffect(()=>{ 
        dispatch(fetchCourseDetails(params.id))
        if(courseSelector.course?.length!==0){
            setCourse(courseSelector.course)
        }
        dispatch(fetchTasksList(params.id))
        if(taskSelector.tasks?.length!==0){
            setTasksList(taskSelector.tasks)
        }
    },[dispatch])


    const distinctModulesSet = new Set()

    tasksList.filter((task)=>{
            if(!distinctModulesSet.has(task.module.name)){
            distinctModulesSet.add(task.module.name)
            return true
        }
        return false

        }
    )
    // array with all distinct modules
    const modulesArray = [...distinctModulesSet]

  return (
    <div style={style}>
    <Row>
        <Col sm={4} className='text-center'>
            
            <Image src={course.thumbnail?course.thumbnail:samplecourse} className='w-50 mx-3 rounded' />
            <br />
            <br />
            <h4>{course.name}</h4>
            <h6>Published on: {course.published_on} </h6>
            
        </Col>
        <Col sm={8} >
            <h3>Course Details</h3>
            <br />
                <h5 className='m-2'>{course.name}</h5>
                <h6 className='m-2'>{course.description}</h6>
                <br />
                <h6 className='m-2'>Total Modules: {modulesArray.length}</h6>
                <h6 className='m-2'>Price: ₹{course.price}* only</h6>
                <h6 className='m-2'>Course status: {course.status?<span className='bg-success p-1'>ACTIVE</span>:<span className='bg-danger p-1'>INACTIVE</span>}</h6>
                <br />
                <Button className='p-1 m-1 bg-danger'>Block course</Button>
                <Button className='p-1 m-1 bg-success'>Update course</Button>
                <br />
                <br />
                
                {modulesArray.map((module)=>(
                    
                    <div key={module}>
                            <h5 className='m-2'>{module}</h5>
                            {tasksList.filter((task)=>task.module.name==module).map((task)=>(
                                
                                <ul>
                                <li>{task.name}</li>
                            
                            </ul>
                            ))}                             
    
                        </div>
                    
                ))}
                <br />
                {/* <h5 className='m-2'>Mentors assigned:</h5>
                <ul>
                    <li>mentor 1</li>
                    <li>mentor 1</li>
                    <li>mentor 1</li>
                </ul> */}
                
            
        </Col>
    </Row>
    </div>
  )
}

export default AdminCourse