import React from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import './AdminCourseList.css'

const AdminCourseList = () => {
  return (
    <>
        <div className='course-table'>
        <h1>Course Management</h1>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>No. of Users</th>
          <th>No.of Modules</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody >
        <tr >
          <td>1</td>
          <td>Python Basics</td>
          <td>04</td>
          <td>05</td>
          <td>Active</td>
          <td><Button style={{backgroundColor:"#12A98E"}}>Block</Button></td>
        </tr>
        <tr>
          <td>2</td>
          <td>Python Django</td>
          <td>04</td>
          <td>04</td>
          <td>Active</td>
          <td><Button style={{backgroundColor:"#12A98E"}}>Block</Button></td>
        </tr>
        <tr>
          <td>3</td>
          <td>Python Django</td>
          <td>04</td>
          <td>03</td>
          <td>Active</td>
          <td><Button style={{backgroundColor:"#12A98E"}}>Block</Button></td>
        </tr>
        <tr>
          <td>4</td>
          <td>Python Basics</td>
          <td>04</td>
          <td>07</td>
          <td>Active</td>
          <td><Button style={{backgroundColor:"#12A98E"}}>Block</Button></td>
        </tr>
        
      </tbody>
    </Table>
    </div>
    </>
  )
}

export default AdminCourseList