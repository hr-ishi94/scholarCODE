
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
import { mentorStatusInstance } from '../../Axios/AdminServer/AdminServer'
import { fetchMentor } from '../../Redux/Slices/MentorDetailSlice'
import { toast } from 'react-toastify'
import { jwtDecode } from 'jwt-decode'


const MentorProfile = () => {
    
    const MentorToken = useSelector((state)=>state.MentorToken)
    const access = jwtDecode(MentorToken.access)
    const user_id = access.user_id
    const {mentor,status,error} = useSelector((state)=>state.Mentor)
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch()
    console.log(user_id)

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    
    useEffect(()=>{
        dispatch(fetchMentor(user_id))
    },[dispatch])
    
    
    console.log(mentor,"meon")
    const style = {
        position: "absolute",
        left: "350px",
        right: "100px",
        top: "100px"
    }
    if (status === "loading") {
        return <Loader />;
      }

    return (
    <div style={style}>
   <Row className=' my-5'>
            <Col sm={6} className='text-center'>
                
                <Image src={mentor.profile_img?mentor.profile_img:avatar} className='w-25 mx-3 rounded' />
                <br />
                <h4>{mentor.username}</h4>
                <h4>{mentor.email}</h4>
                {mentor.is_staff && 
                <h6 style={{color:"#12A98E"}}><i className="fa-solid fa-circle-check"></i> Verified</h6>
                }
                
            </Col>
            <Col sm={6} >
                <h2>Mentor Profile</h2>
                <br />
                    <h5 className='m-2'>Name: {mentor.first_name && mentor.last_name? mentor.first_name + " "  +mentor.last_name:<span style={{ fontSize: 'small', color: 'red' }}> Please update your details</span>}</h5>
                    <h6 className='m-2'>Email: {mentor.email?mentor.email:"--"}</h6>
                    <h6 className='m-2'>Designation: {mentor.designation?mentor.designation:<span style={{ fontSize: 'small', color: 'red' }}>Please update your designation</span>} </h6>
                    <h6 className='m-2'>Linkedin Profile: {mentor.linkedin_profile} </h6>
                    <br />
                    <Button className="p-2 text-light" variant="" style={{backgroundColor:"#12A98E"}}  onClick={handleShowModal}>Edit details</Button>
                    
                    
                <UpdateProfileModal show={showModal} handleClose={handleCloseModal} mentor={mentor}/>
            </Col>
            
        </Row>
    </div>
  )
}

export default MentorProfile

function UpdateProfileModal({show,handleClose,mentor}) {

    const dispatch = useDispatch()
    const [formData,setFormData] = useState({

        first_name:mentor.first_name,
        last_name:mentor.last_name,
        email:mentor.email,
        username:mentor.username,
        designation:mentor.designation,
        linkedin_profile:mentor.linkedin_profile,
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
                const res = await mentorStatusInstance(mentor.id,formData)
                dispatch(fetchMentor(mentor.id))
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
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                <Form.Label>Linkedin Profile</Form.Label>
                <Form.Control
                    type="text"
                    autoFocus
                    name='linkedin_profile'
                    value={formData.linkedin_profile}
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
