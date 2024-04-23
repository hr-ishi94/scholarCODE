import React from 'react'
import './AdminUserList.css'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'

const AdminUserList = () => {
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
        <tr >
          <td>1</td>
          <td>Mark</td>
          <td>04</td>
          <td>mark@mail.com</td>
          <td>Active</td>
          <td><Button style={{backgroundColor:"#12A98E"}}>Block</Button></td>
        </tr>
        <tr>
          <td>2</td>
          <td>Mark</td>
          <td>04</td>
          <td>mark@mail.com</td>
          <td>Active</td>
          <td><Button style={{backgroundColor:"#12A98E"}}>Block</Button></td>
        </tr>
        <tr>
          <td>3</td>
          <td>Mark</td>
          <td>04</td>
          <td>mark@mail.com</td>
          <td>Active</td>
          <td><Button style={{backgroundColor:"#12A98E"}}>Block</Button></td>
        </tr>
        <tr>
          <td>4</td>
          <td>Mark</td>
          <td>04</td>
          <td>mark@mail.com</td>
          <td>Active</td>
          <td><Button style={{backgroundColor:"#12A98E"}}>Block</Button></td>
        </tr>
        
      </tbody>
    </Table>
    </div>
  )
}

export default AdminUserList