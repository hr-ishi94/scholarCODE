
import React, { useCallback, useEffect ,useState} from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import { Button } from 'react-bootstrap'
import samplecourse from '../../assets/samplecourse.png'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCourseDetails } from '../../Redux/Slices/CourseDetailsSlice'
import Loader from '../Utils/Loader'
import Card from 'react-bootstrap/Card';
import { fetchTasksList } from '../../Redux/Slices/TasksListSlice'
import axios from "axios";
import { fetchEnrolledCourses } from '../../Redux/Slices/Userside/EnrolledCoursesSlice'
import logo from '../../assets/logo.png'
import { toast } from 'react-toastify'
import { EnrollCourse } from '../../Axios/UserServer/UserServer'
import { fetchMentorCourse } from '../../Redux/Slices/mentorSide/MentorCourseSlice'


const SingleCourse = () => {

  const dispatch = useDispatch()

  
  const enrolledCourseSelector = useSelector((state)=>state.EnrolledCourses)
  const {course,status,error} = useSelector((state)=>state.Course)
  const TaskSelector  = useSelector((state)=>state.Tasks)
  const userSelector = useSelector((state)=>state.User)
  const mentorCourseSelector = useSelector((state)=>state.MentorCourses)
  const MentorSelector = useSelector((state)=>state.Mentors)
  const user_id = userSelector.user.id
  useEffect(()=>{
    dispatch(fetchCourseDetails(params.id))
    dispatch(fetchTasksList(params.id))
    dispatch(fetchEnrolledCourses(user_id))
    

  },[dispatch])
  const MentorCourse=mentorCourseSelector && mentorCourseSelector.courses.find((n)=>n.course == course.id)
  const EnrolledCourse= enrolledCourseSelector && enrolledCourseSelector.enrolls.find((enroll)=>enroll.course === MentorCourse.id)
  const mentorData = MentorCourse && MentorSelector.mentors.find((mentor)=>mentor.id = MentorCourse.mentor)
  const currModule = EnrolledCourse?EnrolledCourse.curr_module:''


  const params = useParams()
  const tasks  = TaskSelector.tasks
  const moduleSet = new Set()
  
  
  tasks && tasks.map((task)=>
    moduleSet.add(task.module))
  
  const modules = [...moduleSet]

  modules.sort();

  const enrollCourse = async(id)=>{
    const formData = {
      user:userSelector.user.id,
      course:MentorCourse.id
    }
    const res = await EnrollCourse(id,formData)
    console.log('response',res) 
  }

  if (status === 'loading'){
    return <Loader/>
  }
  

  // RAZORPAY
    //Function to load razorpay script for the display of razorpay payment SDK.
    function loadRazorpayScript(src) {
      return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = () => {
              resolve(true);
          };
          script.onerror = () => {
              resolve(false);
          };
          document.body.appendChild(script);
      });
  }
  
  //function will get called when clicked on the pay button.
  async function displayRazorpayPaymentSdk() {
    const res = await loadRazorpayScript(
        "https://checkout.razorpay.com/v1/checkout.js"
    );
  
    if (!res) {
        alert("Razorpay SDK failed to load. please check are you online?");
        return;
    }
  
    // creating a new order and sending order ID to backend
    const result = await axios.post("http://127.0.0.1:8000/course/razorpay_order/", {
        "email" : userSelector.user.email,
        'course_id':course.id,
        'amount':course.price
    });
  
    if (!result) {
        alert("Server error. please check are you online?");
        return;
    }
  
    // Getting the order details back
     const {merchantId=null , amount=null,currency=null,orderId=null } = result.data;
  
    const options = {
        key: merchantId,
        amount: amount.toString(),
        currency: currency,
        name: "ScholarCODE",
        description: "Test Transaction",
        image:logo,
        order_id: orderId,
        prefill: {
         
          email: userSelector.user.email,
      },
        notes: {
            address: "None",
        },
        theme: {
            color: "#12A98E",
        },
        handler: async function (response) {
          const verificationResult = await axios.post("http://127.0.0.1:8000/course/razorpay_callback/", response);
          if (verificationResult.data.status === 'Payment Done') {
            enrollCourse(user_id)
            toast.success('Course Enrolled successfully!')
          } else {
            toast.error('Payment verification failed. Please try again.')
          }
        }
    };
  
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }





  return (
    <div className='container'>
        <br />
        <br />
        <br />
    <Row>
        <Col sm={4} className='text-center'>
            
        <Card style={{ width: '20rem',marginLeft:"10px" }}>
      <Card.Img variant="top" src={course.thumbnail?course.thumbnail:samplecourse} />
      <Card.Body>
        <Card.Title>{course.name}</Card.Title>
        <Card.Text>
         {course.description}
        </Card.Text>
      </Card.Body>
      
    </Card>
            
        </Col>
        <Col sm={8} >
          
            <h1 style={{color:"#12A98E"}}><strong>{course.name} </strong></h1>       
              <p >Explore the world of programming and enhance your skills with {course.name}. Enroll in this course to embark on a journey of self-learning and discovery.</p>
                <br />
                <div className='d-flex justify-content-between mx-5 px-5'style={{color:"#12A98E"}}>
                  <h6><strong><i className="fa-solid fa-book-open"></i> {modules.length} Modules</strong></h6>
                  <h6><strong><i className="fa-solid fa-video"></i> Weekly Reviews</strong></h6>
                  <h6><strong><i className="fa-solid fa-certificate"></i> Certification</strong></h6>
                  
                </div>
                <br />
                <br />
                <h5 >Course Description</h5>
                <h5>{course.description}</h5>

                {
                  !EnrolledCourse &&
                  <>
                  <br />
                  <h4 >Price: ₹{course.price}* only</h4>
                  <br />
                  <Button className='p-2 text-light' variant='' style={{backgroundColor:"#12A98E"}} onClick={displayRazorpayPaymentSdk}>Enroll now</Button>
                  </>
                }
                
            
        </Col>
        
    </Row>
    <br />
    <br />
    <Row>
    {/* {
                  !EnrolledCourse? */}
      <Col sm={4}>
      <h3 className='mx-3'><i className="fa-solid fa-certificate"></i> Certifications</h3>
      <br />
      <h3 className='mx-3'><i className="fa-solid fa-clock"></i> 24x7 support</h3>
      <br />
      <h3 className='mx-3'><i className="fa-solid fa-chalkboard-user"></i> Individual mentor <br />support</h3>
      <br />
      <h3 className='mx-3'><i className="fa-solid fa-video"></i> Weekly review <br />sessions</h3>
      <br />
      <br />
      </Col>
      {/* :<Col>
      <h3 className='mx-5'>Mentor Details</h3>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src=""/>
        <Card.Body>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
      
      </Col>} */}
      <Col sm={8}>
      <h2><strong>Syllabus</strong></h2>
      <br />
      {modules.map((module,index)=>(
        <div key={index}>
        {module ===currModule &&
        <>
        
        <h2>{module}</h2>
        {tasks.filter((task)=>task.module === module).map((task,index)=>(
          <ul>
            <li className=''>
              <h4 key={index}> {task.name}
              <input type="checkbox" style={{width:"25px",height:"25px",marginLeft:"5px",}}/>
              </h4>
              
            </li>  
          </ul>
              

          
        ))}
        </>
        }
        </div>
        
      ))}

      {modules.map((module,index)=>(
        <div key={index}>
        {module !==currModule &&
        <>
        
        <h2 className='text-secondary'>{module}</h2>
        {tasks.filter((task)=>task.module === module).map((task,index)=>(
          <div className='d-flex text-secondary'>
            <h4 key={index}><i className="fa-solid fa-lock "></i> task{index+1}</h4>
           
          </div>
          
        ))}
        </>
        }
        </div>
        
      ))}

      <Button disabled className='p-2 my-3 text-light' variant='' style={{backgroundColor:"#12A98E"}}>Click to download your certificate</Button> 

      </Col>
    </Row>



    </div>



  )
}

export default SingleCourse


