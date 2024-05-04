import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoursesList } from '../../Redux/Slices/CoursesListSlice';
import { Link } from 'react-router-dom';


const AdminCategory = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const {courses,status,error}= useSelector((state)=>state.Courses)
  const [courseList, setcourseList] = useState([]) 
  const style = {
        position: "absolute",
        left: "350px",
        right: "100px",
        top: "100px"
    }

  useEffect(()=>{
    dispatch(fetchCoursesList())
    if(courses?.length!==0){
      setcourseList(courses)
    }
  },[dispatch])
  return (
    <div style={style}>
        <h1>Courses</h1>
        <br />
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>Category</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody >
        {courseList.filter((course)=>course.category.id ==params.id).map((course,index)=>(

        <tr >
          <td>{index+1}</td>
          <td>{course.name}</td>
          <td>{course.category.name}</td>
          <td>{course.status?<span className='text-success'>Active</span>:<span className='text-danger'>Inactive</span>}</td>
          <td><Link to={`/admin/course/${course.id}`}><Button className='p-1' style={{backgroundColor:"#12A98E"}}>View</Button></Link></td>
        </tr>
        ))}
      </tbody>
    </Table>
    </div>
  )
}

export default AdminCategory