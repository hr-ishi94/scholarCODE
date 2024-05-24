import React, { useCallback, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import signupImage from '../../assets/signupImage.jpg'
import Form from 'react-bootstrap/Form';
import './SignUp.css'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UserLogin } from '../../Redux/Slices/UserAuthSlice';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';


const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [authData, setAuthData] = useState({
        email:"",
        password:""
    })

    const handleChange = (e)=>{
        const {name,value} = e.target
        setAuthData((prevData)=>({
            ...prevData,
            [name]:value
        }))
    }
    
    const handleSubmit =useCallback(async (e)=>{
        e.preventDefault()
        const isFormValid = Object.values(authData).every((value)=>{
            if(typeof value === 'string'){
                return value.trim() !== ''

            }
            return true
        })
        if (isFormValid){

            try{
                const res = await dispatch(UserLogin(authData))
                console.log(res,'ress')
                if (res.payload.error === 'Authentication Failed'){
                    toast.error("Invalid credentials")
                }else{
                    toast.success('Successfully logged in')
                    navigate('/')
                    localStorage.setItem('access',res.payload.access)
                    localStorage.setItem('refresh',res.payload.refresh)
                }
                

            }catch(error){
                console.log(error)
            }
        }else{
            toast.error("All fields are required!")
        }

    },[authData])
  return (
    <>
        <Row className='p-5 mx-5'>
            <Col className='mx-5'>
            <img src={signupImage} alt="" className='rounded'/>
            </Col>
            <Col className='mt-5'>
                <h1 style={{color:'#12A98E',fontWeight:"bold"}} className='text-center'>LOGIN</h1>
                <p className='mx-5 mt-5'>Already have an account? <Link to={'/user/signup/'}>Signup</Link> </p>
                <div className='p-5'>

                <Form onSubmit={(e)=>handleSubmit(e)}>
                    
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Control type="email" name='email' value={authData.email} onChange={handleChange} placeholder="Email" size='lg'/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Control type="password" name='password' value={authData.password} onChange={handleChange} placeholder="Password" size='lg'/>
                    </Form.Group>
                    <Button className='signupButton' variant='' type='submit'>Login</Button>
                    
                    <br />
                    {/* <h3 className='text-center p-5 '>or</h3> */}
                </Form>
                    {/* <button className='googleSignup'><i class="fa-brands fa-google"></i>  Login with GOOGLE</button> */}
                </div>

            </Col>
        </Row>
    </>
  )
}

export default Login