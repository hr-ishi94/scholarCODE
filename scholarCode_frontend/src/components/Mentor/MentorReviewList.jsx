import React, { useEffect, useState } from 'react'
import Row  from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMentorCourse } from '../../Redux/Slices/mentorSide/MentorCourseSlice';
import { fetchUsers } from '../../Redux/Slices/UserListSlice';
import { fetchCoursesList } from '../../Redux/Slices/CoursesListSlice';
import { fetchAllEnrolledCourses } from '../../Redux/Slices/Userside/AllEnrolledCoursesSlice';
import Loader from '../Utils/Loader';
import { jwtDecode } from 'jwt-decode';
import { Form } from 'react-bootstrap';
import Pagination from '../Admin/utils/Pagination';

const MentorReviewList = () => {
    const EnrolledCourseSelector = useSelector((state)=>state.AllEnrolls)
    const MentorCourseSelector = useSelector((state)=>state.MentorCourses)
    const MentorToken = useSelector((state)=>state.MentorToken)
    const access = jwtDecode(MentorToken.access)
    const MentorId = access.user_id
    const UserSelector = useSelector((state)=>state.userList)
    const CourseSelector = useSelector((state)=>state.Courses)
    const dispatch = useDispatch()

    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 5;

    useEffect(()=>{
        dispatch(fetchUsers())
        dispatch(fetchCoursesList())
        dispatch(fetchMentorCourse())
        dispatch(fetchAllEnrolledCourses())
    },[dispatch])

    const filteredReviews = EnrolledCourseSelector.enrolls.filter((enroll) =>
        enroll.user.first_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
      const indexOfLastReview = currentPage * reviewsPerPage;
      const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
      const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);
      const paginate = (pageNumber) => setCurrentPage(pageNumber);
      const sortedReviews = [...currentReviews].sort((a, b) => a.id - b.id);
    



      const MentorCourseSet = new Set();
      if (Array.isArray(MentorCourseSelector.courses)) {
          for (let course of MentorCourseSelector.courses) {
              if (!MentorCourseSet.has(course.id) && course.mentor === MentorId) {
                  MentorCourseSet.add(course.id);
              }
          }
      }
      
      
      const CoursesObject = {};

      // Ensure both MentorCourseSelector.courses and CourseSelector.courses are arrays before iterating
      if (Array.isArray(MentorCourseSelector.courses) && Array.isArray(CourseSelector.courses)) {
          for (let mentorCourse of MentorCourseSelector.courses) {
              for (let course of CourseSelector.courses) {
                  // Check if mentorCourse.course matches course.id
                  if (mentorCourse.course === course.id) {
                      // Assign the course name to the mentorCourse ID
                      CoursesObject[mentorCourse.id] = course.name;
                  }
              }
          }
      }
      
    // console.log(CoursesObject,'sed')

    const MentorCoursesList = EnrolledCourseSelector && EnrolledCourseSelector.enrolls.filter((enroll)=>MentorCourseSet.has(enroll.course.id))

    if(EnrolledCourseSelector.status === 'loading'){
        return <Loader/>
    }
    const style = {
        position: "absolute",
        left: "350px",
        right: "100px",
        top: "100px"
    }
  return (
    
    <div style={style}>
        
            <h1>Upcoming Reviews</h1>
            <Row className="mx-2 my-2" >
          <Col sm={9}>
          </Col>
          <Col sm={3}>
            {/* <Form.Control
            className='p-1'
              type="text"
              placeholder="Search User Reviews"
              value={searchQuery}
              onChange={(e) => {setSearchQuery(e.target.value);
                setCurrentPage(1);}}
            /> */}
          </Col>
        </Row>
            
        <Table striped bordered hover className='text-center'>
        <thead>
            <tr>
            <th>id</th>
            <th>Name</th>
            <th>Course</th>
            <th>Enroll ID</th>
            <th>Next Review date</th>
            <th>Time</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody >
            {MentorCoursesList
            .sort((a,b)=>  a.next_review_date - b.next_review_date)
            .filter((course)=>!course.is_completed)
            .map((course,index)=>(

                <tr key={index}>
                <td>{index+1}</td>
                {UserSelector.users.filter((user)=>user.id === course.user.id).map((n)=>
                <td>{n.first_name?n.first_name: <span className='text-secondary'> - NA - </span>}</td>
                )
                }
                <td>{CoursesObject[course.course.id]}</td>
                <td>{course.enroll_id}</td>
                
                {course.is_completed?<>
                
                    <td className='text-success'>Course Completed  <i className="fa-solid fa-circle-check"></i></td>
                    <td>----</td>
                </>:
                <>
                <td>{course.next_review_date}</td>
                <td>{course.review_time?course.review_time: <span className='text-primary'> Not Scheduled</span>}</td>

                </>}
                <td><Link to={`/mentor/review/${course.id}/`}><Button variant='' style={{backgroundColor:"#12A98E"}} className='text-light p-1'>view</Button></Link></td>
            </tr>
            ))}
            
            
        </tbody>
        </Table>
        {/* <Pagination
          itemsPerPage={reviewsPerPage}
          totalItems={filteredReviews.length}
          paginate={paginate}
          currentPage={currentPage}
        /> */}
        <br />
        <br />
        <br />
        <h1>Course Completed </h1>
            <br />
        <Table striped bordered hover className='text-center'>
        <thead>
            <tr>
            <th>id</th>
            <th>Name</th>
            <th>Course</th>
            <th>Enroll ID</th>
            <th>Certificate status</th>
            <th>Course status</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody >
            {MentorCoursesList
            .sort((a,b)=>a.next_review_date-b.next_review_date)
            .filter((course)=>course.is_completed)
            .map((course,index)=>(

                <tr key={index}>
                <td>{index+1}</td>
                {UserSelector.users.filter((user)=>user.id === course.user.id).map((n)=>
                <td>{n.first_name?n.first_name: <span className='text-secondary'> - NA - </span>}</td>
                )
                }
                <td>{CoursesObject[course.course.id]}</td>
                <td>{course.enroll_id}</td>
                <td className='text-success'>Course Completed  <i className="fa-solid fa-circle-check"></i></td>
                {course.certificate?
                <td className='text-success'>Certificate issued  <i className="fa-solid fa-circle-check"></i></td>
                :
                <td className='text-danger'>Certificate Not issued  <i className="fa-solid fa-circle-xmark"></i></td>
                }
                
                
                
                    
              
                
                <td><Link to={`/mentor/review/${course.id}/`}><Button variant='' style={{backgroundColor:"#12A98E"}} className='text-light p-1'>view</Button></Link></td>
            </tr>
            ))}
            
            
        </tbody>
        </Table>
        
        
            
       

    </div>
    

  )
}

export default MentorReviewList