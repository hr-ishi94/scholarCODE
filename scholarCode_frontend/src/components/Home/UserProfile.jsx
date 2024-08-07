import React, { useCallback, useEffect, useReducer ,useState} from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import avatar from '../../assets/avatar.jpg'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Utils/Loader'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import  Form  from 'react-bootstrap/Form'
import { toast } from 'react-toastify'
import { userstatusInstance } from '../../Axios/AdminServer/AdminServer'
import { fetchUser } from '../../Redux/Slices/UserDetailsSlice'
import { fetchAllEnrolledCourses } from '../../Redux/Slices/Userside/AllEnrolledCoursesSlice'
import { Table } from 'react-bootstrap'
import { fetchMentors } from '../../Redux/Slices/MentorsSlice'
import { fetchCoursesList } from '../../Redux/Slices/CoursesListSlice'




const UserProfile = () => {
    const {user,status,error}= useSelector((state)=>state.User)
    const [showModal, setShowModal] = useState(false);
    const EnrolledCourses = useSelector((state)=>state.AllEnrolls)
    const MentorSelector = useSelector((state)=>state.Mentors)
    const CoursesSelector = useSelector((state)=>state.Courses)

    const dispatch = useDispatch()
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    useEffect(()=>{
        dispatch(fetchAllEnrolledCourses())
        dispatch(fetchMentors())
        dispatch(fetchCoursesList())
    },[dispatch])
    const Enrolls = EnrolledCourses.enrolls && EnrolledCourses.enrolls.filter((enroll)=>enroll.user.id === user.id)
    const Completed = Enrolls && Enrolls.filter((enroll)=>enroll.is_completed)
    
   
    
    if (status === "loading") {
        return <Loader />;
      }

    return (
    <div className='container'>
        <br />
        <Row className=' my-5'>
            <Col sm={6} className='text-center'>
                
                <Image src={user.profile_img?user.profile_img:avatar} className='w-25 mx-3 rounded' />
                <br />
                <h4>{user.username}</h4>
                <h4>{user.email}</h4>
                
            </Col>
            <Col sm={6} >
                <h2>User Profile</h2>
                <br />
                    <h5 className='m-2'>Name: {user.first_name && user.last_name? user.first_name + " "  +user.last_name:<span style={{ fontSize: 'small', color: 'red' }}> Please update your details</span>}</h5>
                    <h6 className='m-2'>Email: {user.email?user.email:"--"}</h6>
                    <h6 className='m-2'>Designation: {user.designation?user.designation:<span style={{ fontSize: 'small', color: 'red' }}>Please update your designation</span>} </h6>
                    <h6 className='m-2'>Courses Enrolled : {Enrolls.length} Nos </h6>
                    <h6 className='m-2'>Completed Courses : {Completed.length} Nos </h6>
                    <br />
                    <Button className="p-2 text-light" variant="" style={{backgroundColor:"#12A98E"}}  onClick={handleShowModal}>Edit details</Button>
                    
                    
                <UpdateProfileModal show={showModal} handleClose={handleCloseModal} user={user}/>
            </Col>
            
        </Row>
        <Table className='text-center'>
            <thead >
                <tr >
                    <td>id</td>
                    <td>Course</td>
                    <td>Mentor Assigned</td>
                    <td>Current Module</td>
                    <td>Status</td>

                </tr>
            </thead>
            <tbody>
                {Enrolls
                .sort((a,b)=>a.id - b.id)
                .map((enroll,index)=>(
                <tr key={index}>
                    <td>{index + 1}</td>
                    {CoursesSelector.courses
                    .filter((course)=>course.id == enroll.course.course)
                    .map((course)=>
                        <td>{course.name}</td>
                    )
                    }
                    {MentorSelector.mentors
                    .filter((mentor)=>mentor.id === enroll.course.mentor)
                    .map((mentor)=>
                    <td>{mentor.first_name} {mentor.last_name}</td>
                    )}
                    <td>{enroll.current_module}</td>
                    <td>{enroll.is_completed?<span className='text-success'>Completed<i className="fa-solid fa-circle-check"></i></span>:<span className='text-primary'>Ongoing</span>}</td>

                </tr>

                ))}

            </tbody>
        </Table>
    </div>
  )
}

export default UserProfile


function UpdateProfileModal({show,handleClose,user}) {

    const dispatch = useDispatch()
    const [formData,setFormData] = useState({

        first_name:user.first_name,
        last_name:user.last_name,
        email:user.email,
        username:user.username,
        designation:user.designation,
        password:'',
        confirm_password:'',

    })

    const handleChange = (e)=>{
        const { name,value } = e.target
        setFormData((prevData)=>({
            ...prevData,
            [name]:value
        }))
    }

    const handleFileChange = (e)=>{
        setFormData((prevData)=>({
          ...prevData,
          profile_img:e.target.files[0]
        }))   
    }

    const handleSubmit = useCallback(async(e)=>{
        e.preventDefault()
        const isFormValid = Object.values(formData).every((value)=>{
            if (typeof value === 'string'){
                return value.trim() !== ""
            }
            return true

        })
        if(isFormValid){
            try{
                if (formData.password || formData.confirm_password) {
                    if (formData.password !== formData.confirm_password) {
                        toast.error("Passwords do not match");
                        return;
                    }
                }
                const res = await userstatusInstance(user.id,formData)
                dispatch(fetchUser(user.id))
                toast.success("Updated successfully")  
            }
            catch(error){
                console.log(error)
                return error
            }
        }else{
            toast.error("All fields required")
        }   
       
    },[formData,dispatch])

  return (
    <>
      

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
            <Modal.Header className='p-3' closeButton>
            <Modal.Title >Update Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body className='p-3'>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    type="text"
                    autoFocus
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    type="text"
                    autoFocus
                    name='last_name'
                    value={formData.last_name}
                    onChange={handleChange}
                />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    autoFocus
                    name='username'
                    value={formData.username}
                    onChange={handleChange}
                />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                <Form.Label>Designation</Form.Label>
                <Form.Control
                    type="text"
                    autoFocus
                    name='designation'
                    value={formData.designation}
                    onChange={handleChange}
                />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    autoFocus
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    autoFocus
                    name='password'
                    onChange={handleChange}
                />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput7">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type="password"
                    autoFocus
                    name="confirm_password"
                    onChange={handleChange}
                    
                />
                </Form.Group>
                <Form.Group className="mb-3 p-3">
                    <Form.Label >Profile Image</Form.Label>
                    <Form.Control accept='image/png, image/jpeg' id='image' type="file" name='profile_img' onChange={(e)=>handleFileChange(e)} />
                </Form.Group>
                
            </Modal.Body>
            <Modal.Footer className='p-2'>
            <Button variant="secondary p-1" onClick={handleClose}>
                Close
            </Button>
            <Button variant="" style={{backgroundColor:"#12A98E"}} type='submit' className=" p-1 text-light" onClick={handleClose}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
