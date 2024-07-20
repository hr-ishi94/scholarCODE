import React, { useEffect, useState } from 'react'
import DashComp from '../Mentor/utils/DashComp'
import { Col, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../../Redux/Slices/UserListSlice'
import { fetchMentorCourse } from '../../Redux/Slices/mentorSide/MentorCourseSlice'
import { fetchCoursesList } from '../../Redux/Slices/CoursesListSlice'
import { fetchadminTransactions } from '../../Redux/Slices/AdminTransactionSlice'
import { payment_ids } from '../../Axios/AdminServer/AdminServer'

const AdminDashboard = () => {
    const UserSelector = useSelector((state)=>state.userList)
    const MentorsSelector = useSelector((state)=>state.Mentors)
    const CourseSelector = useSelector((state)=>state.Courses)
    const TransactionSelector = useSelector((state)=>state.AdminTransactions)
    const dispatch = useDispatch()
    const activeMentors = MentorsSelector.mentors.filter((course)=> course.is_active === true )
    const [paymentIds,setPaymentIds ] = useState([])
 
    console.log(TransactionSelector,'sloi')
    useEffect(()=>{
        dispatch(fetchUsers())
        dispatch(fetchCoursesList())
        dispatch(fetchadminTransactions())

        const fetchPaymentIds = async () =>{
            try{
                const res = await payment_ids()
                console.log(res.data,'lo')
                if (res){
                    setPaymentIds(res.data)
                }
            }
            catch(error){
                console.log(error)
            }
        }
        fetchPaymentIds()

    },[dispatch])

    // const [trans, setTrans] = useState(0)
    let trans = 0 

    TransactionSelector.transactions.map((rate)=>{
        // setTrans((prevData)=>prevData + Number(rate.amount))
        trans += Number(rate.amount)    
    })

    const sortedTransactions = [...TransactionSelector.transactions].sort((a, b) => b.timestamp - a.timestamp);

    console.log(paymentIds,'ll')

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
        
        {sortedTransactions
        .map((trans)=>(
            <tr>
                <td>{trans.id}</td>
                
                
                {paymentIds
                .filter((payment)=>payment.id === trans.payment)
                .map((payment)=>
                <>
                <td>{payment.email}</td>
                {CourseSelector.courses.filter((course)=>course.id == payment.course_id)
                .map((course)=>
                    <td >{course.name}</td>
                )}
                

                <td>{payment.provider_order_id}</td>
                </>
                )}
                <td>{trans.timestamp}</td>
            </tr>

        ))}
        </tbody>
        </Table>     
    </div>
  )
}

export default AdminDashboard