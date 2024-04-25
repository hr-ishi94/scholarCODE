import React, { useEffect, useState } from 'react'
import './AdminUserList.css'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import { Link } from 'react-router-dom';

const baseUrl = "http://127.0.0.1:8000/";

const AdminUserList = () => {
  const [users, setUsers] = useState([])

  useEffect(()=>{
    async function fetchUsers(){
      
      const response = await axios.get(`${baseUrl}/main/users/`) 
      setUsers(response.data)
    
  }
  fetchUsers()

  },[])
  return (
    
    <div className='user-table'>
        <h1>User Management</h1>
        <Table striped bordered hover>
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
       { users.map((user)=>(
        <tr key={user.id}  >
          <td>{user.id}</td>
          <td>{user.first_name}</td>
          <td>04</td>
          <td>{user.email}</td>
          <td>{user.isactive?<span className='text-success'>Active</span>:<span className='text-danger'>InActive</span>}</td>
          <td><Link to={`/admin/user/${user.id}`}><Button className="p-1 m-1"style={{backgroundColor:"#12A98E"}}>View</Button></Link></td>
        </tr>

       )

       )}  
        
        
      </tbody>
    </Table>
    </div>
  )
}

export default AdminUserList