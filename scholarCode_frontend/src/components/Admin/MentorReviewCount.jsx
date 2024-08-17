import React, { useCallback, useEffect, useState,useMemo } from 'react'
import { Badge, Button, Card, Modal, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addTransaction, fetchMentorTransactions } from '../../Redux/Slices/mentorSide/MentorTransactionSlice'
import { clearWallet, fetchMentorWallet, patchWallet } from '../../Redux/Slices/mentorSide/MentorWalletSlice'
import { MentorWalletPatch } from '../../Axios/MentorServer/MentorServer'
import { toast } from 'react-toastify'
import Decimal from 'decimal.js'

const MentorReviewCount = ({ mentor_id }) => {
  const WalletSelector = useSelector((state) => state.MentorWallet);
  const TransactionSelector = useSelector((state) => state.MentorTransactions);
  const dispatch = useDispatch();

  useEffect(() => {
    if (mentor_id) {
      dispatch(fetchMentorWallet(mentor_id));
    }
  }, [dispatch, mentor_id]);

  useEffect(() => {
    const wallet_id = WalletSelector?.wallet?.id;
    if (wallet_id) {
      dispatch(fetchMentorTransactions(wallet_id));
    }
  }, [dispatch, WalletSelector]);

  const wallet = WalletSelector?.wallet;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const reviewCount = wallet?.review_count || "0";
  const balanceValue = wallet?.balance || '0';

  const amount = useMemo(() => new Decimal(300).times(reviewCount), [reviewCount]);
  const balance = useMemo(() => new Decimal(balanceValue).plus(amount), [balanceValue, amount]);

  const formData = useMemo(() => ({
    id: wallet?.id || '',
    mentor: mentor_id,
    review_count: 0,
    amount: amount.toFixed(2),
    balance: balance.toFixed(2),
    status: 'completed',
  }), [wallet?.id, mentor_id, amount, balance]);

  return (
    <div>
      {wallet?.status === 'pending' && (
        <div>
          <Card style={{ width: '18rem', backgroundColor: '#BCFFDB' }} className='p-2 text-center w-100 h-100 my-3 py-3'>
            <Card.Body>
              <Card.Title><strong>Mentor Wallet</strong></Card.Title>
              <Card.Text>
                <h6>Mentor Balance Review Count: {wallet.review_count} nos</h6>
                {
                  amount >0 && 
                <h5>Mentor Payment Balance: Rs {amount.toFixed(2)} /-</h5>
                }
                <h6>Mentor Wallet: Rs {balance.toFixed(2)} /-</h6>
                {amount > 0 && (
                  <>
                    <h6>Payment Status: <Badge pill bg="primary" className='p-1'>Pending</Badge></h6>
                    <Button className='p-1 text-light' style={{ backgroundColor: '#12A98E' }} variant='' onClick={handleShow}>
                      Already Paid?
                    </Button>
                  </>
                )}
              </Card.Text>
            </Card.Body>
          </Card>
          <PaymentModal handleClose={handleClose} show={show} wallet={wallet} formData={formData} />
        </div>
      )}
      <div>
        <h4>Transactions</h4>
        <Table striped bordered hover className='text-center'>
          <thead>
            <tr>
              <th>id</th>
              <th>Amount</th>
              <th>Transaction Type</th>
              <th>Timestamp</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {TransactionSelector.transactions && TransactionSelector.transactions
              .filter((txn) => txn.mentor_wallet.id === wallet?.id && txn.amount >0)
              .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
              .slice(0, 10)
              .map((txn, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>Rs. {txn.amount}</td>
                  <td>{txn.transaction_type}</td>
                  <td>{txn.timestamp}</td>
                  <td><Badge pill bg="success" className='p-1'>Paid</Badge></td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default MentorReviewCount;

function PaymentModal({ show, handleClose, wallet, formData }) {
  const dispatch = useDispatch();

  const handleSubmit = useCallback(async () => {
    try {
      const res = await MentorWalletPatch(wallet.mentor, formData);
      if (res.wallet.id) {
        toast.success('Confirmed Payment');
        dispatch(addTransaction(res.transaction));
        dispatch(patchWallet(res.wallet));
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, formData, wallet.mentor, handleClose]);

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton className='p-3'>
        <Modal.Title>Confirm Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body className='p-3'>
        Are you sure that you had made this payment?
      </Modal.Body>
      <Modal.Footer className='p-3'>
        <Button variant="secondary" className='p-1' onClick={handleClose}>
          Close
        </Button>
        <Button variant="" className='p-1 text-light' style={{ backgroundColor: '#12A98E' }} onClick={handleSubmit}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
