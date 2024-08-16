import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap';
import TaskList from './TaskList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviewMarks } from '../../Redux/Slices/mentorSide/ReviewMarkSlice';
import { base_url, course, course_url } from '../../Axios/Urls/EndPoints';

const TaskSection = ({EnrolledCourse,modulesList,tasks,current_module,AttendReview}) => {

  const ReviewMarkSelector = useSelector((state)=>state.ReviewMarks)
  
    

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
  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(fetchReviewMarks())
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

  const review_marks= EnrolledCourse && ReviewMarkSelector.marks.filter((review)=>review.course === EnrolledCourse.id)

  // const [score,setScore] = useState(0) 
  // useEffect(()=>{
  //     review_marks && review_marks.map((review)=>{
    
  //       setScore((prevData)=>prevData+review.mark)
  //     }
  //   )

  // },[score])
  // console.log(score,'score')
    return (
    <>
    {
      modulesList.map((module,index)=>(
        <div key={index}>
        {module < current_module &&
        <>
        <Row>
                <Col sm={9}>
                <h2 >Module {module}  <i className="fa-solid fa-circle-check text-success"></i></h2>
        
        {tasks.filter((task)=>task.task_module === module).map((task,index)=>(
          <ul>
          <li className='text-secondary'>
            <del>
                <h4 key={index} > {task.name}
                <input type="checkbox" disabled checked style={{width:"25px",height:"25px",marginLeft:"5px",}}/>
            </h4>
            </del>
            
          </li> 
        </ul>
          
        ))}
           
                </Col>
                <Col sm = {3}>
                {review_marks.filter((review)=>review.module == module).map((review)=>(

                  <Card style={{ width: '18rem',backgroundColor:'#12A98E' }} className='text-center bg- text-light'>
                    <Card.Body className='p-2'>
                      <Card.Title>Module {module} Remarks</Card.Title>
                      <Card.Subtitle className="mb-2 ">Mark scored: {review.mark}/50</Card.Subtitle>
                      <Card.Subtitle className="mb-2 text-muted">
                        <strong>Pending Topics</strong>
                        </Card.Subtitle>
                          
                      <Card.Text >
                        {review.pendings?review.pendings:'-No Pendings-'}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ))}
                </Col>
            </Row>
        
        
        </>
        }
        </div>
        
      ))}

    {modulesList.map((module,index)=>(
        <div key={index}>
        {module === current_module &&
        <>
                <h2>Module {module}</h2>
            <TaskList module = {module} tasks = {tasks} reviewDate ={EnrolledCourse.next_review_date} currentDate = {currentDate}/>
            

        
            
            {
            ((currentDate === EnrolledCourse.next_review_date) && (currentTime >= EnrolledCourse.review_time))?
            <Button className='p-1 m-1 text-light' onClick= {AttendReview} style={{backgroundColor:"#12A98E"}} variant=''>Attend Review </Button>:
            <>
            <h5>Your Review is scheduled on : <span className='text-danger'>{EnrolledCourse.next_review_date}</span> Time: {EnrolledCourse.review_time?<span className='text-danger'>{EnrolledCourse.review_time}</span>:<span className='text-primary'>Not scheduled</span>}  </h5> 
            {!EnrolledCourse?.review_time &&
            <p className='text-secondary'><i className="fa-solid fa-circle-exclamation text-primary"></i> Time will be updated two days prior review date.If not do ask your mentor to schedule it.</p>
            }
            <Button disabled className='p-1 m-1 text-light' style={{backgroundColor:"#12A98E"}} variant=''>Attend Review </Button>
            </>
            }
            
        </>
        }
        </div>
        
      ))}

      {
      modulesList.map((module,index)=>(
        <div key={index}>
        {(module > current_module || !EnrolledCourse )  && 
        <>
        
        <h2 className='text-secondary'>Module {module}</h2>
        {tasks.filter((task)=>task.task_module === module).map((task,index)=>(
          <div className='d-flex text-secondary'>
            <h4 key={index}><i className="fa-solid fa-lock "></i> task{index+1}</h4>
           
          </div>
          
        ))}
        </>
        }
        </div>
        
      ))}
      {EnrolledCourse && EnrolledCourse.certificate?
      <Col sm={8}>
        <br />

        <h6>You have successfully completed this course please download the certificate</h6>
        
        <Button
          className='p-2 my-3 text-light'
          variant=''
          style={{ backgroundColor: "#12A98E" }}
          href={EnrolledCourse?.certificate ? `${base_url}${EnrolledCourse.certificate}` : '#'}
          target="_blank"
          rel="noopener noreferrer"
        >
          Download your certificate
        </Button>

      </Col>:
      <>
      <br />
      {
       EnrolledCourse && EnrolledCourse.is_completed && !EnrolledCourse.certificate &&
      <h6 className='text-primary'><i className="fa-solid fa-circle-exclamation"></i> Mentor will issue the certificate soon!</h6>
      }
      <Button disabled className='p-2 my-3 text-light' variant='' style={{backgroundColor:"#12A98E"}}>Download your certificate</Button> 
      </>
      
    }
    
    </>
  )
}

export default TaskSection