import { useState ,React, useCallback} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { enrollPut } from '../../Redux/Slices/Userside/EnrolledCoursesSlice';
import { EnrollPatch, EnrollPut } from '../../Axios/UserServer/UserServer';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { enrollPatch } from '../../Redux/Slices/Userside/AllEnrolledCoursesSlice';

const ReviewExtendModal = ({show,handleClose,course, currentDate}) => {
    const [currDate, setcurrDate] = useState(course.next_review_date)
    const handleChange = (e)=>{
        const{ name, value } = e.target 
        setcurrDate(value)
    }
    const dispatch = useDispatch()
    const handleSubmit = async()=>{
        try {
            const formdata = {
              id:course.id,
              next_review_date : currDate
            }
            const res = await EnrollPatch(course.user.id,formdata)
            
            const payload = {
                enroll_id : course.id,
                formData: {
                  ...course,
                  next_review_date : currDate
                }
            }

            // console.log(res.data,'loooo')
            dispatch(enrollPatch(payload))
            toast.success('Review extended Successfully')
            handleClose()

        }catch(error){
            console.log('error',error)
        }
        
    }
    
    return (
    <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton className='p-3'>
          <Modal.Title className='p-2'>Extend Review</Modal.Title>
        </Modal.Header>
        <Modal.Body className='p-3'>
            
            Extend review to : 
            <input type="date" name="next_review_date" id="" value={currDate}  onChange={handleChange} min={currentDate}/>
        
        
        </Modal.Body>
        <Modal.Footer className='p-3'>
          <Button variant="secondary" className='p-1' onClick={handleClose}>
            Close
          </Button>
          <Button variant="" className='p-1 text-light' style={{backgroundColor:'#12A98E'}} onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>  
  )
}

export default ReviewExtendModal