import './App.css'
import { Routes,Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminUserList from './components/Admin/AdminUserList';
import AdminRootLayoot from './Pages/AdminSide/AdminRootLayout';
import AdminCourseList from './components/Admin/AdminCourseList';
import AdminCategoryList from './components/Admin/AdminCategoryList';
import AdminUser from './components/Admin/AdminUser';
import AdminCourse from './components/Admin/AdminCourse';
import AdminMentorList from './components/Admin/AdminMentorList';
import AdminActiveMentor from './components/Admin/AdminActiveMentor';
import AdminRequestMentor from './components/Admin/AdminRequestMentor';
import AdminCategory from './components/Admin/AdminCategory';
import AuthLayout from './Pages/AdminSide/AuthLayout';
import AdminLogin from './components/Admin/AdminLogin';
import LoginMentor from './components/Mentor/LoginMentor';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Courses from './components/Home/Courses';
import Homelayout from './Pages/HomePage/Homelayout';
import Home from './components/Home/Home';
import Mentors from './components/Home/Mentors';
import SignUp from './components/User/SignUp';
import Login from './components/User/Login';
import JoinMentor from './components/Mentor/JoinMentor';
import MentorRootLayout from './Pages/MentorSide/MentorRootLayout';
import MentorReviewList from './components/Mentor/MentorReviewList';
import MentorUserList from './components/Mentor/MentorUserList';
import MentorCoursesList from './components/Mentor/MentorCoursesList';
import MentorCourseDetails from './components/Mentor/MentorCourseDetails';
import MentorProfile from './components/Mentor/MentorProfile';
import MentorReviewDetails from './components/Mentor/MentorReviewDetails';
import SingleCourse from './components/Home/SingleCourse';
import UserProfile from './components/Home/UserProfile';
import Payment from './components/Home/Payment';
import Sample from './components/Home/Sample';
import MentorUser from './components/Mentor/MentorUser';
import Chat from './components/Mentor/Chat';



function App() {
  

  return (
    <>
         <Routes>

          {/* AuthLayout  */}
          <Route element={<AuthLayout/>}>
            <Route path='admin/login/' element={<AdminLogin/>}></Route>
            <Route path='mentor/login/' element={<LoginMentor/>}></Route>
          </Route>
          
          {/* Admin Root Layout */}
          <Route element={<AdminRootLayoot/>}>
            <Route path='/admin/users/' element={<AdminUserList/>}></Route>
            <Route path='/admin/user/:id/' element={<AdminUser/>}></Route>
            <Route path='/admin/mentors/' element={<AdminMentorList/>}></Route>
            <Route path='/admin/mentor/active/:id/' element={<AdminActiveMentor/>}></Route>
            <Route path='/admin/mentor/request/:id/' element={<AdminRequestMentor/>}></Route>
            <Route path='/admin/courses/' element={<AdminCourseList/>}></Route>
            <Route path='/admin/course/:id/' element={<AdminCourse/>}></Route>
            <Route path='/admin/category/' element={<AdminCategoryList/>}></Route>
            <Route path='/admin/category/:id/' element={<AdminCategory/>}></Route>
          </Route>

          {/* Mentor side layout */}
          <Route element={<MentorRootLayout/>}>
            <Route path='/mentor/reviews/' element={<MentorReviewList/>}></Route>
            <Route path='/mentor/review/:id/' element={<MentorReviewDetails/>}></Route>
            <Route path='/mentor/users/' element={<MentorUserList/>}></Route>
            <Route path='/mentor/user/:id' element={<MentorUser/>}></Route>
            <Route path='/mentor/courses/' element={<MentorCoursesList/>}></Route>
            <Route path='/mentor/course/:id/' element={<MentorCourseDetails/>}></Route>
            <Route path='/mentor/profile/' element={<MentorProfile/>}></Route>
            <Route path='/mentor/chat/' element= {<Chat/>}></Route>
          </Route>

          {/* Home page layout */}
          <Route element={<Homelayout/>}>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/mentors/' element={<Mentors/>}></Route>
            <Route path='/courses/' element={<Courses/>}></Route>
            <Route path='/course/:id/' element={<SingleCourse/>}></Route>
            <Route path='/user/signup/' element={<SignUp/>}></Route>
            <Route path='/user/login/' element={<Login/>}></Route>
            <Route path='/user/profile/' element={<UserProfile/>}></Route>
            <Route path='/mentor/join/' element={<JoinMentor/>}></Route>
            <Route path='/payment/' element={<Payment/>}></Route>
            <Route path='/sample/' element={<Sample/>}></Route>
           
            
          </Route>
          


          
        </Routes>

        
        <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App
