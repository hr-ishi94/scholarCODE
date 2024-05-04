import React, { useEffect, useState } from 'react'
import './AdminCategoryList.css'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoryList } from '../../Redux/Slices/CategoryListSlice';
import { Link } from 'react-router-dom';
import Loader from '../Utils/Loader';


const AdminCategoryList = () => {
  const dispatch = useDispatch()
  const {categories,status,error} = useSelector((state)=>state.Categories)
  const [categoryList,setCategoryList] =useState([])
  
  console.log(status)

  
  useEffect(()=>{
    dispatch(fetchCategoryList())
    if(categories?.length!==0){
      setCategoryList(categories)
    }
    
  },[dispatch])
  
  if (status === "loading") {
    return <Loader />;
  }
  return (
    <div>
        <div className='category-table'>
        <h1>Category Management</h1>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>id</th>
          <th>Categories</th>
          <th>No. of Courses</th>
          {/* <th>No. of Mentors</th>
          <th>Status</th> */}
          <th>Action</th>
        </tr>
      </thead>
      <tbody >
        {
        categories.map((category,index)=>(
        <tr key={index}>
          <td>{index+1}</td>
          <td>{category.name}</td>
          <td>04</td>
          {/* <td>05</td>
          <td>Active</td> */}
          <td><Link to={`/admin/category/${category.id}/`}><Button className='p-1 m-1 ' style={{backgroundColor:"#12A98E"}}>View</Button></Link></td>
        </tr>

        ))}
      </tbody>
    </Table>
    </div>
    </div>
  )
}

export default AdminCategoryList