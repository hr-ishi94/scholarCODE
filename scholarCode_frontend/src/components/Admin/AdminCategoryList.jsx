import React from 'react'
import './AdminCategoryList.css'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'

const AdminCategoryList = () => {
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
          <th>No. of Mentors</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody >
        <tr >
          <td>1</td>
          <td>Python</td>
          <td>04</td>
          <td>05</td>
          <td>Active</td>
          <td><Button style={{backgroundColor:"#12A98E"}}>View</Button></td>
        </tr>
        <tr>
          <td>2</td>
          <td>Javascript</td>
          <td>04</td>
          <td>06</td>
          <td>Active</td>
          <td><Button style={{backgroundColor:"#12A98E"}}>View</Button></td>
        </tr>
        <tr>
          <td>3</td>
          <td>SQL</td>
          <td>04</td>
          <td>06</td>
          <td>Active</td>
          <td><Button style={{backgroundColor:"#12A98E"}}>View</Button></td>
        </tr>
        <tr>
          <td>4</td>
          <td>C#</td>
          <td>04</td>
          <td>06</td>
          <td>Active</td>
          <td><Button style={{backgroundColor:"#12A98E"}}>View</Button></td>
        </tr>
        
      </tbody>
    </Table>
    </div>
    </div>
  )
}

export default AdminCategoryList