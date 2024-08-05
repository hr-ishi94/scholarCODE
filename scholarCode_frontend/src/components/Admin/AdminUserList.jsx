import React, { useEffect, useState } from 'react'
import './AdminUserList.css'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import {  Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../Redux/Slices/UserListSlice';
import { toast } from 'react-toastify';
import Loader from '../Utils/Loader';
import { Form,Col, Row } from 'react-bootstrap';
import Pagination from './utils/Pagination';


const AdminUserList = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage,setCurrentPage] = useState(1)
  const usersPerPage = 10;

  const dispatch = useDispatch()
  const {users,status,error} = useSelector((state)=> state.userList) 
  
  useEffect(()=>{
    dispatch(fetchUsers())   
  },[dispatch])

  const fitleredUsers = users.filter((user)=>
  user.first_name.toLowerCase().includes(searchQuery.toLowerCase())
)

const indexOfLastUser = currentPage * usersPerPage
const indexofFirstUser = indexOfLastUser - usersPerPage
const currentUsers = fitleredUsers.slice(indexofFirstUser,indexOfLastUser)

const paginate = (pageNumber) =>setCurrentPage(pageNumber)
  
  if(error && error.trim().length > 0){
    toast.error(error)
  }
  if (status === "loading") {
    return <Loader />;
  }
  const sortedUsers = [...currentUsers].sort((a,b)=>a.id-b.id)

  return (
    
    <div className='user-table'>
        <h1>User Management</h1>
        <Row className="mx-2 my-2" >
          <Col sm={9}>
          </Col>
          <Col sm={3}>
            <Form.Control
              type="text"
              placeholder="Search Users"
              value={searchQuery}
              onChange={(e) => {setSearchQuery(e.target.value);
                setCurrentPage(1);}
              }
            />
          </Col>
        </Row>
    <Table striped bordered hover className='text-center'>
      <thead>
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>No. of Courses</th>
          <th>Email</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody >
       { sortedUsers.map((user,index)=>(
        <tr key={user.id}  >
          <td>{indexofFirstUser + index+1}</td>
          <td>{user.first_name?user.first_name+ " "+user.last_name:<span className='text-secondary'>-NA-</span>}</td>
          <td>04</td>
          <td>{user.email}</td>
          <td>{user.is_active?<span className='text-success'>Active</span>:<span className='text-danger'>InActive</span>}</td>
          <td><Link to={`/admin/user/${user.id}/`}><Button className="p-1 m-1 text-light"style={{backgroundColor:"#12A98E"}} variant=''>View</Button></Link></td>
        </tr>

       )

       )}  
        
        
      </tbody>
    </Table>
    <Pagination
          itemsPerPage={usersPerPage}
          totalItems={fitleredUsers.length}
          paginate={paginate}
          currentPage={currentPage}
        />

    </div>
  )
}

export default AdminUserList