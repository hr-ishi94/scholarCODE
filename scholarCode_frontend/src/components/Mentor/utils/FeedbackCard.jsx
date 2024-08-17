import { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import avatar from '../../../assets/avatar.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../../Redux/Slices/UserListSlice';
import { fetchCoursesList } from '../../../Redux/Slices/CoursesListSlice';

function FeedbackCard({feedbacks}) {
    const UserSelector = useSelector((state)=>state.userList)
    const CoursesSelector = useSelector((state)=>state.Courses)
    const dispatch = useDispatch()

    useEffect(()=>{
    dispatch(fetchUsers())
    dispatch(fetchCoursesList())  
    },[dispatch])

  return (
    <div className='d-flex flex-row justify-content-between mx-5'>
    {feedbacks?.map((feedback) => (
      <Card sx={{ maxWidth: 300 }} className="p-2 ">
        <CardActionArea>
          <CardMedia
            component="img"
            image={avatar}
            alt="green iguana"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              " <em>{feedback.feedback_text}</em> "
            </Typography>
            <br />
            <Typography gutterBottom variant="h6" component="div">
               {CoursesSelector.courses
                .filter((course) => course.id === feedback.course.course)
                .map((crs) => crs.name)
                .join(", ") || feedback.course.course}  {/* Combined fix */}
            </Typography>
            <span
            className='start'
            style=
            {{
              cursor: 'pointer',
              color: 'gold',
              fontSize: `35px`,
            }}
            
          >
            {Array.from({ length: feedback.rating }, (_, index) => (
    <span key={index}>★</span>
  ))}
          </span>
            <p><em>- {UserSelector.users
                .filter((usr) => usr.id === feedback.user)
                .map((user) => user.first_name)
                .join(", ") || feedback.user} </em></p>
          </CardContent>
        </CardActionArea>
      </Card>
    ))}
  </div>
  );
}

export default FeedbackCard
