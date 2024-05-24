import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import mentor_img from '../../assets/mentors.jpg'
import './Mentors.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMentors } from '../../Redux/Slices/MentorsSlice'

const Mentors = () => {
    const [mentorsList, setMentorsList] = useState([])
    const dispatch = useDispatch()
    const {mentors,status, error} = useSelector((state)=>state.Mentors)
    
    useEffect(() => {
    dispatch(fetchMentors)
    if(mentors?.length!==0){

      setMentorsList(mentors)
    }
    }, [dispatch])
    
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
                {mentorsList.filter((mentor)=>mentor.is_staff==true && mentor.is_active == true ).map((mentor)=>(

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