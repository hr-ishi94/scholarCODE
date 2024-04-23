import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import signupImage from '../../assets/signupImage.jpg'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './SignUp.css'
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <>
        <Row className='p-5 mx-5'>
            <Col className='mt-5'>
            <h1 style={{color:'#12A98E',fontWeight:"bold"}} className='text-center'>SIGNUP</h1>
            <p className='mx-5 mt-5'>Already have an account? <Link to={'/user/login/'}>Login</Link> </p>
            <div className='p-5'>

            <Form>
                <Form.Group className="mb-3" controlId="formGroupusername">
                    <Form.Control type="username" placeholder="Enter username" size='lg' />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Control type="email" placeholder="Enter email"  size='lg'/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Control type="password" placeholder="Password"  size='lg'/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupConfirmPassword">
                    <Form.Control type="confirmpassword" placeholder="Confirm Password" size='lg'/>
                </Form.Group>
                <button className='signupButton' type='submit'>Signup</button>
                <br />
                <h3 className='text-center p-5 '>or</h3>
            </Form>
                <button className='googleSignup'><i class="fa-brands fa-google"></i>  Signup with GOOGLE</button>
            </div>

            </Col>
            <Col>
            <img src={signupImage} alt="" className='rounded'/>
            </Col>
        </Row>
    </>
  )
}

export default SignUp