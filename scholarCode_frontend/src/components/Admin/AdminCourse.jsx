import React, { useCallback, useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import { Button } from 'react-bootstrap'
import samplecourse from '../../assets/samplecourse.png'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { blockCourse, fetchCourseDetails, updateCourse } from '../../Redux/Slices/CourseDetailsSlice'
import { addTask, deleteTask, fetchTasksList } from '../../Redux/Slices/TasksListSlice'
import CategoryListSlice from '../../Redux/Slices/CategoryListSlice';
import Modal  from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import { addTaskInstance, courseUpdateInstance, taskDeleteInstance, updateTaskInstance } from '../../Axios/AdminServer/AdminServer'
import { fetchTask, updateTask } from '../../Redux/Slices/TaskEditSlice'
import { toast } from 'react-toastify'
import Loader from '../Utils/Loader'
import { fetchCoursesList } from '../../Redux/Slices/CoursesListSlice'

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


    const [coursePutShow,setCoursePutShow] = useState(false)
    const [taskPutShow,setTaskPutShow] = useState(false)
    const [addTaskShow,setAddTaskShow] = useState(false)
    const [statusShow,setStatusShow] = useState(false)
    const [taskDeleteShow,setTaskDeleteShow] =useState(false)

    const [currTask,setCurrTask] = useState([])

    const handleCourseClose = ()=> setCoursePutShow(false)
    const handleCourseShow = ()=> setCoursePutShow(true)
    
    const handleTaskEditClose = ()=>setTaskPutShow(false)
    const handleTaskEditShow = (task)=>{
        setCurrTask(task)    
        setTaskPutShow(true)
    }

    const handleTaskDeleteClose=()=>setTaskDeleteShow(false)
    const handleTaskDeleteshow=(task)=>{
        setCurrTask(task)
        setTaskDeleteShow(true)
    }
    
    const handleNewTaskClose = ()=> setAddTaskShow(false)
    const handleNewTaskShow = ()=> setAddTaskShow(true)

    const handleStatusClose = ()=> setStatusShow(false)
    const handleStatusShow = ()=> setStatusShow(true)


    useEffect(()=>{ 
        dispatch(fetchCourseDetails(params.id))
        
        dispatch(fetchTasksList(params.id))
        
    },[dispatch])


    const distinctModulesSet = new Set()

    taskSelector.tasks.filter((task)=>{
            if(!distinctModulesSet.has(task.module)){
            distinctModulesSet.add(task.module)
            return true
        }
        return false

        }
    )
    // array with all distinct modules
    const modulesArray = [...distinctModulesSet]
    modulesArray.sort();

    if (courseSelector.status === "loading" || taskSelector.status === 'loading') {
      return <Loader  />;
    }
  

  return (
    <div style={style}>
    <Row>
        <Col sm={3} className='text-center'>
            
            <Image src={courseSelector.course.thumbnail?courseSelector.course.thumbnail:samplecourse} className='w-50 mx-3 rounded' />
            <br />
            <br />
            <h4>{courseSelector.course.name}</h4>
            {/* <h6>Published on: {course.published_on} </h6> */}
            
        </Col>
        <Col sm={7} >
            <h3>Course Details</h3>
            <br />
                <h5 className='m-2'>{courseSelector.course.name} </h5>
                <h6 className='m-2'>{courseSelector.course.description}</h6>
                <br />
                <h6 className='m-2'>Total Modules: {modulesArray.length}</h6>
                <h6 className='m-2'>Price: ₹{courseSelector.course.price}* only</h6>
                <h6 className='m-2'>Course status: {courseSelector.course.status?<span className='bg-success p-1'>ACTIVE</span>:<span className='bg-danger p-1'>INACTIVE</span>}</h6>
                <br />
                <Button className="p-2" variant={courseSelector.course.status?"danger":"success"} onClick={handleStatusShow}>{courseSelector.course.status?"Block Course":"Unblock Course"}</Button>
                <br />
                <CourseStatusModal handleStatusClose={handleStatusClose} statusShow={statusShow} course={courseSelector.course} id ={params.id} />
                <br />
                <Row>
                    <Col>
                        <h4>Syllabus</h4>
                    </Col>
                    <Col>
                        <Button className='p-1' variant='warning' onClick={handleNewTaskShow}>Add Task</Button>
                        <NewTaskModal handleNewTaskClose={handleNewTaskClose} addTaskShow={addTaskShow} course={courseSelector.course} id = {params.id} />
                    </Col>

                </Row>
                <br />
                {modulesArray.map((module)=>(
                    
                    <div key={module}>
                            <h5 className='m-2'>{module}</h5>
                            {taskSelector.tasks.filter((task)=>task.module==module).sort((a, b) => a.id - b.id).map((task)=>(
                                
                                <ul key={task.id}>
                                <li >{task.name}  <i className="mx-2 fa-regular text-success fa-pen-to-square" onClick={()=>handleTaskEditShow(task)}></i><i className="text-secondary fa-solid fa-trash" onClick={()=>handleTaskDeleteshow(task)}></i></li>
                                </ul>
                            
                        ))} 
    
                    </div>
                    
                ))}
                <TaskUpdateModal handleTaskEditClose={handleTaskEditClose} taskPutShow={taskPutShow} task={currTask} id = {params.id}/>
                <TaskDeleteModal handleTaskDeleteClose={handleTaskDeleteClose} taskDeleteShow={taskDeleteShow} task={currTask}/>                       
                <br />
                {/* <h5 className='m-2'>Mentors assigned:</h5>
                <ul>
                    <li>mentor 1</li>
                    <li>mentor 1</li>
                    <li>mentor 1</li>
                </ul> */}
                
            
        </Col>
        <Col sm={2}>
                
        <Button className='p-1 m-1' variant='warning' onClick={handleCourseShow}>Update course</Button>
        <CourseUpdateModal coursePutShow={coursePutShow} handleCourseClose={handleCourseClose} course={courseSelector.course} id= {params.id}/>
        </Col>
    </Row>
    </div>
  )
}

