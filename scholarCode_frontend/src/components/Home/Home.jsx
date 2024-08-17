import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import bannerimage from '../../assets/banner-image.jpg'
import './Home.css'
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import galileo from '../../assets/galileo.jpg'
import { fetchUser } from '../../Redux/Slices/UserDetailsSlice';
import { userFeedbacks } from '../../Axios/UserServer/UserServer';
import FeedbackCard from '../Mentor/utils/FeedbackCard';

const Home = () => {
    const UserToken = useSelector((state)=>state.UserToken)
    const access = UserToken?.access||null
    const user_id = access?jwtDecode(access).user_id:null
    const dispatch = useDispatch()
    const [feedbacks, setFeedbacks] = useState([])
    useEffect(()=>{
        const fetchFeedbacks = async ()=>{
            try{        
                const res = await userFeedbacks()
                setFeedbacks(res)
            }catch(error){
                console.log('Failed to fetch feedbacks',error)
            }
        }
    fetchFeedbacks()
        },[]) 
    
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
                <Col className='pt-5'>
                <h3 ><i className="fa-solid fa-clock"></i> 24x7 support</h3>
      
                    <p>Expert Instructor <br /> knowledgeable,<br /> experienced and provides <br /> quality guidance</p>
                </Col>
                <Col className='p-5'>
                <h3 className=''><i className="fa-solid fa-certificate"></i> Certifications</h3>
                    <p>Expert Instructor <br /> knowledgeable,<br /> experienced and provides <br /> quality guidance</p>
                </Col>
                <Col className='p-5'>
                <h3 className=''><i className="fa-solid fa-chalkboard-user"></i> Individual mentor support</h3>
                <p>Expert Instructor <br /> knowledgeable,<br /> experienced and provides <br /> quality guidance</p>
                </Col>
                <Col className='p-5'>
                <h3 className=''><i className="fa-solid fa-video"></i> Weekly review sessions</h3>
                <p>Expert Instructor <br /> knowledgeable,<br /> experienced and provides <br /> quality guidance</p>
                </Col>
            </Row>
        </div>
        <div className="mt-5 text-center d-flex px-5">
            <img src={galileo} alt="" className='rounded-circle' />
              <h2 className='py-5 px-4'>“You cannot teach a man anything, you can only help him find it within himself.”
             <br /> ― Galileo</h2>
                
                
        </div>
        <div className="banner3 text-center">
                <h1 style={{ color:"#12a98e" }}className='m-5'>What our students have to say</h1>

                <FeedbackCard feedbacks = {feedbacks}/>
                
                
        </div>
        
    </div>
  )
}

export default Home