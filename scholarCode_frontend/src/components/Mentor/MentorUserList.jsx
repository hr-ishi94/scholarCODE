import React from 'react'
import Row  from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'

const MentorUserList = () => {
    const style = {
        position: "absolute",
        left: "350px",
        right: "100px",
        top: "100px"
    }
  return (
    <div style={style}>
    <div>

    <Row>
        <Col sm={10}>
            <h1>Assigned Users List</h1>
        </Col>
        <Col sm={2}>
            <Button
            className='p-1 text-light' 
            variant='' 
            style={{backgroundColor:'#12A98E'}}>Add new Course</Button>
        </Col>
    </Row>

    <Table striped bordered hover>
    <thead>
        <tr>
        <th>id</th>
        <th>Name</th>
        <th>Course</th>
        <th>Review date</th>
        <th>Time</th>
        <th>Action</th>
        </tr>
    </thead>
    <tbody >

        <tr>
            <td>1</td>
            <td>sdg</td>
            <td>dsgdgs</td>
            <td>sddd</td>
            <td>sddd</td>
            <td>dgdgd</td>
        </tr>
        <tr>
            <td>1</td>
            <td>sdg</td>
            <td>dsgdgs</td>
            <td>sddd</td>
            <td>sddd</td>
            <td>dgdgd</td>
        </tr>
        
    </tbody>
    </Table>
    
        
    </div>


</div>
  )
}

export default MentorUserList