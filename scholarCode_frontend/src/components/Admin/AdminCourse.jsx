import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import { Button } from 'react-bootstrap'
import samplecourse from '../../assets/samplecourse.png'

const AdminCourse = () => {
    const style = {
        position: "absolute",
        left: "350px",
        right: "100px",
        top: "100px"
    }
  return (
    <div style={style}>
    <Row>
        <Col sm={4} className='text-center'>
            
            <Image src={samplecourse} className='w-50 mx-3 rounded' />
            <br />
            <br />
            <h4>Course Name</h4>
            <h6>Published on:12-12-2023 </h6>
            
        </Col>
        <Col sm={8} >
            <h3>Course Details</h3>
            <br />
                <h6 className='m-2'>Course name:</h6>
                <h6 className='m-2'>Course description:</h6>
                <br />
                <h6 className='m-2'>Total Modules:</h6>
                <h6 className='m-2'>Price:</h6>
                <h6 className='m-2'>Course status: ACTIVE</h6>
                <br />
                <Button className='p-1 m-1 bg-danger'>Block course</Button>
                <Button className='p-1 m-1 bg-success'>Update course</Button>
                <br />
                <br />
                <h5 className='m-2'>Modules:</h5>
                <ul>
                    <li>module 1</li>
                    <li>module 1</li>
                    <li>module 1</li>
                </ul>
                <br />
                <h5 className='m-2'>Mentors assigned:</h5>
                <ul>
                    <li>mentor 1</li>
                    <li>mentor 1</li>
                    <li>mentor 1</li>
                </ul>
                
            
        </Col>
    </Row>
    </div>
  )
}

export default AdminCourse