import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import mentor_img from '../../assets/Mentors.jpg'
import './Mentors.css'
import { Link } from 'react-router-dom'

const Mentors = () => {
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
                    <button className='mentor-join'><Link to={'/mentor/join/'}>Join our Team</Link></button>
                    <button className='mentor-login'><Link to={'/mentor/login/'}>Mentor Login</Link></button>
                </Col>
            </Row>
            <Row className='m-5'>
                <Col sm={4}>
                    <img className="mentor_img " src={mentor_img} alt="" />
                    <div className='mx-5'>
                        <h3 className='mx-5'>Arjun </h3>
                        <h4>Full stack Developer</h4>
                    </div>
                </Col>
                <Col sm={4}>
                    <img className="mentor_img " src={mentor_img} alt="" />
                    <div className='mx-5'>
                        <h3 className='mx-5'>Arjun </h3>
                        <h4>Full stack Developer</h4>
                    </div>
                </Col>
                <Col sm={4}>
                    <img className="mentor_img " src={mentor_img} alt="" />
                    <div className='mx-5'>
                        <h3 className='mx-5'>Arjun </h3>
                        <h4>Full stack Developer</h4>
                    </div>
                </Col>
                
            </Row>
            <Row className='m-5'>
                <Col sm={4}>
                    <img className="mentor_img " src={mentor_img} alt="" />
                    <div className='mx-5'>
                        <h3 className='mx-5'>Arjun </h3>
                        <h4>Full stack Developer</h4>
                    </div>
                </Col>
                <Col sm={4}>
                    <img className="mentor_img " src={mentor_img} alt="" />
                    <div className='mx-5'>
                        <h3 className='mx-5'>Arjun </h3>
                        <h4>Full stack Developer</h4>
                    </div>
                </Col>
                <Col sm={4}>
                    <img className="mentor_img " src={mentor_img} alt="" />
                    <div className='mx-5'>
                        <h3 className='mx-5'>Arjun </h3>
                        <h4>Full stack Developer</h4>
                    </div>
                </Col>
                
            </Row>
        </div>
    </>
  )
}

export default Mentors