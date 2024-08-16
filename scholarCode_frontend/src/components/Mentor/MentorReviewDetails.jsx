import React, { useEffect, useState } from 'react'
import  Row  from 'react-bootstrap/Row'
import  Col from 'react-bootstrap/Col'
import  Button  from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import  Table  from 'react-bootstrap/Table'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchReviewMarks } from '../../Redux/Slices/mentorSide/ReviewMarkSlice';
import { issueCertificate, MentorPatchReviewTimings, MentorPostReviewTimings, MentorWalletPatch, ReviewMarkPost } from '../../Axios/MentorServer/MentorServer';
import { EnrollCourse, EnrollPatch, EnrollPut, EnrolledAllCourses } from '../../Axios/UserServer/UserServer';
import { toast } from 'react-toastify';
import { enrollPatch, fetchAllEnrolledCourses } from '../../Redux/Slices/Userside/AllEnrolledCoursesSlice';
import { course, Vurl } from '../../Axios/Urls/EndPoints';
import { fetchCoursesList } from '../../Redux/Slices/CoursesListSlice';
import Loader from '../Utils/Loader';
import ReviewExtendModal from './ReviewExtendModal';
import jsPDF from 'jspdf';
import logo from '../../assets/logo.png'
import signature from '../../assets/signature.png'
import Badge from 'react-bootstrap/Badge';
import { jwtDecode } from 'jwt-decode';
import { fetchMentortimings, patchTime } from '../../Redux/Slices/MentorTimingSlice';
import { fetchMentorWallet, patchWallet } from '../../Redux/Slices/mentorSide/MentorWalletSlice';

