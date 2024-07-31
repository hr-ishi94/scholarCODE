import React, { useEffect } from 'react'
import { Badge, Col, Row, Table } from 'react-bootstrap'
import DashComp from './utils/DashComp'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMentorCourse } from '../../Redux/Slices/mentorSide/MentorCourseSlice'
import { fetchAllEnrolledCourses } from '../../Redux/Slices/Userside/AllEnrolledCoursesSlice'
import { jwtDecode } from 'jwt-decode'
import { fetchMentorWallet } from '../../Redux/Slices/mentorSide/MentorWalletSlice'

const MentorDashboard = () => {
    const MentorToken = useSelector((state)=>state.MentorToken)
    const access = jwtDecode(MentorToken.access)
    const user_id = access.user_id
    const MentorCourseSelector = useSelector((state)=>state.MentorCourses)
    const EnrolledCourseSelector = useSelector((state)=>state.AllEnrolls)
    const WalletSelector = useSelector((state)=>state.MentorWallet)
    const TransactionSelector = useSelector((state)=>state.MentorTransactions)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchMentorWallet(user_id))
        dispatch(fetchMentorCourse())
        dispatch(fetchAllEnrolledCourses())
    },[dispatch])

    const courses = MentorCourseSelector.courses.filter((course)=>course.mentor == user_id).map((course)=>course.id)
    const userEnrolls = EnrolledCourseSelector.enrolls.filter((enroll)=> courses.includes(enroll.course.id))
    const wallet = WalletSelector?.wallet

    // console.log('wallet',wallet.balance,wallet.amount)
    const sortedTransactions = [...TransactionSelector.transactions]
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 10);

    
    const style = {
        position: "absolute",
        left: "350px",
        right: "100px",
        top: "100px",
        }

  return (
    <div style={style}>
        <h2><strong> Mentor Dashboard</strong></h2>
         <Row>
            <Col sm={6}>
                <DashComp title={'Courses Assigned'} count = {courses.length} />
            </Col>
            <Col sm={6}>
                <DashComp title={'Pending payments'}  count={wallet?.amount} revenue/>
            </Col>
            
        </Row>   
         <Row>
            <Col sm={6}>
                <DashComp title={'Wallet'} count={wallet?.balance} revenue />
            </Col>
            <Col sm={6}>
                <DashComp title={'User Enrolls'} count ={userEnrolls.length} />
            </Col>
            
        </Row>
        <br />
        <h3><strong> Transactions</strong></h3>
        
        <Table striped bordered hover className='text-center'>
        <thead>
            <tr>
            <th>id</th>
            <th>Amount</th>
            <th>Mode of transaction</th>
            <th>Timestamp</th>
            <th>status</th>
            </tr>
        </thead>
        <tbody>{
            sortedTransactions
        .filter((wlt)=>wlt.mentor_wallet.id === wallet.id)
        .sort((a,b)=>new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0,10)
        .map((txn,index)=>(

        <tr key = {index}>
            <td>{index + 1}</td>
            <td>Rs. {txn.amount}</td>
            <td>{txn.transaction_type}</td>
            <td>{txn.timestamp}</td>
            <td><Badge pill bg="success" className='p-1'> Paid</Badge></td>
        </tr>
        ))}


        </tbody>
        </Table>
    </div>
  )
}

export default MentorDashboard