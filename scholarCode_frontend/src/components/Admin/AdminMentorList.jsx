import React from 'react'
import './AdminMentorList.css'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'

const AdminMentorList = () => {
  return (
    <>
        <div className='mentor-table'>
        <h1>Mentor Management</h1>
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
          <td>Thomas</td>
          <td>04</td>
          <td>thomas@mail.com</td>
          <td>Active</td>
          <td><Button style={{backgroundColor:"#12A98E"}}>View</Button></td>
        </tr>
        <tr>
          <td>2</td>
          <td>Thomas</td>
          <td>04</td>
          <td>thomas@mail.com</td>
          <td>Active</td>
          <td><Button style={{backgroundColor:"#12A98E"}}>View</Button></td>
        </tr>
        <tr>
          <td>3</td>
          <td>Thomas</td>
          <td>04</td>
          <td>thomas@mail.com</td>
          <td>Active</td>
          <td><Button style={{backgroundColor:"#12A98E"}}>View</Button></td>
        </tr>
        <tr>
          <td>4</td>
          <td>Thomas</td>
          <td>04</td>
          <td>thomas@mail.com</td>
          <td>Active</td>
          <td><Button style={{backgroundColor:"#12A98E"}}>View</Button></td>
        </tr>
        
      </tbody>
    </Table>
    </div>
    </>
  )
}

export default AdminMentorList