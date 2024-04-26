import React from 'react'
import Form from 'react-bootstrap/Form';

const AdminLogin = () => {
  return (
    <>
        <h1>Admin Login</h1>
        <br />
        <br />
        <Form>
                            
            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Control type="email" placeholder="Email" size='lg'/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Control type="password" placeholder="Password" size='lg'/>
            </Form.Group>
            <br />
            <button className='mentor-login-button' type='submit'>Login</button>
                            
        </Form>
    </>
  )
}

export default AdminLogin