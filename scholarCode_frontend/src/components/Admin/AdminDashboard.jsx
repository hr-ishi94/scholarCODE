import React, { useEffect, useState } from 'react';
import DashComp from '../Mentor/utils/DashComp';
import { Col, Row, Table, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../Redux/Slices/UserListSlice';
import { fetchCoursesList } from '../../Redux/Slices/CoursesListSlice';
import { fetchadminTransactions } from '../../Redux/Slices/AdminTransactionSlice';
import { payment_ids } from '../../Axios/AdminServer/AdminServer';
import { fetchAdminWallet } from '../../Redux/Slices/AdminWalletSlice';
import Pagination from './utils/Pagination';
import { course } from '../../Axios/Urls/EndPoints';

const AdminDashboard = () => {
    const UserSelector = useSelector((state)=>state.userList);
    const MentorsSelector = useSelector((state)=>state.Mentors);
    const CourseSelector = useSelector((state)=>state.Courses);
    const AdminWalletSelector = useSelector((state)=>state.AdminWallet);
    const TransactionSelector = useSelector((state)=>state.AdminTransactions);
    const dispatch = useDispatch();
    const activeMentors = MentorsSelector.mentors.filter((mentor)=> mentor.is_active === true && mentor.is_staff === true);
    const [paymentIds, setPaymentIds ] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const transactionsPerPage = 6;

    useEffect(()=>{
        dispatch(fetchUsers());
        dispatch(fetchCoursesList());
        dispatch(fetchadminTransactions());
        dispatch(fetchAdminWallet());

        const fetchPaymentIds = async () =>{
            try {
                const res = await payment_ids();
                if (res) {
                    setPaymentIds(res.data);
                }
            } catch(error) {
                console.log(error);
            }
        }
        fetchPaymentIds();
    }, [dispatch]);

    let trans = 0;
if (TransactionSelector.transactions) {
  TransactionSelector.transactions.forEach(rate => {
    trans += Number(rate.amount);    
  });
}


const filteredTransactions = TransactionSelector.transactions
? TransactionSelector.transactions.filter((txn) =>
    paymentIds.some((payment) => payment.id === txn.payment && payment.email.toLowerCase().includes(searchQuery.toLowerCase()))
)
: [];

    // Pagination logic
    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const sortedTransactions = [...currentTransactions].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    const [wallet] = Array.isArray(AdminWalletSelector.wallet) ? AdminWalletSelector.wallet : [];


    const style = {
        position: "absolute",
        left: "350px",
        right: "100px",
        top: "100px",
    };

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
                    <DashComp title={'Total Revenue'} count = {wallet && wallet.balance} revenue/>
                </Col>
            </Row>
            <br />
            <Row className="mx-2 my-2" >
          <Col sm={9}>
            <h2><strong> Transactions</strong></h2>
          </Col>
          <Col sm={3}>
            <Form.Control
              type="text"
              placeholder="Search email "
              className='p-1'
              value={searchQuery}
              onChange={(e) => {setSearchQuery(e.target.value);
                setCurrentPage(1);}}
            />
          </Col>
        </Row>
            
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
                    {sortedTransactions.map((trans, index) => (
                        <tr key={index}>
                            <td>{indexOfFirstTransaction + index + 1}</td>
                            {paymentIds
                                .filter((payment) => payment.id === trans.payment)
                                .map((payment, index) => (
                                    <React.Fragment key={index}>
                                        <td>{payment.email}</td>
                                        {CourseSelector.courses.filter((course) => course.id == payment.course_id)
                                            .map((course) => (
                                                <td key={course.id}>{course.name}</td>
                                            ))}
                                        <td>{payment.provider_order_id}</td>
                                    </React.Fragment>
                                ))}
                            <td>{trans.timestamp}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination
                itemsPerPage={transactionsPerPage}
                totalItems={filteredTransactions.length}
                paginate={paginate}
                currentPage={currentPage}
            />
        </div>
    );
};

export default AdminDashboard;