
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
import { fetchEnrolledCourses, newEnroll } from '../../Redux/Slices/Userside/EnrolledCoursesSlice'
import logo from '../../assets/logo.png'
import { toast } from 'react-toastify'
import { EnrollCourse } from '../../Axios/UserServer/UserServer'
import { fetchMentors } from '../../Redux/Slices/MentorsSlice'
import avatar from '../../assets/avatar.jpg'
import { fetchMentorCourse } from '../../Redux/Slices/mentorSide/MentorCourseSlice'


const SingleCourse = () => {

  const dispatch = useDispatch()
  const params = useParams()

  
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
    dispatch(fetchEnrolledCourses())
    dispatch(fetchMentors())
    dispatch(fetchMentorCourse())
    

  },[dispatch,params.id,user_id])
 
  const MentorCourse=mentorCourseSelector && mentorCourseSelector.courses.filter((n)=>n.course == course.id)
  const mentorCourseSet = new Set()
  MentorCourse.map((course)=>{
    mentorCourseSet.add(course.id)
  })

  // array with all mentorCOurses id
  const mentorCourseId = [...mentorCourseSet]
  
  // current course if enrolled
  const [EnrolledCourse] = enrolledCourseSelector && enrolledCourseSelector.enrolls.filter((enroll)=> mentorCourseId.includes(enroll.course) && enroll.user === user_id)
  console.log(EnrolledCourse,'sei')
  const currMentorCourse = EnrolledCourse && mentorCourseSelector && mentorCourseSelector.courses.find((course)=>course.id == EnrolledCourse.course)
  const mentorData = currMentorCourse && MentorSelector.mentors.find((mentor) => mentor.id ==currMentorCourse.mentor)
  const currModule = EnrolledCourse?EnrolledCourse.curr_module:''

// function to choose random mentor
console.log(MentorCourse)
  function getRandomMentorCourse() {
    const randomIndex = Math.floor(Math.random() * MentorCourse.length);
    return MentorCourse[randomIndex];
  }

  
  
  const tasks  = TaskSelector.tasks
  const moduleSet = new Set()
  
  
  tasks && tasks.map((task)=>
    moduleSet.add(task.module))
  
  const modules = [...moduleSet]
  
  modules.sort();
  
  const enrollCourse = async(id)=>{
    const chosenMentorCourse = getRandomMentorCourse();
    console.log(chosenMentorCourse,'res')

    const formData = {
      user:userSelector.user.id,
      course:chosenMentorCourse.id
    }
    try{
      const res = await EnrollCourse(id,formData)
      console.log('responsei',res) 
      dispatch(newEnroll(res))
      
    }catch(error){
      toast.error("Payment Failed")
    }
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
    {
                  !EnrolledCourse?
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
      :<Col>
      <h3 className='mx-5'>Mentor Details</h3>
      <Card style={{ width: '14rem' }} className='text-center mx-4 p-3'>
        <Card.Img variant="top"
        className='mx-1'
        style={{ width: '180px', height: '180px', objectFit: 'cover', borderRadius: '40%' }}
        src={mentorData.profile_img?mentorData.profile_img:avatar}/>
        <Card.Title>{mentorData.first_name } {mentorData.last_name}</Card.Title>
        <Card.Body>
          <Card.Text>{mentorData.designation}
          </Card.Text>
        </Card.Body>
      </Card>
      
      </Col>} 
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

      {
      modules.map((module,index)=>(
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


