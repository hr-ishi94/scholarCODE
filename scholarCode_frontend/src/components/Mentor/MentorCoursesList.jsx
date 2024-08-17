import React, { useEffect, useState } from 'react'
import Row  from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCourse,fetchMentorCourse } from '../../Redux/Slices/mentorSide/MentorCourseSlice';
import { course } from '../../Axios/Urls/EndPoints';
import Loader from '../Utils/Loader';
import { Modal } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { fetchCoursesList } from '../../Redux/Slices/CoursesListSlice';
import { MentorCourseAssign } from '../../Axios/MentorServer/MentorServer';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';


const MentorCoursesList = () => {
    const mentorSelector = useSelector((state)=>state.Mentor)
    const categorySelector = useSelector((state)=> state.Categories)
    const courseSelector = useSelector((state)=>state.Courses)
    const MentorCourseSelector = useSelector((state)=>state.MentorCourses)
    

    const [showModal ,setShowModal] =useState(false)
    const handleShow=()=>setShowModal(true)
    const handleClose=()=>setShowModal(false)
    
    const id = mentorSelector.mentor.id
    const dispatch = useDispatch()

    const MentorCourseSet = new Set()
    if (Array.isArray(MentorCourseSelector.courses)) {
        MentorCourseSelector.courses
          .filter((course) => course.mentor === id)
          .forEach((course) => MentorCourseSet.add(course.course));
      }

      
    useEffect(()=>{
        dispatch(fetchMentorCourse())
        dispatch(fetchCoursesList())
    },[dispatch])


    // console.log(mentorCourseSelector,'df')
    const sortedCourses = [];
   
    if (MentorCourseSelector.courses && MentorCourseSelector.courses.length > 0) {
        MentorCourseSelector.courses.forEach(courseId => {
            const matchingCourse = courseSelector.courses.find(course => course.id === courseId.course && courseId.mentor === id);
            if (matchingCourse) {
                sortedCourses.push(matchingCourse);
            }
        });
    } else {
        // Handle the case of an empty array (optional)
        console.log("No courses found in mentorCourseSelector.courses");
    }
            
    if (MentorCourseSelector.status =='loading'){
        return <Loader/>
    }

    const style = {
        position: "absolute",
        left: "350px",
        right: "100px",
        top: "100px"
    }

  return (
    <div style={style}>

    <Row>
        <Col sm={10}>
            <h1>Assigned Courses List</h1>
        </Col>
        <Col sm={2}>
            <Button
            className='p-1 text-light' 
            variant='' 
            style={{backgroundColor:'#12A98E'}} onClick={handleShow}>Assign new Course</Button>
        </Col>
    </Row>
    <AddCourseModal show={showModal} handleClose={handleClose} mentorId = {id} courseSet ={MentorCourseSet}/>
    <br />

    <Table striped bordered hover className='text-center'>
    <thead>
        <tr>
        <th>id</th>
        <th>Course name</th>
        <th>Status</th>
        <th>Action</th>
        </tr>
    </thead>
    <tbody >
        {sortedCourses.map((course,index)=>(

        <tr key={index}>
            <td>{index+1}</td>
            <td>{course.name}</td>
            <td>{course.status?<span className='text-success'>Active</span>:<span className='text-danger'>Inactive</span>}</td>
            
            <td><Link to={`/mentor/course/${course.id}/`}><Button variant='' style={{backgroundColor:"#12A98E"}} className='text-light p-1'>view</Button></Link></td>
        </tr>
        ))}
        
        
    </tbody>
    </Table>
    
        


</div>
  )
}

export default MentorCoursesList




const AddCourseModal = ({handleClose,show,mentorId,courseSet})=> {

    const [formData,setFormData] = useState({
        course:'',
        mentor:mentorId
    })

    const {courses,status, error} = useSelector((state)=>state.Courses)
    const dispatch = useDispatch()


    const handleChange = (e)=>{
        const {name,value} = e.target
        setFormData((prevData)=>({
            ...prevData,
            [name]:Number(value)
        }))
    }
    // console.log(formData,'jjjj')

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            const res = await MentorCourseAssign(formData)
            if(res.status === 200 || res.status === 201){
                toast.success("Successfully assigned new course")
                handleClose()
                dispatch(addCourse(res.data))
            }
            else{
                if (res.data.non_field_errors){

                    toast.error('You cannot assign the same course again ')
                }
                else{
                    toast.error(res.data.course[0])

                }
            }
            

            
        }catch(error){
            console.log(error,'error')

        }
    }
    
   
  
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Form onSubmit={handleSubmit} action='/upload'encType='multipart/form-data'>
            <Modal.Header closeButton className='p-3'>
              <Modal.Title >Assign new Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
                <Form.Group className="mb-3 p-3">
                    <Form.Label>Course</Form.Label>
                    <Form.Select  name='course' value={formData.course} onChange={handleChange}>
                        <option>----- Choose the Course that you can Mentor -----</option>

                        {courses
                        .filter((course)=> !courseSet.has(course.id))
                        .map((course)=>
                            <option key={course.id  } value={course.id} >{course.name}</option>
                        )}

                    </Form.Select>
                </Form.Group>
                
            </Modal.Body>
            <Modal.Footer className='p-3'>
              <Button variant="" style={{backgroundColor:"#12A98E"}} className='p-1 text-light' type='submit'>
                Save Changes
              </Button>
              <Button variant="secondary" className='p-1' onClick={handleClose} >
                Close
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </>
    );
  }
  