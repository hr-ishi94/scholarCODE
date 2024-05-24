import React, { useCallback, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import signupImage from '../../assets/signupImage.jpg'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './SignUp.css'
import { Link } from 'react-router-dom';
import { userSchema } from './utils/signUpValidate';
import { UserRegister } from '../../Axios/UserServer/UserServer';
import logo from '../../assets/logo.png'
import { toast } from 'react-toastify';
import { ValidationError } from 'yup';

const SignUp = () => {
    const [formData, setformData] = useState({
        username:"",
        email:"",
        password:"",
        confirm_password:"",
        is_active:false
    })
    const [loading, setLoading] = useState(false)
    const [signupError,setSignupError] = useState("")

    if (signupError){
        toast.error(signupError)
        setSignupError("")
    }

    const handleChange= (e)=>{
        const {name,value} = e.target
        setformData((prevData)=>({
            ...prevData,
            [name]:value
        }))
    }

    const handleSubmit =  async (e)=>{
            e.preventDefault();
            const isFormValid = Object.values(formData).every((value) => {
                if (typeof value === 'string') {
                    return value.trim() !== "";
                }
                return true; // Skip non-string values in the validation
            });
            
            if(isFormValid){
                try
                {
                    await userSchema.validate(formData,{abortEarly:false})
                    const registrationResponse = await UserRegister(
                        formData
                    )
                    // console.log("reg response: ",registerationResponse)
                    if (registrationResponse.id){

                        setLoading(true)
                    }
                    else{
                       if (registrationResponse.email){
                        toast.error(registrationResponse.email[0])
                       }

                       if (registrationResponse.username){
                        toast.error(registrationResponse.username[0])
                       }
                    }
                }catch(error){
                    if (error instanceof ValidationError){
                        toast.error(error.message)
                    }
                }
               
            }
            else{
                setSignupError("All fields required!")
            }
            
        }
        

  return (
    <>{!loading?
        <Row className='p-5 mx-5'>
            <Col className='mt-5'>
            <h1 style={{color:'#12A98E',fontWeight:"bold"}} className='text-center'>SIGNUP</h1>
            <p className='mx-5 mt-5' >Already have an account? <Link to={'/user/login/'}>Login</Link> </p>
            <div className='p-5'>

            <Form onSubmit={(e)=>handleSubmit(e)}>
                <Form.Group className="mb-3" controlId="formGroupusername">
                    <Form.Control type="username" placeholder="Enter username" name='username' value={formData.username} onChange={handleChange} size='lg' />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Control type="email" placeholder="Enter email" name='email' onChange={handleChange} value={formData.email} size='lg'/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Control type="password" placeholder="Password" name='password' onChange={handleChange} value={formData.password} size='lg'/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupConfirmPassword">
                    <Form.Control type="password" placeholder="Confirm Password" name='confirm_password' onChange={handleChange} value={formData.confirm_password} size='lg'/>
                </Form.Group>
                <Button className='signupButton' type='submit'>Signup</Button>
                <br />
                {/* <h3 className='text-center p-5 '>or</h3> */}
            </Form>
                {/* <button className='googleSignup'><i class="fa-brands fa-google"></i>  Signup with GOOGLE</button> */}
            </div>

            </Col>
            <Col>
            <img src={signupImage} alt="" className='rounded'/>
            </Col>
        </Row>:
        <div className='container text-center'>
            <br />
            <br />
            <br />
            <h1 style={{color:'#12A98E',fontWeight:"bold"}} className='text-center'>User Verification</h1>
            <br />
            <br />  
            <h5>The activation link has been sent to your email please confirm your registration.</h5>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        </div>
        }
    </>
  )
}

export default SignUp