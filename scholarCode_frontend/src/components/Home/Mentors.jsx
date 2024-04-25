import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import mentor_img from '../../assets/mentors.jpg'
import './Mentors.css'
import { Link } from 'react-router-dom'

import axios from 'axios'

const baseUrl = 'http://127.0.0.1:8000/'

const Mentors = () => {
    const [mentors, setMentors] = useState([])
    useEffect(() => {
      async function fetchMentors(){
        const response = await axios.get(`${baseUrl}/main/mentors/active`)
        setMentors(response.data)
        console.log(response.data)
        console.log(mentors);
      }
      fetchMentors()
    }, [])
    
  return (
    <>
        <div className="container">
            <h1 className='text-center fw-bold' >MENTORS</h1>
            <br />
            <br />
            <Row>
                <Col sm ={8}>
                
                    <h2>Our Top Mentors</h2>
                </Col>
                <Col sm ={4}>
                    <button className='mentor-join'><Link to={'/mentor/join/'} className="react-router-link text-light">Join our Team</Link></button>
                    <button className='mentor-login'><Link to={'/mentor/login/'} className="react-router-link text-light">Mentor Login</Link></button>
                </Col>
            </Row>

            <Row className='m-5 text-center'>
                {mentors.map((mentor)=>(

                <Col sm={4}>
                    <img className="mentor_img " src={mentor.profile_img?mentor.profile_img:mentor_img} alt="" />
                    <h3 className='mx-5'>{mentor.first_name} {mentor.last_name}</h3>
                    <h4>{mentor.designation}</h4>
                    
                </Col>
                ))}
            </Row>
            
        </div>
    </>
  )
}

export default Mentors