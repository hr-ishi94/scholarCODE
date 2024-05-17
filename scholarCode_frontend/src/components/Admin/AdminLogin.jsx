import React, { useCallback, useState } from 'react'
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { loginSchema } from './utils/SigninVal';
import { LoginAdmin } from '../../Redux/Slices/AdminAuthSlice';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';
import { ValidationError } from 'yup';

const AdminLogin = () => {
  const selector = useSelector((state)=>state.AdminToken)
  const isAuthenticated = selector.is_authenticated
  const dispatch = useDispatch()
  const [errorr, setErrorr] = useState("")
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    email:'',
    password:''
  })

  const handleChange = (e)=>{
    const {name,value} = e.target
    setFormData({...formData,
    [name]:value
  })
  } 

  if (errorr){
    toast.error(errorr)
  }

  const handleSubmit = useCallback( async (e)=>{
    e.preventDefault();
    const isFormValid = Object.values(formData).every((value) => {
      if (typeof value === 'string') {
          return value.trim() !== "";
      }
     
      return true; // Skip non-string values in the validation
  });
    if(isFormValid){
      try {
        await loginSchema.validate(formData,{abortEarly:false})
        const res = await dispatch(LoginAdmin(formData))
        console.log("res",res)
        if (res.payload.error ==='Authentication Failed'){
          toast.error('Invalid Credentials')
        }else{
          navigate('/admin/users/')
          toast.success('Successfully logged in')

        }
        
      }
      catch(error){
        console.log('validation error')

      }

    }else{
      toast.error('All fields are required')
    }

  },[formData])

  return (
    <div>
      {isAuthenticated?<Navigate to={'/admin/users/'}/>:
    <>
      {}  
        <h1>Admin Login</h1>
        <br />
        <br />
        <Form onSubmit={(e)=>handleSubmit(e)}>
                            
            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Control type="email" name='email' placeholder="Email" size='lg' value={formData.email} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Control type="password" name='password' placeholder="Password" size='lg' value={formData.password} onChange={handleChange}/>
            </Form.Group>
            <br />
            <Button className='mentor-login-button' type='submit'>Login</Button>
                            
        </Form>
    </>
    }
    </div>
  )
}

export default AdminLogin