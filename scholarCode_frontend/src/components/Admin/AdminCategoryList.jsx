import React, { useEffect, useState } from 'react'
import './AdminCategoryList.css'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux';
import { addNewCategory, fetchCategoryList } from '../../Redux/Slices/CategoryListSlice';
import { Link } from 'react-router-dom';
import Loader from '../Utils/Loader';
import  Row  from 'react-bootstrap/Row';
import  Col  from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { categoryAddInstance } from '../../Axios/AdminServer/AdminServer';



const AdminCategoryList = () => {
  const dispatch = useDispatch()
  const {categories,status,error} = useSelector((state)=>state.Categories)

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  
  // console.log(status)

  
  useEffect(()=>{
    try{

      dispatch(fetchCategoryList())
    }
    catch(error){
      toast.error('Error in listing categories')
    }
    
  },[dispatch])
  
  if (status === "loading") {
    return <Loader />;
  }
  return (
    <div>
        <div className='category-table'>
          <Row>
            <Col sm={10}>
                <h1>Category Management</h1>
            </Col>
            <Col sm={2}>
                <Button className='p-1 text-light' style={{backgroundColor:"#12A98E"}} onClick={()=>setShow(true)} variant='None'>Add Category</Button>
            </Col>
            <AddCategoryModal handleClose={()=>handleClose()} show={show}/>
          </Row>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>id</th>
          <th>Categories</th>
          <th>No. of Courses</th>
          {/* <th>No. of Mentors</th>
          <th>Status</th> */}
          <th>Action</th>
        </tr>
      </thead>
      <tbody >
        {
        categories.map((category,index)=>(
        <tr key={index}>
          <td>{index+1}</td>
          <td>{category.name}</td>
          <td>04</td>
          {/* <td>05</td>
          <td>Active</td> */}
          <td><Link to={`/admin/category/${category.id}/`}><Button className='p-1 m-1 text-light' variant='None' style={{backgroundColor:"#12A98E"}}>View</Button></Link></td>
        </tr>

        ))}
      </tbody>
    </Table>
    </div>
    </div>
  )
}

export default AdminCategoryList


const AddCategoryModal = ({handleClose,show})=> {
  const dispatch = useDispatch()
  const [newCategory, setNewCategory] = useState("")
  const handleChange = (e)=>{
    setNewCategory(e.target.value)
    
  }

  const addCategory = async (e)=>{
    e.preventDefault()
    try{
      const data = {name:newCategory}
      const res = await categoryAddInstance(data)
      console.log(newCategory,res)
      toast.success(`${newCategory} successfully added`)
      dispatch(addNewCategory(data))
      handleClose()
    }catch(error){
      toast.error("Error in adding category",error)
    }
  }
 

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={addCategory}>
          <Modal.Header closeButton className='p-3'>
            <Modal.Title >Add Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form.Group className="mb-3 p-3" controlId="exampleForm.ControlInput1">
                <Form.Label >Category Name</Form.Label>
                <Form.Control
                  type="text"
                  value={newCategory}
                  name='category'
                  onChange={(e)=>handleChange(e)}
                  placeholder="Category"
                  autoFocus
                />
              </Form.Group>
              
          </Modal.Body>
          <Modal.Footer className='p-3'>
            <Button variant="" style={{backgroundColor:"#12A98E"}} className='p-1 text-light' type='submit'>
              Save Changes
            </Button>
            <Button variant="secondary" className='p-1' onClick={handleClose} >
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
