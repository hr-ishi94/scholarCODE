import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import './AdminCourseList.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoursesList } from '../../Redux/Slices/CoursesListSlice';
import { Link } from 'react-router-dom';
import Loader from '../Utils/Loader';


const AdminCourseList = () => {
  const dispatch = useDispatch()
  const {courses,status,error} = useSelector((state)=>state.Courses)

  const [courseList, setCourseList] = useState([])

  console.log(courses,status,error)

  useEffect(()=>{
    dispatch(fetchCoursesList())
    if(courses?.length!==0){
      setCourseList(courses)
    }
  },[dispatch])


  if (status === "loading") {
    return <Loader />;
  }

  return (
    <>
        <div className='course-table'>
        <h1>Course Management</h1>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>Category</th>
          {/* <th>No.of Modules</th> */}
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody >


        {courseList.map((course,index)=>(
        <tr key={index}>
          <td>{index+1}</td>
          <td>{course.name}</td>
          <td>{course.category.name}</td>
          {/* <td>05</td> */}
          <td>{course.status?<span className='text-success'>Active</span>:<span className='text-danger'>Inactive</span>}</td>
          <td><Link to={`/admin/course/${course.id}/`}><Button className='p-1 m-1 ' style={{backgroundColor:"#12A98E"}}>View</Button></Link></td>
        </tr>

        ))}
        
        
      </tbody>
    </Table>
    </div>
    </>
  )
}

export default AdminCourseList