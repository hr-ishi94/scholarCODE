import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import {Button} from 'react-bootstrap'
import avatar from '../../assets/avatar.jpg'
import {useParams} from 'react-router-dom';
import axios from 'axios'

const baseUrl = 'http://127.0.0.1:8000/'


const AdminUser = () => {

    const params = useParams()
    
    const userStyle ={
        position: "absolute",
        left: "350px",
        right: "100px",
        top: "100px"
    }

    const [user, setUser] = useState([])
    useEffect(()=>{
      async function userFetch(){
        const response = await axios.get(`${baseUrl}/main/user/${params.id}/`)
        setUser(response.data)
      }
      userFetch()
    },[])

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
            <label htmlFor="input1" className='m-2'>First name:</label>
            <br />
            <label htmlFor="input2" className='m-2'>Last name:</label>
            <br />
            <label htmlFor="input3" className='m-2'>Email:</label>
            <br />
            <label htmlFor="input4" className='m-2'>Designation:</label>
            
            </Col>
            <Col sm={8}>
          <input type="text" name='input1'  className='m-2 text-center' placeholder= {user.first_name}/>
          <br />
          <input type="text" name='input2' className='m-2 text-center' placeholder={user.last_name}/>
          <br />
          <input type="text" name='input3' className='m-2 text-center'placeholder={user.email}/>
          <br />
          <input type="text" name='input4' className='m-2 text-center' placeholder={user.designation}/> 
          <br />
          <br />
          <Button className='p-2'style={{backgroundColor:"#12A98E"}}>Update changes</Button>
          <Button className='p-2 bg-danger mx-2 p-2'>Block User</Button>
            
           </Col>
            
          </Row>
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