import React, { useCallback, useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import avatar from '../../assets/avatar.jpg'
import Form from 'react-bootstrap/Form';
import './JoinMentor.css'
import { mentorSchema } from './utils/RegValidate';
import { Button } from 'react-bootstrap';
import { MentorRegister } from '../../Axios/MentorServer/MentorServer';
import { toast } from 'react-toastify';
import { ValidationError } from 'yup';
import HomeLoader from '../Utils/HomeLoader';

const JoinMentor = () => {
    const [formData, setFormData] = useState({
        first_name :"",
        last_name :"",
        email :"",
        username :"",
        designation:"",
        linkedin_profile:"",
        // profile_img:"",
        password:"",
        confirm_password:"",
        is_staff:false,
        is_active:true
        
    })

    const [signupError,setSignupError] = useState('')
    const [loading, setLoading] = useState(false)
    const [submit, setSubmit] = useState(false)

    if(signupError){
        toast.error(signupError)
        setSignupError("")
    }

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
          
        }));
      }, []);

    const handleSubmit = useCallback(
        async (e)=>{
        e.preventDefault();
        
        const isFormValid = Object.values(formData).every((value) => {
            if (typeof value === 'string') {
                return value.trim() !== "";
            }
            return true; // Skip non-string values in the validation
        });
        
        if(isFormValid){
            try{
                setLoading(true)   
                await mentorSchema.validate(formData,{ abortEarly: false })
                const registrationResponse = await MentorRegister(
                    formData
                )
                // if(registrationResponse.id){
                    //     }
                    
                    if (registrationResponse.data.email){
                        setSignupError(`Email error:${registrationResponse.data.email[0]}`)
                        return
                    }
                    if (registrationResponse.data.username){
                        setSignupError(`Username error:${registrationResponse.data.username[0]}`)
                        return
                    }
                    setSubmit(true)
                console.log(registrationResponse,'api response')
            }   
            catch(error){
                if (error instanceof ValidationError){
                    setSignupError(error.message)
                }
                throw error
            }
            finally{
                setLoading(false)
            }
        }else{
            setSignupError("Fill all fields")
            
        }
    },[formData])
    console.log(submit,'ll')
    if (loading === true){
        return <HomeLoader/>
    }

  return (
    <div className='container text-center p-5'>
        <br />
        <h1>Join Mentor Team</h1>
        <Form onSubmit={(e)=> handleSubmit(e) }>
            <Row>   
                <Col sm = {3}>
                    {/* <img src={avatar} className='avatar-mentor' alt="" />
                    <input type="file" id="myFile" value={formData.profile_img} onChange={handleChange} name="profile_img"></input> */}
                </Col>

                {(!submit)?
                    <Col sm={6}>
                    <br />
                    <Form.Group className="mb-3" controlId="formGroupfirst_name">
                        <Form.Control name='first_name' type="first_name" placeholder="Enter First name" size='lg'  value={formData.first_name} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGrouplast_name">
                        <Form.Control name='last_name' type="last_name" placeholder="Enter Last name" size='lg'  value={formData.last_name} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Control name='email' type="email" placeholder="Enter Email"  size='lg' value={formData.email} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupUsername">
                        <Form.Control name='username' type="username" placeholder="Enter Username"  size='lg' value={formData.username} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupdesignation">
                        <Form.Control name='designation' type="designation" placeholder="Your Designation"  size='lg' value={formData.designation} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGrouplinkedin">
                        <Form.Control name='linkedin_profile' type="linkedin" placeholder="Linkedin ID"  size='lg' value={formData.linkedin_profile} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Control name='password' type="password" placeholder="Password"  size='lg' value={formData.password} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupConfirmPassword">
                        <Form.Control name='confirm_password' type="password" placeholder="  Confirm Password" size='lg' value={formData.confirm_password} onChange={handleChange}/>
                    </Form.Group>
                    <Button className='signupButton' disabled={loading} type='submit'>Submit</Button>
                    
                    
                    
                </Col>
                :
                <Col sm={6}>
                    <br />
                    <br />
                    <br />
                <h4 className='text-success'>Your Form have been submitted !</h4>
                <h6>Your profile will be verified by the our Admin and you will recieve an email regarding your confirmation.</h6>                     <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </Col>}
            </Row>
        </Form>
    </div>
  )
}

export default JoinMentor