import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import avatar from '../../assets/avatar.jpg'
import Form from 'react-bootstrap/Form';
import './JoinMentor.css'

const JoinMentor = () => {
  return (
    <div className='container text-center p-5'>
        <br />
        <h1>Join Mentor Team</h1>
        <Form>
            <Row>   
                <Col sm = {4}>
                    <img src={avatar} className='avatar-mentor' alt="" />
                    <input type="file" id="myFile" name="filename"></input>
                </Col>
                <Col sm={8}>
                    <br />
                    <Form.Group className="mb-3" controlId="formGroupfirst_name">
                        <Form.Control type="first_name" placeholder="Enter First name" size='lg' />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGrouplast_name">
                        <Form.Control type="last_name" placeholder="Enter Last name" size='lg' />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Control type="email" placeholder="Enter Email"  size='lg'/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupdesignation">
                        <Form.Control type="designation" placeholder="Your Designation"  size='lg'/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGrouplinkedin">
                        <Form.Control type="linkedin" placeholder="Linkedin ID"  size='lg'/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Control type="password" placeholder="Password"  size='lg'/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupConfirmPassword">
                        <Form.Control type="confirmpassword" placeholder="  Confirm Password" size='lg'/>
                    </Form.Group>
                    <button className='signupButton' type='submit'>Submit</button>
                    
                </Col>
            </Row>
        </Form>
    </div>
  )
}

export default JoinMentor