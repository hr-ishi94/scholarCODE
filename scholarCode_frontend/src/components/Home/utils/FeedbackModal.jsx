import React, { useState, useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { userFeedbackPost } from '../../../Axios/UserServer/UserServer';
import { toast } from 'react-toastify';

const FeedbackModal = ({ course, user , handleFeedback}) => {
  const [rating, setRating] = useState(0);
  const [formData, setFormData] = useState({
    course:course,
    user:user,
    feedback_text: '',
    rating: 0,
  });

  
  useEffect(() => {
      setFormData((prevData) => ({
          ...prevData,
          rating,
        }));
    }, [rating]);
    
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            const res = await userFeedbackPost(formData)
            console.log(res,'kkk')
            handleFeedback()
            toast.success('feedback added successfully')
        }
        catch(error){
            console.log('error while posting feedback',error)
            toast.error('Failed to update your feedback, try after some time!')
        }
    }
    console.log('formdata',formData)
  return (
    <Row>
      <Col sm={9}>
        <div className='p-3 rounded' style={{ backgroundColor: '#BCFFDB' }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <h6>Feedback</h6>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.feedback_text}
                name='feedback_text'
                onChange={handleChange}
              />
            </Form.Group>
            {[1, 2, 3, 4, 5].map((star) => {
              return (
                <span
                  key={star}
                  className='start'
                  style={{
                    cursor: 'pointer',
                    color: rating >= star ? 'gold' : 'gray',
                    fontSize: '35px',
                  }}
                  onClick={() => {
                    setRating(star);
                  }}
                >
                  ★
                </span>
              );
            })}
            <br />
            <Button className='p-1 text-light' style={{backgroundColor:"#12A98E"}} variant='' type='submit'>Submit</Button>
          </Form>
        </div>
      </Col>

      <Col sm={3}></Col>
    </Row>
  );
};

export default FeedbackModal;
