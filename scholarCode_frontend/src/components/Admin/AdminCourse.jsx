import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
// import courseThumbanail from '../../assets/courseThumbanail.png'

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
            
            <Image src= '' className='w-50 mx-3'roundedCircle />
            <br />
            <h4>Course Name</h4>
            <h6>Course Description</h6>
        </Col>
        <Col sm={8} >
            <h3>User Details</h3>
            <br />
                <label htmlFor="input1" className='m-2'>First name:</label>
                <br />
                <label htmlFor="input2" className='m-2'>Last name:</label>
                <br />
                <label htmlFor="input3" className='m-2'>Email:</label>
                <br />
                <label htmlFor="input4" className='m-2'>Designation:</label>
                
            
        </Col>
    </Row>
    </div>
  )
}

export default AdminCourse