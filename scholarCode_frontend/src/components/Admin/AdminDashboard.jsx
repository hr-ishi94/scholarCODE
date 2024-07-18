import React, { useEffect, useState } from 'react'
import DashComp from '../Mentor/utils/DashComp'
import { Col, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../../Redux/Slices/UserListSlice'
import { fetchMentorCourse } from '../../Redux/Slices/mentorSide/MentorCourseSlice'
import { fetchCoursesList } from '../../Redux/Slices/CoursesListSlice'
import { fetchadminTransactions } from '../../Redux/Slices/AdminTransactionSlice'

const AdminDashboard = () => {
    const UserSelector = useSelector((state)=>state.userList)
    const MentorsSelector = useSelector((state)=>state.Mentors)
    const CourseSelector = useSelector((state)=>state.Courses)
    const TransactionSelector = useSelector((state)=>state.AdminTransactions)
    const dispatch = useDispatch()
    const activeMentors = MentorsSelector.mentors.filter((course)=> course.is_active === true )
    
    console.log(TransactionSelector,'sloi')
    useEffect(()=>{
        dispatch(fetchUsers())
        dispatch(fetchCoursesList())
        dispatch(fetchadminTransactions())
    },[dispatch])

    // const [trans, setTrans] = useState(0)
    let trans = 0 

    TransactionSelector.transactions.map((rate)=>{
        // setTrans((prevData)=>prevData + Number(rate.amount))
        trans += Number(rate.amount)    
    })
    console.log(trans,'ll')

    const style = {
        position: "absolute",
        left: "350px",
        right: "100px",
        top: "100px",
        }
  return (
    <div style={style}>
        <h2><strong> Admin Dashboard</strong></h2>
         <Row>
            <Col sm={6}>
                <DashComp title={'Users Enrolled'} count = {UserSelector.users.length} />
            </Col>
            <Col sm={6}>
                <DashComp title={'Active Mentors'} count = {activeMentors.length}/>
            </Col>
            
        </Row>   
         <Row>
            <Col sm={6}>
                <DashComp title={'Total Courses'} count={CourseSelector.courses.length}/>
            </Col>
            <Col sm={6}>
                <DashComp title={'Total Revenue'} count = {trans} revenue/>
            </Col>
            
        </Row>
        <br />
        <h2><strong> Transactions</strong></h2>
        <Table striped bordered hover className='text-center'>
        <thead>
            <tr>
            <th>id</th>
            <th>User</th>
            <th>Course</th>
            <th>Tran ID</th>
            <th>Time</th>
            </tr>
        </thead>
        <tbody>
        {TransactionSelector.transactions
        // .sort((a,b)=>b.timestamp - a.timestamp )
        .map((trans)=>(
            <tr>
                <td>{trans.id}</td>
                <td>{trans.user.first_name}</td>
                <td>{trans.payment.id}</td>
                <td>{trans.payment.provider_order_id}</td>
                <td>{trans.timestamp}</td>
            </tr>

        ))}
        </tbody>
        </Table>     
    </div>
  )
}

export default AdminDashboard