import React, { useCallback, useState } from 'react'
import Form from 'react-bootstrap/Form';
import './LoginMentor.css'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { MentorLogin } from '../../Redux/Slices/MentorAuthSlice';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';

const LoginMentor = () => {
  
  const dispatch = useDispatch()
  const selector = useSelector((state)=>state.MentorToken)
  const MentorAuthenticated = selector.is_authenticated
  const navigate = useNavigate()
  
  const [authData, setauthData] = useState({
    email:'',
    password:''
  })

  const handleChange = (e)=>{
    const {name,value} = e.target
    setauthData((prevData)=>({
      ...prevData,
      [name]:value}))
  }

  const handleSubmit = useCallback( async (e)=>{
    e.preventDefault()
    const isFormValid = Object.values(authData).every((value)=>{
      if(typeof value ==='string') {
        return value.trim() !==''
      }
      return true
 
    })
    if (isFormValid){
      try{
        const res = await dispatch(MentorLogin(authData))

        if(res.payload.error === 'Authentication Failed'){
          toast.error('Invalid credentials')
        }else{
          navigate('/mentor/reviews/')
          toast.success('Successfully logged in')
          localStorage.setItem('access',res.payload.access)
          localStorage.setItem('refresh',res.payload.refresh)
        }
      }
  
      catch(error){
        console.log("autherror")
  
      }
      
    }else{
      toast.error("All fields required")
    }
    
  },[authData])

  return (
    <div>


      {(MentorAuthenticated )?<Navigate to={'/mentor/reviews/'}/>:
      <>
      
          <h1>Mentor Login</h1>
          <br />
          <br />
        <Form onSubmit={(e)=>handleSubmit(e)}>
                    
          <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Control type="email" placeholder="Email" size='lg' name='email' value={authData.email} onChange={handleChange}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Control type="password" placeholder="Password" size='lg' name='password' value={authData.password} onChange={handleChange}/>
          </Form.Group>
          <br />
          <Button className='mentor-login-button' type='submit'>Login</Button>
                    
        </Form>
        <br />  
        <a href="" style={{color:"#12A98E"}}>Forgot password?</a>  
      </>}
    </div>
  )
}

export default LoginMentor