export default AdminCourse

// modal for updating course
const CourseUpdateModal = ({coursePutShow,handleCourseClose,id})=>{
    const courseSelector = useSelector((state)=>state.Course)
    const course = courseSelector.course

    const [newCourse, setNewCourse] = useState({
        name: course ? course.name : '',
        description: course ? course.description : '',
        category: course ? course.category : {},
        price: course ? course.price : '',
      });
     
      const handleChange = (e)=>{
        const {name,value} = e.target
        if (name === 'category') {
          const categoryId = e.target.options[e.target.selectedIndex].id;
          setNewCourse((prevData) => ({
            ...prevData,
            category: { id: categoryId, name: value } // Use id and value directly
          }));
        }else{
          
          setNewCourse((prevData)=>({
            ...prevData,
            [name]:value
          }))
        }
        
      }

      const handleFileChange = (e)=>{
        
        setNewCourse((prevData)=>({
          ...prevData,
          thumbnail:e.target.files[0]
        }))
    
      }

      
      const categoriesSelector = useSelector((state)=>state.Categories)
      const dispatch = useDispatch()
      const categoryName = course.category && course.category.name ? course.category.name : 'Default Category Name';
    
    
      const handleSubmit = async(e)=>{
        e.preventDefault()
        const isFormValid = Object.values(newCourse).every((value)=>{
          if(typeof value === 'string'){
            return value.trim () !==""
          }
          return true
        })
        if (isFormValid){


          try{
  
              const res = await courseUpdateInstance(id,newCourse)
              toast.success("Course updated successfully!")
              dispatch(updateCourse(res))
              console.log("course updated successfully",res)
              handleCourseClose()
          }
          catch(error){
              console.log("Course updation failed",error)
  
          }
        }else{
          toast.error("All fields are required!")
        }

    
      }
    
      
      
    
      return (
        <>
          <Modal show={coursePutShow} onHide={handleCourseClose}  >
            <Form onSubmit={handleSubmit} action="/upload" encType="multipart/form-data">
              <Modal.Header closeButton className='p-3'>
                <Modal.Title >Add new course</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Form.Group className="mb-3 p-3" controlId="exampleForm.ControlInput1">
                    <Form.Label >Course Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={newCourse.name}
                      name='name'
                      onChange={(e)=>handleChange(e)}
                      placeholder="Course"
                      autoFocus
                    />
                  </Form.Group>
    
                  <Form.Group className="mb-3 p-3" controlId="exampleForm.ControlInput1">
                    <Form.Label >Course Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      value={newCourse.description}
                      rows={3}
                      name='description'
                      onChange={(e)=>handleChange(e)}
                      placeholder="Course Description"
                      autoFocus
                    />
                  </Form.Group>
    
                  <Form.Group className="mb-3 p-3" >
                    <Form.Label >Category</Form.Label>
                      <Form.Select aria-label="Default select example" value={newCourse.category} name='category' 
                      onChange={(e)=>handleChange(e)} defaultValue={categoryName}>
                        <option disabled>select any category</option>
                        {categoriesSelector.categories.map((category)=>(
                          <option key={category.id} id={category.id} value={category.name} >{category.name}</option>
    
                        ))}
                      </Form.Select>
                  </Form.Group>
    
                  <Form.Group className="mb-3 p-3" controlId="exampleForm.ControlInput1">
                    <Form.Label >Price</Form.Label>
                    <Form.Control
                      type="text"
                      value={newCourse.price}
                      name='price'
                      onChange={(e)=>handleChange(e)}
                      placeholder="price"
                      autoFocus
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 p-3">
                    <Form.Label >Course Thumbnail</Form.Label>
                    <Form.Control accept='image/png, image/jpeg' id='image' type="file" name='thumbnail' onChange={(e)=>handleFileChange(e)} />
                  </Form.Group>
                  
              </Modal.Body>
              <Modal.Footer className='p-3'>
                <Button variant="" style={{backgroundColor:"#12A98E"}} className='p-1 text-light' type='submit'>
                  Save Changes
                </Button>
                <Button variant="secondary" className='p-1' onClick={handleCourseClose} >
                  Close
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </>
      );   
}



