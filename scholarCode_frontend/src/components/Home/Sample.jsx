import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEnrolledCourses } from '../../Redux/Slices/Userside/EnrolledCoursesSlice'
import { jwtDecode } from 'jwt-decode'
import { fetchCourseDetails } from '../../Redux/Slices/CourseDetailsSlice'
import { fetchMentorCourse } from '../../Redux/Slices/mentorSide/MentorCourseSlice'
import { fetchMentors } from '../../Redux/Slices/MentorsSlice'

const Sample = () => {

    const enrolledCourseSelector = useSelector((state)=>state.EnrolledCourses)
    const userSelector = useSelector((state)=>state.UserToken)
    const CourseSelector = useSelector((state)=>state.Course)
    const MentorSelector = useSelector((state)=>state.Mentors)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchEnrolledCourses(3))
        dispatch(fetchMentors())
        dispatch(fetchCourseDetails(19))
        dispatch(fetchMentorCourse(6))
    },[])
    console.log(MentorSelector.mentors,'mentors')
    console.log(userSelector)
    console.log(CourseSelector,'sd')
    const token=jwtDecode(userSelector.access)
    console.log(token)
    console.log(enrolledCourseSelector.enrolls)
  return (
    <div>Sample</div>
  )
}

export default Sample
