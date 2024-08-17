import React, { useEffect, useState } from 'react';
import { Badge, Col, Row, Table, Form } from 'react-bootstrap';
import DashComp from './utils/DashComp';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMentorCourse } from '../../Redux/Slices/mentorSide/MentorCourseSlice';
import { fetchAllEnrolledCourses } from '../../Redux/Slices/Userside/AllEnrolledCoursesSlice';
import {jwtDecode} from 'jwt-decode';
import { fetchMentorWallet } from '../../Redux/Slices/mentorSide/MentorWalletSlice';
import { fetchMentorTransactions } from '../../Redux/Slices/mentorSide/MentorTransactionSlice';
import Pagination from '../Admin/utils/Pagination';

const MentorDashboard = () => {
    const MentorToken = useSelector((state) => state.MentorToken);
    const access = jwtDecode(MentorToken.access);
    const user_id = access.user_id;
    const MentorCourseSelector = useSelector((state) => state.MentorCourses);
    const EnrolledCourseSelector = useSelector((state) => state.AllEnrolls);
    const WalletSelector = useSelector((state) => state.MentorWallet);
    const TransactionSelector = useSelector((state) => state.MentorTransactions);
    const dispatch = useDispatch();

    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const transactionsPerPage = 10;

    useEffect(() => {
        dispatch(fetchMentorWallet(user_id));
        dispatch(fetchMentorCourse());
        dispatch(fetchAllEnrolledCourses());
    }, [dispatch, user_id]);

    useEffect(() => {
        if (WalletSelector.wallet) {
            dispatch(fetchMentorTransactions(WalletSelector.wallet.id));
        }
    }, [dispatch, WalletSelector.wallet]);

    const courses = Array.isArray(MentorCourseSelector.courses)
  ? MentorCourseSelector.courses.filter((course) => course.mentor === user_id).map((course) => course.id)
  : [];

    const userEnrolls = EnrolledCourseSelector.enrolls?.filter((enroll) => courses.includes(enroll.course.id)) || [];
    const wallet = WalletSelector?.wallet;

    const filteredTransactions = TransactionSelector.transactions?.filter((txn) => txn.mentor_wallet?.id === wallet?.id)
        .filter((txn) => txn.timestamp.toLowerCase().includes(searchQuery.toLowerCase())) || [];

    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const style = {
        position: "absolute",
        left: "350px",
        right: "100px",
        top: "100px",
    };

    return (
        <div style={style}>
            <h2><strong>Mentor Dashboard</strong></h2>
            <Row>
                <Col sm={6}>
                    <DashComp title={'Courses Assigned'} count={courses.length} />
                </Col>
                <Col sm={6}>
                    <DashComp title={'Wallet'} count={wallet?.balance} revenue />
                </Col>
            </Row>
            <Row>
                
                <Col sm={6}>
                    <DashComp title={'User Enrolls'} count={userEnrolls.length} />
                </Col>
            </Row>
            <br />
            <Row className="mx-2 my-2" >
          <Col sm={9}>
            <h3><strong>Transactions</strong></h3>
          </Col>
          <Col sm={3}>
            <Form.Control
              type="text"
              className='p-1'
              placeholder="Search Date"
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
                        <th>Amount</th>
                        <th>Mode of transaction</th>
                        <th>Timestamp</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {currentTransactions
                    .filter((txn)=>txn.amount > 0 )
                    .map((txn, index) => (
                        <tr key={index}>
                            <td>{indexOfFirstTransaction + index + 1}</td>
                            <td>Rs. {txn.amount}</td>
                            <td>{txn.transaction_type}</td>
                            <td>{txn.timestamp}</td>
                            <td><Badge pill bg="success" className='p-1'>Paid</Badge></td>
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



export default MentorDashboard;
