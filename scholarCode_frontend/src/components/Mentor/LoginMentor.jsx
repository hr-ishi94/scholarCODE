import React from 'react'
import Form from 'react-bootstrap/Form';
import './LoginMentor.css'

const LoginMentor = () => {
  return (
    < >
        <h1>Mentor Login</h1>
        <br />
        <br />
      <Form className=''>
                  
        <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Control type="email" placeholder="Email" size='lg'/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Control type="password" placeholder="Password" size='lg'/>
        </Form.Group>
        <br />
        <button className='mentor-login-button' type='submit'>Login</button>
                  
      </Form>
      <br />  
      <a href="" style={{color:"#12A98E"}}>Forgot password?</a>  
    </>
  )
}

export default LoginMentor