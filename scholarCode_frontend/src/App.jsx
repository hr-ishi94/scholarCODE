import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './Pages/HomePage/HomePage';
import UserSignUp from './Pages/HomePage/UserSignUp';
import UserLogin from './Pages/HomePage/UserLogin';
import MentorsList from './Pages/HomePage/MentorsList';
import MentorJoinPage from './Pages/HomePage/MentorJoinPage';
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



function App() {
  

  return (
    <>
      <BrowserRouter>
         <Routes>

          {/* Admin Root Layout */}
          <Route element={<AdminRootLayoot/>}>
            <Route path='/admin/courses/' element={<AdminCourseList/>}></Route>
            <Route path='/admin/category/' element={<AdminCategoryList/>}></Route>
            <Route path='/admin/category/id/' element={<AdminCategory/>}></Route>
            <Route path='/admin/users/' element={<AdminUserList/>}></Route>
            <Route path='/admin/user/:id/' element={<AdminUser/>}></Route>
            <Route path='/admin/course/id/' element={<AdminCourse/>}></Route>
            <Route path='/admin/mentors/' element={<AdminMentorList/>}></Route>
            <Route path='/admin/mentor/active/:id/' element={<AdminActiveMentor/>}></Route>
            <Route path='/admin/mentor/request/:id/' element={<AdminRequestMentor/>}></Route>
          </Route>
          
          {/* AuthLayout  */}
          <Route element={<AuthLayout/>}>
            <Route path='admin/login/' element={<AdminLogin/>}></Route>
            <Route path='mentor/login/' element={<LoginMentor/>}></Route>
          </Route>
          
          
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/mentors/' element={<MentorsList/>}></Route>
          <Route path='/user/signup/' element={<UserSignUp/>}></Route>
          <Route path='/user/login/' element={<UserLogin/>}></Route>
          <Route path='/mentor/join/' element={<MentorJoinPage/>}></Route>


          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
