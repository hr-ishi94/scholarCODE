import React from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'

const AdminCategory = () => {
    const style = {
        position: "absolute",
        left: "350px",
        right: "100px",
        top: "100px"
    }
  return (
    <div style={style}>
        <h1>Courses</h1>
        <br />
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>No. of Users</th>
          <th>No. of Modules</th>
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
          <td><Button className='p-1' style={{backgroundColor:"#12A98E"}}>View</Button></td>
        </tr>
        <tr>
          <td>2</td>
          <td>Javascript</td>
          <td>04</td>
          <td>06</td>
          <td>Active</td>
          <td><Button className='p-1' style={{backgroundColor:"#12A98E"}}>View</Button></td>
        </tr>
        <tr>
          <td>3</td>
          <td>SQL</td>
          <td>04</td>
          <td>06</td>
          <td>Active</td>
          <td><Button className='p-1' style={{backgroundColor:"#12A98E"}}>View</Button></td>
        </tr>
        <tr>
          <td>4</td>
          <td>C#</td>
          <td>04</td>
          <td>06</td>
          <td>Active</td>
          <td><Button className='p-1' style={{backgroundColor:"#12A98E"}}>View</Button></td>
        </tr>
        
      </tbody>
    </Table>
    </div>
  )
}

export default AdminCategory