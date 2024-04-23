import React from 'react'
import logo from '../../assets/logo.png'
import Form from 'react-bootstrap/Form';
import './LoginMentor.css'

const LoginMentor = () => {
  return (
    <div className='container text-center'>
        <div className='inner-container-mentor p-5'>
             <img src={logo} alt="" className='logo' /> 
             <br />
             <br />
             <h1>Mentor Login</h1>
             <br />
             <br />
            <Form>
                        
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Control type="email" placeholder="Email" size='lg'/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Control type="password" placeholder="Password" size='lg'/>
                        </Form.Group>
                        
                        <button className='mentor-login-button' type='submit'>Login</button>
                        
            </Form>
            <br />  
            <a href="" style={{color:"#12A98E"}}>Forgot password?</a>  
        </div>
    </div>
  )
}

export default LoginMentor