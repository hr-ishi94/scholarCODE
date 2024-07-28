import React, { useEffect } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import bannerimage from '../../assets/banner-image.jpg'
import './Home.css'
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { fetchUser } from '../../Redux/Slices/UserDetailsSlice';

const Home = () => {
    const UserToken = useSelector((state)=>state.UserToken)
    const UserSelector = useSelector((state)=>state.User)
    const access = UserToken?.access||null
    const user_id = access?jwtDecode(access).user_id:null
    const dispatch = useDispatch()
    
    
    console.log(UserSelector,'llo')
  return (
    <div className='banner'>
        
        <Row className='row-banner'>
            <Col sm = {6} className='col-text'>
            <h2>Grow your skills ,</h2>
            <h1>Build your <span style={{ color:"#12a98e" }}>Future</span></h1>
            <h6>We collaborate to ensure every student achieves academic,<br />
             social and emotional success by working <br /> together and providing comprehensive support.</h6>
            </Col>
            <Col sm = {6}>
                <img src={bannerimage} alt="" />
            </Col>
        </Row>
        <div className='banner2'>


            <Row className='banner2-content'>
                <Col className='p-5'>
                    <h3>Expert Instructor</h3>
                    <p>Expert Instructor <br /> knowledgeable,<br /> experienced and provides <br /> quality guidance</p>
                </Col>
                <Col className='p-5'>
                    <h3>Expert Instructor</h3>
                    <p>Expert Instructor <br /> knowledgeable,<br /> experienced and provides <br /> quality guidance</p>
                </Col>
                <Col className='p-5'>
                    <h3>Expert Instructor</h3>
                    <p>Expert Instructor <br /> knowledgeable,<br /> experienced and provides <br /> quality guidance</p>
                </Col>
                <Col className='p-5'>
                    <h3>Expert Instructor</h3>
                    <p>Expert Instructor <br /> knowledgeable,<br /> experienced and provides <br /> quality guidance</p>
                </Col>
            </Row>
        </div>
        <div className="banner3 text-center">
                <h1 style={{ color:"#12a98e" }}className='m-5'>What our students have to say</h1>
                
                
        </div>
    </div>
  )
}

export default Home