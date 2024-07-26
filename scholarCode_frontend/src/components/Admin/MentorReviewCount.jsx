import React, { useCallback, useEffect, useState } from 'react'
import { Badge, Button, Card, Modal, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addTransaction, fetchMentorTransactions } from '../../Redux/Slices/mentorSide/MentorTransactionSlice'
import { fetchMentorWallet, patchWallet } from '../../Redux/Slices/mentorSide/MentorWalletSlice'
import { MentorWalletPatch } from '../../Axios/MentorServer/MentorServer'
import { toast } from 'react-toastify'

const MentorReviewCount = ({mentor_id}) => {

  const WalletSelector = useSelector((state)=>state.MentorWallet)
  const TransactionSelector = useSelector((state)=>state.MentorTransactions)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchMentorWallet(mentor_id))
    const wallet_id = WalletSelector && WalletSelector.wallet.id
    dispatch(fetchMentorTransactions(wallet_id))  
  },[dispatch])

  const wallet = WalletSelector?.wallet

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formData = {
    mentor : mentor_id,
    review_count :0,
    amount : 300,
    status :'completed'
  }

  

  return (
    <div>
      {/* {!wallet.status === 'pending' && */}  
      <div>
        <Card style={{ width: '18rem', backgroundColor:'#BCFFDB' }} className='p-2 text-center w-100 h-100 my-3 py-3' >
          <Card.Body>
            <Card.Title><strong> Mentor Wallet</strong></Card.Title>
            {/* <br /> */}
            <Card.Text>
              <h6>Mentor Balance Review Count : {formData.review_count}Nos</h6>
              <h6>Mentor Payment Balance : Rs {formData.amount} </h6>
              <h6>Payment Status :  <Badge pill bg="primary" className='p-1'>Pending</Badge></h6>
              <Button className='p-1 text-light' style={{backgroundColor:'#12A98E'}} variant='' onClick={handleShow}>Already Paid?</Button>
            </Card.Text>
            
          </Card.Body>
        </Card>
        <PaymentModal handleClose={handleClose} show={show}  wallet = {WalletSelector.wallet} formData={formData}/>
    </div>
    {/* }  */}
    <div>

        <Table striped bordered hover className='text-center'>
      <thead>
        <tr>
          <th>id</th>
          <th>Amount</th>
          <th>Transaction Type</th>
          <th>Timestamp</th>
          <th>status</th>
          {/* <th>Action</th> */}
        </tr>
      </thead>
      <tbody >
        {TransactionSelector.transactions && TransactionSelector.transactions
        // .sort((a,b)=>a.timestamp - b.timestamp)
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
    </div>
  )
}

export default MentorReviewCount

function PaymentModal({show,handleClose, wallet,formData}) {
  const dispatch = useDispatch()
  const handleSubmit = useCallback(async()=>{
    try{
      const res = await MentorWalletPatch(wallet.mentor,formData)
      if (res.wallet.id ){
        toast.success('Confirmed Payment')
        dispatch(addTransaction(res.transaction))
        dispatch(patchWallet(res.wallet))
        handleClose()
      }
      console.log(res,'loii')
    }
    catch(error){
      console.log(error,'kloi')
    }
  },[formData])

  

  return (
    <>
  
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton className='p-3'>
          <Modal.Title >Confirm Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body className='p-3'>
          Are you sure that you had made this payment?
        </Modal.Body>
        <Modal.Footer className='p-3'>
          <Button variant="secondary" className='p-1' onClick={handleClose}>
            Close
          </Button>
          <Button variant=""  className='p-1 text-light' style={{backgroundColor:'#12A98E'}} onClick={handleSubmit} >Confirm</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}