// modal for updating particular task
const TaskUpdateModal = ({handleTaskEditClose,taskPutShow,task,id})=>{
    const [newTask,setNewTask]=useState({
      course:id,
      module:"",
      task:""
    })
    const dispatch = useDispatch()
    console.log(task.id)
    

    const handleChange = (e)=>{
        
        const {name,value}= e.target
        setNewTask((prevData)=>({

            ...prevData,
            [name]:value
        }))
    }
    const handleTaskSubmit = async(e)=>{
        e.preventDefault()
        try{
            const res = await updateTaskInstance(newTask.id,newTask)
            console.log('new task added ',res)
            handleTaskEditClose()
            dispatch(updateTask(newTask))
        }catch(error){
            console.log("failed to add new Task",error)
        }

    }
    useEffect(() => {
      setNewTask(task)
      dispatch(fetchTask(task.id))
  }, [task,dispatch]);

    return (
    <>
        <Modal show={taskPutShow} onHide={handleTaskEditClose}>
        <Form onSubmit={handleTaskSubmit}>
            <Modal.Header closeButton className='p-3'>
            <Modal.Title>Add New Task</Modal.Title>
            </Modal.Header>
            <Modal.Body className='p-2'>
                <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
                <Form.Label>Module Name</Form.Label>
                <Form.Control
                    type="text"
                    name='module'
                    placeholder="Module Name"
                    onChange={handleChange}
                    value= {newTask.module}
                    autoFocus
                />
                </Form.Group>
                <Form.Group className="mb-3 " controlId="exampleForm.ControlInput2">
                <Form.Label>New Task</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="New Task"
                    onChange={handleChange}
                    value= {newTask.name}
                    name='name'
                    autoFocus
                />
                </Form.Group>
                
            </Modal.Body>
            <Modal.Footer className='p-2'>
            <Button variant="secondary" className='p-1' onClick={handleTaskEditClose}>
                Close
            </Button>
            <Button variant=""  style={{backgroundColor:"#12A98E"}} type='submit' className='p-1 text-light'>
                Save Changes
            </Button>
            </Modal.Footer>
        </Form>
      </Modal>
    </>
    )
}

