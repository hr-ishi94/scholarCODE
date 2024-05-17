
import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import { Button } from 'react-bootstrap'
import avatar from '../../assets/avatar.jpg'
import Modal  from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'

const MentorProfile = () => {
    const style = {
        position: "absolute",
        left: "350px",
        right: "100px",
        top: "100px"
    }
    return (
    <div style={style}>
    <Row>
        <Col sm={3} className='text-center'>
            
            <Image src={avatar} className='w-50 mx-3 rounded' />
            <br />
            <br />
            <h4>Mentor.name</h4>
            {/* <h6>Published on: {Mentor.published_on} </h6> */}
            
        </Col>
        <Col sm={7} >
            <h3>Mentor Profile</h3>
            <br />
                <h5 className='m-2'>Mentor.name</h5>
                <h6 className='m-2'>Mentor.description</h6>
                <br />
                <h6 className='m-2'>Total Modules: </h6>
                <h6 className='m-2'>Price: ₹Mentor.price* only</h6>
                <h6 className='m-2'>Course status: Mentor.status<span className='bg-success p-1'>ACTIVE</span>:<span className='bg-danger p-1'>INACTIVE</span></h6>
                <br />
                <Button className="p-2" variant="" >Mentor.status</Button>
                <br />
                        <h4>Syllabus</h4>
                <br />
                <br />
               
                
            
        </Col>
        <Col sm={2}>
                
        <Button className='p-1 m-1' variant='warning' >Relieve course</Button>
        </Col>
    </Row>
    </div>
  )
}

export default MentorProfile