const MentorReviewDetails = () => {
  
  const params = useParams()
  const dispatch = useDispatch()
  const UserSelector = useSelector((state)=>state.userList)
  const MentorCourseSelector = useSelector((state)=>state.MentorCourses)
  const EnrolledCourseSelector = useSelector((state)=>state.AllEnrolls)
  const CourseSelector = useSelector((state)=>state.Courses)
  const ReviewMarkSelector = useSelector((state)=>state.ReviewMarks)
  const ReviewTimings = useSelector((state)=>state.MentorTimings)
  const token = useSelector((state) => state.MentorToken);
  const access = jwtDecode(token.access);
  const mentorId = access.user_id;
  

  
  function getFormattedDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  // Function to get formatted time
  function getFormattedTime() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }
  const [currentDate, setCurrentDate] = useState(getFormattedDate());
  const [currentTime, setCurrentTime] = useState(getFormattedTime());

  useEffect(()=>{
    dispatch(fetchAllEnrolledCourses())  
    dispatch(fetchReviewMarks())
    dispatch(fetchCoursesList())
    dispatch(fetchMentortimings(mentorId));

    

    const dateInterval = setInterval(() => {
      setCurrentDate(getFormattedDate());
    }, 24 * 60 * 60 * 1000); // Update the date every 24 hours

    const timeInterval = setInterval(() => {
      setCurrentTime(getFormattedTime());
    }, 1000); // Update the time every second

    // Cleanup intervals on component unmount
    return () => {
      clearInterval(dateInterval);
      clearInterval(timeInterval);
    };
    
  },[dispatch])
  // console.log(ReviewTimings.timings,'looi')
  const [CurrCourse] = EnrolledCourseSelector.enrolls.filter((course)=>course.id == params.id)
  const mentorCourse = MentorCourseSelector.courses?.find(
    (course) => course.id === CurrCourse?.course?.id
  );
  
  const ReviewMarksList = Array.isArray(ReviewMarkSelector.marks)
  ? ReviewMarkSelector.marks.filter((n) => n.course === CurrCourse.id && n.user === CurrCourse.user.id)
  : [];

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
    handleReviewButton()  
  };
  const [extendModalShow,setExtendModalShow] = useState(false)
  
  const handleExtendShow = () => setExtendModalShow(true)
  const handleExtendClose = () => setExtendModalShow(false) 
  

  const [button,setButton] = useState(true)
  const handleReviewButton = () => setButton(!button)
  
  const [review, setReview] = useState(false);
  
  const handleConfirmClose = () => setReview(false);

  const handleConfirmShow = () => {
    handleReviewButton()  
    setReview(true)
    };

    const [currTime, setCurrTime] = useState(CurrCourse?.review_time || null);

    const isDisabled = !((currentTime >= CurrCourse.review_time ) && (currentDate === CurrCourse.next_review_date))
    const [timeSlot,setTimeSlot] = useState(false)

    const ReviewTimingSlots = ReviewTimings.timings
    ?.filter((timing) => {
      if(CurrCourse.next_review_date === currentDate){
        return timing.date == currentDate && timing.time >= currentTime && !timing.booked
      }
      else{
        return CurrCourse.next_review_date === timing.date && !timing.booked
      }
    }
    )
    // console.log(ReviewTimingSlots,'loi')    
    
    const TimeChange = async (e, time,id) => {
      setCurrTime(time);
      try{
        const formData = {
          id:CurrCourse.id,
          review_time:time,
          mentor:CurrCourse.course.mentor,
          next_review_date:CurrCourse.next_review_date
        }
        const ne = await EnrollPatch(CurrCourse.user.id,formData)
        if (ne.status == 'success'){
          const timeForm = {
            id,
            booked:true
          }
          const res = await MentorPatchReviewTimings(mentorId,timeForm)
          // console.log(res,'loi')
          dispatch(patchTime(res))
          const payload = { enroll_id: CurrCourse.id, formData: {
            ...CurrCourse,
            review_time:ne.data.review_time
          } };

          
          // console.log(ne.data,CurrCourse.id,payload ,'kiii')
          dispatch(enrollPatch(payload));
          setTimeSlot(false)
          toast.success('Review Time has been scheduled')
        }else{
          if (ne.data.message){
            toast.error(ne.data.message)
          }
        }
      }catch(error){

      }
    };

    const [user] = UserSelector.users.filter((user)=>user.id === CurrCourse.user.id)
    const [courseDetails ]= CourseSelector.courses.filter((crs)=>crs.id == CurrCourse.course.course)
    // console.log(course,'loi')

    if(EnrolledCourseSelector.status === 'loading'){
      return <Loader/>
    }

    const handleIssueCertificate = async () => {
      if(!user.first_name || !user.last_name){
        toast.error('Please ask the candidate to update the profile!')
        return
      }
      // Create a new instance of jsPDF with custom dimensions
      const customWidth = 210; // mm
      const customHeight = 297; // mm
      const doc = new jsPDF({
        unit: 'mm',
        format: [customWidth, customHeight]
      });
    
      const logoImg = new Image();
      logoImg.src = logo; // Ensure logo is correctly defined
    
      const signatureImg = new Image();
      signatureImg.src = signature; // Ensure signature is correctly defined
    
      logoImg.onload = async () => {
        // Add the logo image to the PDF
        doc.addImage(logoImg, 'PNG', 85, 15, 40, 20); // Position and size of the logo image
    
        // Set font size and style
        doc.setFontSize(25);
        doc.setFont('times', 'bold');
    
        // Add title
        doc.text('Certificate of Achievement', 105, 50, { align: 'center' });
    
        // Add border around the entire page
        const borderWidth = 2; // Border width in mm
        doc.setLineWidth(borderWidth);
        doc.rect(borderWidth / 2, borderWidth / 2, customWidth - borderWidth, customHeight - borderWidth);
    
        // Set font size and style for the body
        doc.setFontSize(16);
        doc.setFont('times', 'normal');
    
        // Add certificate text
        doc.text('This is to certify that', 105, 70, { align: 'center' });
        
        doc.setFontSize(22);
        doc.setFont('times', 'bold');
        doc.text(`${user.first_name} ${user.last_name}`, 105, 90, { align: 'center' });
        
        doc.setFontSize(16);
        doc.setFont('times', 'normal');
        doc.text('has successfully completed', 105, 110, { align: 'center' });
        
        doc.setFontSize(25);
        doc.setFont('times', 'bold');
        doc.text(courseDetails.name, 105, 130, { align: 'center' });
        
        doc.setFontSize(16);
        doc.setFont('times', 'normal');
        
        doc.text(`Enroll ID: ${CurrCourse.enroll_id}`, 105, 140, { align: 'center' });
        
        
        // Add date
        const currentDate = new Date().toLocaleDateString(); // Adjust the date format as needed
        doc.text(`Date: ${currentDate}`, 105, 170, { align: 'center' });
    
        // Load the signature image and add it to the PDF
        signatureImg.onload = async () => {
          // Add the signature image
          doc.addImage(signatureImg, 'PNG', 75, 180, 60, 30); // Position and size of the signature image
          
          // Add the signature text
          doc.text('Signature', 105, 215, { align: 'center' });
    
          // Convert the PDF to a blob
          const pdfBlob = doc.output('blob');
    
          // Create form data to send the PDF to the backend
          const formData = new FormData();
          formData.append('enroll_id', CurrCourse.id);
          formData.append('certificate', pdfBlob, 'certificate.pdf');
          // console.log(formData,'koio')
          try {
            // Upload the PDF to the backend
            const response = await issueCertificate(formData)
            // const response = await axios.patch(`${course}upload/`, formData);
            
            // Handle the response from the backend
            if(response.status === 'success'){
            console.log('PDF uploaded successfully:', response.data);
            toast.success('Certificate issued and uploaded successfully!');
            const payload = { enroll_id: CurrCourse.id, formData: {
              ...CurrCourse,
              certificate:response.data.certificate
            } };
            dispatch(enrollPatch(payload))
            }else{
              toast.error("error occured while issuing certificate!")
            }

          } catch (error) {
            console.error('Error uploading PDF:', error);
            toast.error('Failed to issue certificate. Please try again.');
          }
        };
    
        signatureImg.onerror = () => {
          toast.error('Failed to load the signature image.');
        };
      };
    
      logoImg.onerror = () => {
        toast.error('Failed to load the logo image.');
      };
    };
    
  

  const style = {
    position: "absolute",
    left: "350px",
    right: "100px",
    top: "100px"
    }
  return (
    <div style={style}>
      <h1>Review Details</h1>
      <Row>
        <Col sm={5}>
        
      <br />
     
      <>
      <h5>Student Name:  <strong>  {user.first_name?user.first_name + " " +user.last_name:<span className='text-danger' style={{fontSize:'15px',fontWeight:'lighter'}}>Please ask the candidate to update the profile </span>}</strong></h5>
      <Link to={`/mentor/user/${user.id}/`}><Button className='pb-2 text-primary' variant=''>View User Details</Button></Link>
      </>
      <h6>Course Enroll ID:  <strong>  {CurrCourse.enroll_id}</strong></h6>
      <br />
      <h5>Course Name:  <strong>  {courseDetails.name}</strong></h5>
      <Link to={`/mentor/course/${courseDetails.id}/`} className='react-router-link'>View Course Details</Link>
      
      <br />
      {!CurrCourse.is_completed ?
    <>
      <h5>Current module:  <strong> module {CurrCourse.current_module}</strong></h5>

      <br />
      <h5>Upcoming Review Date:  
      <input type="date" value={CurrCourse.next_review_date} disabled/></h5>
      
      {currTime && !timeSlot ?<Button className='text-primary ' variant='' onClick={()=>setTimeSlot(true)}>Change Time</Button>:(
  <>
    <p className='text-secondary'>Available time slots:</p>
    {ReviewTimingSlots?.length > 0 ? (
      ReviewTimingSlots
        .filter((timing) => (timing.date === CurrCourse.next_review_date ) && !timing.booked)
        .map((timing) => (
          <Button key={timing.id} variant='' onClick={(e) => TimeChange(e, timing.time,timing.id)}>
            <Badge bg="" style={{ backgroundColor: '#12A98E' }} className="p-1 mx-1">
              {timing.time}
            </Badge>
          </Button>
        ))
    ) : (
      <Badge bg="secondary" style={{ backgroundColor: '#12A98E' }} className="p-1 mx-1">
        No Time slots available
      </Badge>
    )}
  </>
)}

      


      <br />
      <br />
      {CurrCourse.review_time &&
      <h5>Time scheduled:  <strong>  <input type='time'  name='review_time'  disabled value={CurrCourse.review_time}></input></strong>
      </h5>
      }
      {/* <Button className='mx-1 p-1 text-light' variant='' onClick={handleTimeSubmit} style={{backgroundColor:"#12A98E"}} > <i className="fa-solid fa-check "></i></Button> */}
      
        {
          (!currTime && CurrCourse.next_review_date === currentDate ) &&

        <p className='text-danger'><i className="fa-solid fa-circle-exclamation"></i> Please Schedule the time for today's review</p>
        }
      <br />
      <Row className='mx-5'>
      
       <Col sm={4}>
       
      {
        button &&
        <>
        <Button className='py-2 px-1 text-light' style={{backgroundColor:"#12A98E"}} variant='' onClick={handleConfirmShow} disabled={isDisabled}>Conduct Review</Button>
        {/* {!isDisabled && <p className='text-danger'><i className="fa-solid fa-circle-exclamation"></i> Please Conduct the review now!</p>} */}
        </>
        
      }
      <ReviewConfirmModal handleConfirmClose={handleConfirmClose} review={review} userid = {CurrCourse.user.id} mentorid = {mentorCourse.mentor} courseid = {params.id}/>
      {
        ! button && 
        <Button className='p-2 text-light' style={{backgroundColor:'#12A98E'}} variant='' onClick={handleShow}>Submit Review</Button>
      }
   
      </Col>
      <Col sm={4}>
        <Button className='p-2' onClick={handleExtendShow}>Extend Review</Button>
        <ReviewExtendModal show={extendModalShow} handleClose= {handleExtendClose} course= {CurrCourse} currentDate={currentDate}/>
      </Col>
      <Col>
        
      <ReviewMarkModal mentor_id ={mentorId} handleClose={handleClose} show={show} CurrCourse = {CurrCourse} module={CurrCourse.curr_module} user={CurrCourse.user} course={CurrCourse.id} review_date= {CurrCourse.next_review_date} />
      </Col>
      </Row>

  </>
  :
      <>
      <Col sm={6}>
        <br/>
        <p style={{color:"#12A98E"}}>Course Completed <i className="fa-solid fa-circle-check"></i></p>
        
        {!CurrCourse.certificate ?
        <>
        <Button className='p-2 text-light ' style={{backgroundColor:'#12A98E'}} onClick={handleIssueCertificate} variant='' >Issue Certificate</Button>
        <p className='text-danger'><i className="fa-solid fa-circle-exclamation"></i> Please issue the certificate</p>
        
        </>:
      <p style={{color:"#12A98E"}}>Certificate issued <i className="fa-solid fa-circle-check"></i></p> }
      </Col>
      </>
      }
      </Col>



      <Col sm={7}>
      <Row className='m-1'>
        <Col sm={10}>
          <h5><strong> Review Marks</strong></h5>        
        </Col>

        <Col sm={2}>
       </Col>
      </Row>
      <Table striped bordered hover className='text-center'>
        <thead>
          <tr>
            <th>No.</th>
            <th>Module </th>
            <th>Marks</th>
            <th>Pending Topics</th>

          </tr>
        </thead>
        <tbody>
        {ReviewMarksList && ReviewMarksList
        .sort((a,b)=>a.module-b.module)
        .map((n,index)=>
          <tr key={index}>
            <td>{index + 1}</td>
            <td>Module  {n.module}</td>
            <td>{n.mark}</td>
            <td>{n.pendings}</td>
          </tr>
        )}
        
        </tbody>


      </Table>
      </Col>
    </Row>
    </div>
  )
}

