import React from 'react'
import Row  from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';

const MentorReviewList = () => {
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
                <h1>Upcoming Reviews</h1>
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
                <td><Link to={'/mentor/review/id/'}><Button variant='' style={{backgroundColor:"#12A98E"}} className='text-light p-1'>view</Button></Link></td>
            </tr>
            <tr>
                <td>1</td>
                <td>sdg</td>
                <td>dsgdgs</td>
                <td>sddd</td>
                <td>sddd</td>
                <td><Link to={'/mentor/review/id/'}><Button variant='' style={{backgroundColor:"#12A98E"}} className='text-light p-1'>view</Button></Link></td>
            </tr>
            
        </tbody>
        </Table>
        
            
        </div>

        <br />
        <br />
        <br />
        <br />
        <div>

        <h1>Review History</h1>
        <Table striped bordered hover>
        <thead>
            <tr>
            <th>id</th>
            <th>Name</th>
            <th>Last Review Date</th>
            {/* <th>No.of Modules</th> */}
            <th>Status</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody >

            <tr>
                <td>1</td>
                <td>sdg</td>
                <td>dsgdgs</td>
                <td>sddd</td>
                <td><Button variant='' style={{backgroundColor:"#12A98E"}} className='text-light p-1'>view</Button></td>
            </tr>
            
        </tbody>
        </Table>
        
            
        </div>

    </div>
    

  )
}

export default MentorReviewList