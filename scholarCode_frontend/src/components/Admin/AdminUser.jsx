import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import {Button} from 'react-bootstrap'
import avatar from '../../assets/avatar.jpg'
import {useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../../Redux/Slices/UserDetailsSlice'
import { toast } from 'react-toastify'

const AdminUser = () => {

    const params = useParams()
    const [userDetail, setUserDetail] = useState([])

    const dispatch = useDispatch()
    const {user, status, error} =  useSelector((state)=>state.User)
    
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
     
      dispatch(fetchUser(params.id))
      if (user?.length !== 0){
        setUserDetail(user)
      }
    },[dispatch])

  return (
    <div style={userStyle}>
        <Row>
        <Col sm={4} className='text-center'>
          
          <Image src={userDetail.profile_img?userDetail.profile_img:avatar} className='w-50 mx-3'roundedCircle />
          <br />
          <h4>{userDetail.username}</h4>
          <h6>{userDetail.email}</h6>
          <h6>{userDetail.designation}</h6>
        </Col>
        <Col sm={8} >
          <h3>User Details</h3>
          <br />
          <Row>
            <Col sm={4}>
            <h6 className='m-2'>First name: {userDetail.first_name}</h6>
            <br />
            <h6 className='m-2'>Last name: {userDetail.last_name}</h6>
            <br />
            <h6 className='m-2'>Email: {userDetail.email}</h6>
            <br />
            <h6 className='m-2'>Designation: {userDetail.designation}</h6>
            <br />
            <h6 className='m-2'>Status: {userDetail.isactive?<span className='bg-success p-1'>ACTIVE</span>:<span className='bg-danger p-1'>INACTIVE</span>}</h6>
            <br />
            {userDetail.isactive?<Button className='p-2 bg-danger mx-2 p-2'>Block User</Button>:<Button className='p-2 bg-success mx-2 p-2'>Unblock User</Button>}
            </Col>
           
            
           
            
          </Row>
          <br />
          <h4>Courses Enrolled</h4>
          <br />
          <h5>course 1</h5>
          <h6>Current Week</h6>
          <br />
          <h5>course 1</h5>
          <h6>Current Week</h6>
          <br />
          <h5>course 1</h5>
          <h6>Current Week</h6>
          
        </Col>

        </Row>
    </div>
  )
}

export default AdminUser