export default MentorReviewDetails


function ReviewMarkModal({handleClose,show,CurrCourse,mentor_id}) {
  const CourseSelector = useSelector((state) =>state.Course)
  const MentorWalletSelector = useSelector((state)=>state.MentorWallet)
  const [formData,setFormData] =useState({
    module:CurrCourse.current_module,
    user:CurrCourse.user.id,
    course:CurrCourse.id,
    pendings:'',
    mark:null


  })

  let current_module = CurrCourse.current_module 
  let is_completed = CurrCourse.is_completed

  for(let i = 1 ; i<=CurrCourse.total_modules + 1; i++){

    if (current_module == CurrCourse.total_modules){
      is_completed = true
      break
    } 

  }

  const dispatch = useDispatch()
  const addDays = (dateString, days) => {
  const date = new Date(dateString);
    date.setDate(date.getDate() + days);
  
    // Format the date back to YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };
  useEffect(()=>{
    dispatch(fetchMentorWallet(mentor_id))
    
  },[dispatch])
  // console.log(MentorWalletSelector.wallet)


  const  enrollForm={
    id:CurrCourse.id,
    current_module:current_module + 1,
    is_completed,
    next_review_date: addDays(CurrCourse.next_review_date,7),
    review_time: null,
    vcall_link:null
  }
  // console.log(mentorWalletForm,'loi')
  const handleSubmit = async()=>{

    const mentorWalletForm = {
      id :MentorWalletSelector.wallet.id,
      mentor:mentor_id,
      review_count: MentorWalletSelector.wallet.review_count + 1,
      amount:MentorWalletSelector.wallet.review_count + 1 === 1 ? 0.00 : MentorWalletSelector.wallet.amount,
      status: MentorWalletSelector.wallet.review_count + 1 === 1 ? 'pending' : MentorWalletSelector.wallet.status
    }
    try{
      const res = await ReviewMarkPost(formData)
      const ne = await EnrollPatch(CurrCourse.user.id,enrollForm)
      const walletPatch = await MentorWalletPatch(mentor_id,mentorWalletForm)
      console.log(ne,'leo')
      if (res.id){
        const payload = { 
          enroll_id: CurrCourse.id,
          formData: {
            ...CurrCourse,
            current_module:ne.data.current_module,
            is_completed,
            next_review_date: ne.data.next_review_date,
            review_time: null
          } 
        };
        console.log(payload,'loi')
        
        dispatch(enrollPatch(payload));
        dispatch(patchWallet(walletPatch.wallet))
        toast.success('Mark added successfully')
      }else {  
        toast.error('Enter mark in between 0 and 50')
          }
          
          }catch(error){
            console.log(error.response,'ss')
            }
      
            handleClose()
            dispatch(fetchReviewMarks())      
          }

    const handleChange = (e)=>{
    const {name, value} = e.target
    if(name == 'mark'){

      setFormData((prevData)=>
        ({
          ...prevData,
        [name] : Number(value) 
     }) )
    }else{
      setFormData((prevData)=>(
        {
          ...prevData,
          [name]:value
        }
      ))
    }
  }

  return (
    <>

      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton className='p-3'>
          <Modal.Title>Review Mark</Modal.Title>
        </Modal.Header>
        <Modal.Body className='p-2'>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Module</Form.Label>
              <Form.Control
                type="text"
                value={formData.module}
                disabled
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Mark Scored (Out of 50)</Form.Label>
              <Form.Control
                type="number"
                onChange={handleChange}
                name='mark'
                value={formData.mark}
                autoFocus
                max={50}
                min={0}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Pending topics</Form.Label>
              <Form.Control
                as="textarea"
                onChange={handleChange}
                name='pendings'
                value={formData.pendings}
                
              />
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer className='p-2'>
          <Button variant="secondary" onClick={handleClose} className='p-1'>
            Close
          </Button>
          <Button variant="" onClick={handleSubmit} className='p-1 text-light'style={{backgroundColor:"#12A98E"}} >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


function ReviewConfirmModal({handleConfirmClose,review,userid, mentorid,courseid}) {
  const navigate = useNavigate()
  const url = `${Vurl}meeting/${userid}/${mentorid}/${courseid}/`
  // console.log(url,'s')
  const handleConfirm = ()=>{
    // navigate(``)
    window.open(`${Vurl}meeting/${userid}/${mentorid}/${courseid}/`)
    handleConfirmClose()
  }
  
  return (
    <>
     

      <Modal show={review} onHide={handleConfirmClose} >
        <Modal.Header closeButton className='p-3'>
          <Modal.Title>Conduct Review</Modal.Title>
        </Modal.Header>
        <Modal.Body className='p-1'>Are you ready to conduct the review?</Modal.Body>
        <Modal.Footer className='p-1'>
          <Button variant="secondary" className='p-1' onClick={handleConfirmClose}>
            Close
          </Button>
          <Button variant="" className='p-1 text-light' style={{backgroundColor:'#12A98E'}} onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
