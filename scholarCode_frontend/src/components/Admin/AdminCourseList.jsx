import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import './AdminCourseList.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoursesList } from '../../Redux/Slices/CoursesListSlice';
import { Link } from 'react-router-dom';
import Loader from '../Utils/Loader';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toast } from 'react-toastify';
import Pagination from './utils/Pagination';

const AdminCourseList = () => {
  const dispatch = useDispatch();
  const { courses, status } = useSelector((state) => state.Courses);
  const categorySelector = useSelector((state) => state.Categories);

  const [show, setShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 10;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(fetchCoursesList());
  }, [dispatch]);

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const sortedCourses = [...currentCourses].sort((a, b) => a.id - b.id);


  if (status === 'loading') {
    return <Loader />;
  }


  return (
    <>
      <div className="course-table">
        <Row>
          <Col sm={10}>
            <h1>Course Management</h1>
          </Col>
          <Col sm={2}>
            <Button onClick={handleShow} className="p-1 text-light" variant="" style={{ backgroundColor: '#12A98E' }}>
              Add new Course
            </Button>
          </Col>
        </Row>

        <Row className="mx-2 my-2" >
          <Col sm={9}>
          </Col>
          <Col sm={3}>
            <Form.Control
              type="text"
              placeholder="Search Courses"
              value={searchQuery}
              onChange={(e) => {setSearchQuery(e.target.value);
                setCurrentPage(1);}}
            />
          </Col>
        </Row>

        <AddCourseModal handleClose={handleClose} show={show} />

        <Table striped bordered hover className="text-center">
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Category</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedCourses.map((course, index) => (
              <tr key={index}>
                <td>{indexOfFirstCourse + index + 1}</td>
                <td>{course.name}</td>
                {categorySelector.categories
                  .filter((category) => category.id === course.category)
                  .map((category) => (
                    <td key={category.id}>{category.name}</td>
                  ))}
                <td>{course.status ? <span className="text-success">Active</span> : <span className="text-danger">Inactive</span>}</td>
                <td>
                  <Link to={`/admin/course/${course.id}/`}>
                    <Button className="p-1 m-1 text-light" style={{ backgroundColor: '#12A98E' }} variant="">
                      View
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Pagination
          itemsPerPage={coursesPerPage}
          totalItems={filteredCourses.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};




export default AdminCourseList;




const AddCourseModal = ({handleClose,show})=> {

  const [newCourse,SetNewCourse] = useState({
    name:"",
    description:"",
    category:null,
    price:"",
    thumbnail:null,
    status:true
  })

  

  const handleChange = (e)=>{
    const {name,value} = e.target
      SetNewCourse((prevData)=>({
        ...prevData,
        [name]:value,
      }))
    
  }
  const {categories,status,error} = useSelector((state)=>state.Categories)
  const dispatch = useDispatch()

  const handleSubmit = async(e)=>{
    e.preventDefault()
    
    const isFormValid = Object.values(newCourse).every((value)=>{
      if (typeof value === 'string'){
        return value.trim() !==""
      }
      return true
    })

    
    if (isFormValid){

        const res = await coursesAddInstance(newCourse)
        if (res.id){
          
          dispatch(addCourse(newCourse))
          toast.success("Course added successfully")
          handleClose()
        }else if (res.response.data){
          for (const key in res.response.data){
            toast.error(`${key}:${res.response.data[key][0]}`)
          }

        }
    }else{
      toast.error("All fields required")
    }
   
  }

  const handleFileChange = (e)=>{
    const file = e.target.files[0]
    console.log(file,'lll')  
    SetNewCourse((prevData)=>({
      ...prevData,
      thumbnail:e.target.files[0]
    }))

  }

  


  return (
    <>
      <Modal show={show} onHide={handleClose}  >
        <Form onSubmit={handleSubmit} action='/upload'encType='multipart/form-data'>
          <Modal.Header closeButton className='p-3'>
            <Modal.Title >Add new course</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form.Group className="mb-3 p-3" controlId="exampleForm.ControlInput1">
                <Form.Label >Course Name</Form.Label>
                <Form.Control
                  type="text"
                  value={newCourse.name}
                  name='name'
                  onChange={(e)=>handleChange(e)}
                  placeholder="Course"
                  autoFocus
                />
              </Form.Group>

              <Form.Group className="mb-3 p-3" controlId="exampleForm.ControlInput1">
                <Form.Label >Course Description</Form.Label>
                <Form.Control
                  as="textarea"
                  value={newCourse.description}
                  rows={3}
                  name='description'
                  onChange={(e)=>handleChange(e)}
                  placeholder="Course Description"
                  autoFocus
                />
              </Form.Group>

              <Form.Group className="mb-3 p-3" >
                <Form.Label >Category</Form.Label>
                  <Form.Select aria-label="Default select example" value={newCourse.category} name='category' 
                  onChange={(e)=>handleChange(e)} >
                    <option >select any category</option>
                    {categories.map((category)=>(
                      <option key={category.id} id={category.id} value={category.id} >{category.name}</option>

                    ))}
                  </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3 p-3" controlId="exampleForm.ControlInput1">
                <Form.Label >Price</Form.Label>
                <Form.Control
                  type="text"
                  value={newCourse.price}
                  name='price'
                  onChange={(e)=>handleChange(e)}
                  placeholder="price"
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3 p-3">
                <Form.Label >Course Thumbnail</Form.Label>
                <Form.Control accept='image/png, image/jpeg' id='image' type="file" name='thumbnail' onChange={(e)=>handleFileChange(e)} />
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
