import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { mentorRetryLogin } from '../../Axios/MentorServer/MentorServer';// Adjust import as necessary

const MentorRetryLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authData, setAuthData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthData({ ...authData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = authData;
    
    if (!email.trim() || !password.trim()) {
      toast.error("All fields are required");
      return;
    }
    
    try {
      const res = await mentorRetryLogin(authData); // Dispatch login action
      console.log(res,'loi')
      navigate('/mentor/request/form/',{state:{mentorData:res}}); // Redirect to retry form
    } catch (error) {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
      <h3>Mentor Request Login</h3>
      <br />
        <Form.Group className="mb-3 ">
          <Form.Control className='py-2' type="email" placeholder="Email" name="email" value={authData.email} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control type="password" className='py-2' placeholder="Password" name="password" value={authData.password} onChange={handleChange} />
        </Form.Group>
        <br />
        <Button type="submit" className='px-5 py-2 text-light' variant='' style={{backgroundColor:'#12A98E'}}>Login</Button>
      </Form>
    </div>
  );
};

export default MentorRetryLogin;
