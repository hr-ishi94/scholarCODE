import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import { Button } from 'react-bootstrap'
import avatar from '../../assets/avatar.jpg'




const UserProfile = () => {

    return (
    <div className='container'>
        <br />
        <Row className=' my-5'>
            <Col sm={6} className='text-center'>
                
                <Image src={avatar} className='w-25 mx-3 rounded' />
                <br />
                <br />
                <h4>Mentor.name</h4>
                {/* <h6>Published on: {Mentor.published_on} </h6> */}
                
            </Col>
            <Col sm={6} >
                <h2>Mentor Profile</h2>
                <br />
                    <h5 className='m-2'>Mentor.name</h5>
                    <h6 className='m-2'>Mentor.description</h6>
                    <br />
                    <h6 className='m-2'>Total Modules: </h6>
                    <h6 className='m-2'>Price: ₹Mentor.price* only</h6>
                    <h6 className='m-2'>Course status: Mentor.status<span className='bg-success p-1'>ACTIVE</span>:<span className='bg-danger p-1'>INACTIVE</span></h6>
                    <br />
                    <Button className="p-2" variant="success" >Edit</Button>
                    
                    
                
            </Col>
            
        </Row>
    </div>
  )
}

export default UserProfile