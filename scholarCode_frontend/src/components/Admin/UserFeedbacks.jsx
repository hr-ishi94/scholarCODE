import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import avatar from '../../assets/avatar.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../Redux/Slices/UserListSlice';
import { fetchCoursesList } from '../../Redux/Slices/CoursesListSlice';
import { userFeedbacks } from '../../Axios/UserServer/UserServer';

const UserFeedbacks = () => {
    const UserSelector = useSelector((state)=>state.userList)
    const CoursesSelector = useSelector((state)=>state.Courses)
    const dispatch = useDispatch()
    const [feedbacks, setFeedbacks] = useState([])
    useEffect(()=>{
        const fetchFeedbacks = async ()=>{
            try{        
                const res = await userFeedbacks()
                setFeedbacks(res)
            }catch(error){
                console.log('Failed to fetch feedbacks',error)
            }
        }
    fetchFeedbacks()
        },[]) 

    useEffect(()=>{
    dispatch(fetchUsers())
    dispatch(fetchCoursesList())  
    },[dispatch])
    const style = {
        position: "absolute",
        left: "350px",
        right: "100px",
        top: "100px",
    };

  return (
    <div style={style}>
  <h2>User Feedbacks</h2>
  <div className="d-flex flex-wrap justify-content-start mx-2">
    {feedbacks?.map((feedback, index) => (
      <Card key={index} sx={{ maxWidth: 200 }} className="p-1 mx-3">
        <CardActionArea>
          <CardMedia
            component="img"
            image={avatar}
            alt="User Avatar"
            sx={{ width: '50px', height: '50px', borderRadius: '50%', margin: '0 auto' }} // Set size and center the avatar
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              "<em>{feedback.feedback_text}</em>"
            </Typography>
            <Typography gutterBottom variant="subtitle1" component="div">
              {CoursesSelector.courses
                .filter((course) => course.id === feedback.course.course)
                .map((crs) => crs.name)
                .join(", ") || feedback.course.course}
            </Typography>
            <span
              className="start"
              style={{
                cursor: 'pointer',
                color: 'gold',
                fontSize: '25px',
              }}
            >
              {Array.from({ length: feedback.rating }, (_, index) => (
                <span key={index}>★</span>
              ))}
            </span>
            <p>
              <em>
                - {UserSelector.users
                  .filter((usr) => usr.id === feedback.user)
                  .map((user) => user.first_name)
                  .join(", ") || feedback.user}
              </em>
            </p>
          </CardContent>
        </CardActionArea>
      </Card>
    ))}
  </div>
</div>

  );
}

export default UserFeedbacks