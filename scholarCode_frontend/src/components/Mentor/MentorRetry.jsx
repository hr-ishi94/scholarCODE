import React, { useState, useCallback, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { Button, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { mentorRetryUpdate } from '../../Axios/MentorServer/MentorServer';
import { useLocation } from 'react-router-dom';

const MentorRetry = () => {
  const location = useLocation();
  const [mentorData, setMentorData] = useState({});
  const [formData, setFormData] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: '',
    username: "",
    designation: "",
    linkedin_profile: "",
    password: "",
    confirm_password: "",
    degree_certificate: null,
    is_active:true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submit, setSubmit] = useState(false);

  // Reset submit state on component mount
  useEffect(() => {
    setSubmit(false);
    if (location.state && location.state.mentorData) {
      setFormData({
        id: location.state.mentorData.id || '',
        email: location.state.mentorData.email || '',
        username: location.state.mentorData.username || "",
        password: location.state.mentorData.password || "",
        confirm_password: location.state.mentorData.password || "",
      });
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFormValid = Object.values(formData).every((value) => {
      if (typeof value === 'string') {
          return value.trim() !== "";
      }
     
      return true; // Skip non-string values in the validation
  });
    const { password, confirm_password } = formData;

    if (password !== confirm_password) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    if (isFormValid){
      
      try {
       const res =  await mentorRetryUpdate(formData); // Update mentor info
       console.log(res,'sss') 
       setSubmit(true);
        toast.success('Your form has been submitted successfully!');
      } catch (error) {
        toast.error('Failed to update the mentor information');
      } finally {
        setLoading(false);
      }
    }else{
      toast.error('Please provide all details')
    }
  };

  const style = {
    marginTop: '50px',
    marginLeft: '480px'
  };

  return (
    <>
      {submit ? (
        <div className='container ' style={style}>
          <h2 className='' style={{ marginLeft: '6em' }}>Retry Mentor Form</h2>
          <div className='mx-5 text-center'>
            <br />
            <Col sm={6}>
              <br />
              <br />
              <br />
              <h4 className='text-success'>Your Form has been submitted!</h4>
              <h6>Your profile will be verified by our Admin and you will receive an email regarding your confirmation.</h6>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </Col>
          </div>
        </div>
      ) : (
        <div className='container ' style={style}>
          <h2 className='' style={{ marginLeft: '6em' }}>Retry Mentor Form</h2>
          <div className='mx-5 text-center'>
            <br />
            <Form onSubmit={handleSubmit} className='text-center' encType="multipart/form-data">
              <Row>
                <Col sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Control name='first_name' placeholder="First name" value={formData.first_name} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control name='last_name' placeholder="Last name" value={formData.last_name} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control name='email' type="email" placeholder="Email" value={formData.email} disabled onChange={handleChange} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control name='username' placeholder="Username" value={formData.username} disabled onChange={handleChange} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control name='designation' placeholder="Designation" value={formData.designation} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control name='linkedin_profile' placeholder="LinkedIn Profile" value={formData.linkedin_profile} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control name='password' type="password" placeholder="Password" value={formData.password} disabled onChange={handleChange} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control name='confirm_password' type="password" placeholder="Confirm Password" disabled value={formData.confirm_password} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control name="degree_certificate" type="file" placeholder="Choose file" onChange={handleChange} />
                  </Form.Group>
                  <Button type='submit' disabled={loading} className='px-5 py-2 text-light' style={{ backgroundColor: '#12A98E' }} variant=''>Submit</Button>
                  {error && <p className="text-danger">{error}</p>}
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

export default MentorRetry;
