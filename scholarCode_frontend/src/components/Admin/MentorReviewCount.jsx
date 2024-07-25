import React from 'react'
import { Table } from 'react-bootstrap'

const MentorReviewCount = ({mentor_id}) => {
    
  return (
    <div>
        <Table striped bordered hover className='text-center'>
      <thead>
        <tr>
          <th>id</th>
          <th>Categories</th>
          <th>No. of Courses</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody >
        <tr>
            <td>{mentor_id}</td>
            <td></td>
            <td></td>
        </tr>

      </tbody>
        </Table>
    </div>
  )
}

export default MentorReviewCount