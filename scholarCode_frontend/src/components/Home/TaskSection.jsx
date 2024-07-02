import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import TaskList from './TaskList';

const TaskSection = ({EnrolledCourse,modulesList,tasks,current_module,AttendReview}) => {
    

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
  },[])

    

    

    return (
    <>
    {
      modulesList.map((module,index)=>(
        <div key={index}>
        {module < current_module &&
        <>
        
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
      
      <Button disabled className='p-2 my-3 text-light' variant='' style={{backgroundColor:"#12A98E"}}>Download your certificate</Button> 
    
    
    </>
  )
}

export default TaskSection