// modal for adding new task
const NewTaskModal =({handleNewTaskClose,addTaskShow,course,id})=>{
    
    
    const [newTask ,setNewTask] = useState({
        course:id,
        name:"",
        module:""
    })
    const handleChange = (e)=>{
        
        const {name,value}= e.target
        setNewTask((prevData)=>({

            ...prevData,
            course:id,
            [name]:value
        }))
    }
    const dispatch = useDispatch()
    const handleTaskSubmit = async(e)=>{
        e.preventDefault()
        try{
            const res = await addTaskInstance(id,newTask)
            console.log('new task added ',res)
            dispatch(addTask(res))
            handleNewTaskClose()
            setNewTask({course:id,
              name:"",
              module:""})
        }catch(error){
            console.log("failed to add new Task",error)
        }

    }

    return (
    <>
        <Modal show={addTaskShow} onHide={handleNewTaskClose}>
        <Form onSubmit={handleTaskSubmit}>
            <Modal.Header closeButton className='p-3'>
            <Modal.Title>Add New Task</Modal.Title>
            </Modal.Header>
            <Modal.Body className='p-2'>
                <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
                <Form.Label>Module Name</Form.Label>
                <Form.Control
                    type="text"
                    name='module'
                    placeholder="Module Name"
                    onChange={handleChange}
                    value= {newTask.module}
                    autoFocus
                />
                </Form.Group>
                <Form.Group className="mb-3 " controlId="exampleForm.ControlInput2">
                <Form.Label>New Task</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="New Task"
                    onChange={handleChange}
                    value= {newTask.name}
                    name='name'
                    autoFocus
                />
                </Form.Group>
                
            </Modal.Body>
            <Modal.Footer className='p-2'>
            <Button variant="secondary" className='p-1' onClick={handleNewTaskClose}>
                Close
            </Button>
            <Button variant=""  style={{backgroundColor:"#12A98E"}} type='submit' className='p-1 text-light'>
                Save Changes
            </Button>
            </Modal.Footer>
        </Form>
      </Modal>
    </>

    )
}

// modal for blocking the course
const CourseStatusModal =({handleStatusClose, statusShow, course, id})=>{
    const dispatch= useDispatch()
    const handleBlock = async ()=>{
        try{
            const updateData =  {status:!course.status}
            const updateCourse = await courseUpdateInstance(id,updateData)
            console.log("course updated successfully:",updateCourse)
            dispatch(blockCourse())
            handleStatusClose()
            toast.success('Course have been blocked')
        }catch(error){
            console.log("error while updating!")
            toast.error("Failed to update course",error)
        }
    }


    return (
    <>
    <Modal
      show={statusShow} onHide={handleStatusClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className='p-3'>
        <Modal.Title id="contained-modal-title-vcenter">
          Course Status
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='p-2'>
        <p>
          Are you sure you want to Deactivate this course?
        </p>
      </Modal.Body>
      <Modal.Footer className='p-2'>
        <Button onClick={handleBlock} className='p-2' variant='warning'>Confirm</Button>
      </Modal.Footer>
    </Modal>

    </>
    )
}

const TaskDeleteModal  =({handleTaskDeleteClose, taskDeleteShow, task})=>{
    const [taskId,setTaskId] = useState(0)
    useEffect(()=>{setTaskId(task.id)},[task])
    const dispatch = useDispatch()

    const handleDelete = async ()=>{
        try{
            const res = await taskDeleteInstance(taskId)
            console.log("Successfully deleted task")
            handleTaskDeleteClose()
            toast.success('Task deleted successfully')
            dispatch(deleteTask(taskId))
        }catch(error){
            console.log("error while updating!")
            toast.error("Failed to update course",error)
        }
    }


    return (
    <>
    <Modal
      show={taskDeleteShow} onHide={handleTaskDeleteClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className='p-3'>
        <Modal.Title id="contained-modal-title-vcenter">
          Course Status
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='p-2'>
        <p>
          Are you sure you want to Delete this task?
        </p>
      </Modal.Body>
      <Modal.Footer className='p-2'>
        <Button onClick={handleDelete} className='p-2' variant='warning'>Confirm</Button>
      </Modal.Footer>
    </Modal>

    </>
    )
}