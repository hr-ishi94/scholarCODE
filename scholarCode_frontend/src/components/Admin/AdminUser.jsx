import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import avatar from '../../assets/avatar.jpg'
import {useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { blockUser, fetchUser } from '../../Redux/Slices/UserDetailsSlice'
import { toast } from 'react-toastify'
import { userstatusInstance } from '../../Axios/AdminServer/AdminServer'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Loader from '../Utils/Loader'
import { fetchAllEnrolledCourses } from '../../Redux/Slices/Userside/AllEnrolledCoursesSlice'
import { fetchCoursesList } from '../../Redux/Slices/CoursesListSlice'

const AdminUser = () => {

    const params = useParams()
    const [userDetail, setUserDetail] = useState([])

    const dispatch = useDispatch()
    const {user, status, error} =  useSelector((state)=>state.User)
    const EnrolledCourseSelector = useSelector((state)=>state.AllEnrolls)
    const CoursesSelector = useSelector((state)=>state.Courses)

    const [modalShow, setModalShow] = React.useState(false);
    
    const userStyle ={
        position: "absolute",
        left: "350px",
        right: "100px",
        top: "100px"
    }
    if (error &&error.trim().length >0){
      toast.error(error)
    }
    useEffect(()=>{
      dispatch(fetchCoursesList())
      dispatch(fetchAllEnrolledCourses())
      dispatch(fetchUser(params.id))
      
    },[dispatch])

    const userEnrolled = EnrolledCourseSelector.enrolls?.filter((enroll)=>enroll.user.id === user.id)
    console.log(userEnrolled,'loi')
    if (status === "loading") {
      return <Loader />;
    }
  


  return (
    <div style={userStyle}>
        <Row>
        <Col sm={4} className='text-center'>
          
          <Image src={user.profile_img?user.profile_img:avatar} className='w-50 mx-3'roundedCircle />
          <br />
          <h4>{user.username}</h4>
          <h6>{user.email}</h6>
          <h6>{user.designation}</h6>
        </Col>
        <Col sm={8} >
          <h3>User Details</h3>
          <br />
          <Row>
            <Col sm={4}>
            <h6 className='m-2'>First name: {user.first_name || <span className='text-secondary'>-NA-</span> }</h6>
            
            <h6 className='m-2'>Last name: {user.last_name || <span className='text-secondary'>-NA-</span>}</h6>
            <h6 className='m-2'>Email: {user.email}</h6>
            <h6 className='m-2'>Designation: {user.designation || <span className='text-secondary'>-NA-</span>}</h6>
            <h6 className='m-2'>Status: {user.is_active?<span className='bg-success p-1'>ACTIVE</span>:<span className='bg-danger p-1'>INACTIVE</span>}</h6>
            <br />
            <Button className="p-2" variant={user.is_active?"danger":"success"} onClick={() => setModalShow(true)}>{user.is_active?"Block User":"Unblock User"}</Button>
            
            </Col>
           
            
           
            
          </Row>
          <br />
          <h4>Courses Enrolled : {userEnrolled.length} nos</h4>
          <br />
          {userEnrolled?.map((enroll)=>
            <div key={enroll.id}>
            {CoursesSelector.courses?.filter((course)=>course.id === enroll.course.course ).map((course)=>
          <h5>course :{course.name}</h5>
            )}
          <h6 className='text-secondary'>status:{enroll.is_completed?<span className='text-sucess'>Completed</span>:<span className='text-primary'> ongoing</span>}</h6>
            </div >
          )}
          <br />
          
          
        </Col>

        </Row>
       

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        user = {user}
        id = {params.id}

      />
    </div>

  )
}

export default AdminUser



function MyVerticallyCenteredModal(props) {
  const dispatch = useDispatch()
  const id = props.id
  const handleBlock = async () => {
    try {
    const updateData = { is_active: !props.user.is_active }; 
    const updatedUser = await userstatusInstance(id, updateData); // Pass update data to userstatusInstance
    console.log("User status updated successfully:", updatedUser);
      dispatch(blockUser(id));
      props.onHide() // Dispatch the blockUser action to update Redux state
    } catch (error) {
      console.error("Error updating user status:", error); // Log any errors that occur during the update process
    }
  };

  
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className='p-3'>
        <Modal.Title id="contained-modal-title-vcenter">
          User Status
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='p-2'>
        <p>
          Are you sure you want to Block user?
        </p>
      </Modal.Body>
      <Modal.Footer className='p-2'>
        <Button onClick={handleBlock} className='p-2' variant='warning'>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
}
