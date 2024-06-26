import React, { useEffect, useState } from 'react'
import './AdminUserList.css'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../Redux/Slices/UserListSlice';
import { toast } from 'react-toastify';
import Loader from '../Utils/Loader';


const AdminUserList = () => {
  const [userList, setUserList] = useState([])


  const dispatch = useDispatch()
  const {users,status,error} = useSelector((state)=> state.userList) 
  
  useEffect(()=>{
    dispatch(fetchUsers())
    
    if(users?.length!==0){
      
      setUserList(users)
    }

    
  },[dispatch])
  
  if(error && error.trim().length > 0){
    toast.error(error)
  }
  if (status === "loading") {
    return <Loader />;
  }
  const sortedUsers = [...users].sort((a,b)=>a.id-b.id)

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
       { sortedUsers.map((user,index)=>(
        <tr key={user.id}  >
          <td>{index+1}</td>
          <td>{user.first_name}</td>
          <td>04</td>
          <td>{user.email}</td>
          <td>{user.is_active?<span className='text-success'>Active</span>:<span className='text-danger'>InActive</span>}</td>
          <td><Link to={`/admin/user/${user.id}/`}><Button className="p-1 m-1 text-light"style={{backgroundColor:"#12A98E"}} variant=''>View</Button></Link></td>
        </tr>

       )

       )}  
        
        
      </tbody>
    </Table>
    </div>
  )
}

export default AdminUserList