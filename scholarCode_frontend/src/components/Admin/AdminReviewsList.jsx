import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllEnrolledCourses } from '../../Redux/Slices/Userside/AllEnrolledCoursesSlice'
import Loader from '../Utils/Loader'
import { Link } from 'react-router-dom'
import Pagination from './utils/Pagination'

const AdminReviewsList = () => {
    const EnrolledCourseSelector = useSelector((state)=>state.AllEnrolls)
    const MentorSelector = useSelector((state)=>state.Mentors)
    const CoursesSelector = useSelector((state)=> state.Courses)

    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 10;

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchAllEnrolledCourses() )
    },[dispatch])

    const filteredReviews = EnrolledCourseSelector.enrolls.filter((enroll)=>
    enroll.user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) )

    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const sortedReviews = [...currentReviews].sort((a, b) => a.id - b.id);




    if (EnrolledCourseSelector.status === 'loading'){
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
        
            <Row className="mx-2 my-2" >
          <Col sm={9}>
            <h1>Reviews List</h1>
          </Col>
          <Col sm={3}>
            <Form.Control
              type="text"
              className='p-1'
              placeholder="Search reviews"
              value={searchQuery}
              onChange={(e) => {setSearchQuery(e.target.value);
                setCurrentPage(1);}}
            />
          </Col>
        </Row>

        <Table striped bordered hover className='text-center'>
        <thead>
            <tr>
            <th>id</th>
            <th>Name</th>
            <th>Course</th>
            <th>Next Review date</th>
            <th>Time</th>
            <th>Mentor Name</th>
            <th>Action</th>
            </tr>
        </thead>
        
        <tbody>
        {sortedReviews.map((course,index)=>(
        
            <tr key = {index}>
                <td className='text-center'>{ indexOfFirstReview + index + 1}</td>
                <td className='text-center'>{course.user.first_name}</td>
                {CoursesSelector.courses.filter((crs)=>crs.id === course.course.course).map((crs)=>
                <td key = {crs.id}>{crs.name}</td>
                )}
                
                <td className='text-center'>{!course.is_completed? course.next_review_date: <span style={{color:'#12A98E'}}>Course Completed <i className="fa-solid fa-circle-check"></i></span> }</td>
                <td className='text-center'>{course.review_time?course.review_time: (course.is_completed? '--' :<span className='text-primary'> Time not scheduled</span>) }</td>
                {MentorSelector.mentors.filter((mentor)=>mentor.id === course.course.mentor).map((mentor)=>
                <td className='text-center' key={mentor.id}>{mentor.first_name}</td>
                )}
                <td ><Link to={`/admin/review-details/${course.id}/`}><Button variant='' className='p-1 text-light' style={{backgroundColor:'#12A98E'}}>View </Button></Link></td>

            </tr>
        ))}
        </tbody>
        </Table>
        <Pagination
          itemsPerPage={reviewsPerPage}
          totalItems={filteredReviews.length}
          paginate={paginate}
          currentPage={currentPage}
        />
    </div>
  )
}

export default AdminReviewsList