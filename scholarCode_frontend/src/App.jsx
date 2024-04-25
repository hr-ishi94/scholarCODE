import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './Pages/HomePage/HomePage';
import UserSignUp from './Pages/HomePage/UserSignUp';
import UserLogin from './Pages/HomePage/UserLogin';
import MentorsList from './Pages/HomePage/MentorsList';
import MentorLogin from './Pages/MentorSide/MentorLogin';
import AdminLogin from './Pages/AdminSide/AdminLogin';
import MentorJoinPage from './Pages/HomePage/MentorJoinPage';
import AdminUserManagement from './Pages/AdminSide/AdminUserManagement';
import AdminCourseManagement from './Pages/AdminSide/AdminCourseManagement';
import AdminCategoryManagement from './Pages/AdminSide/AdminCategoryManagement';
import AdminUserList from './components/Admin/AdminUserList';
import AdminMentorManagement from './Pages/AdminSide/AdminMentorManagement';
import AdminActiveMentorDetails from './Pages/AdminSide/AdminActiveMentorDetails';
import AdminMentorRequestDetails from './Pages/AdminSide/AdminMentorRequestDetails';
import AdminUserDetails from './Pages/AdminSide/AdminUserDetails';
import AdminCategoryView from './Pages/AdminSide/AdminCategoryView';
import AdminCourseView from './Pages/AdminSide/AdminCourseView';

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/mentors/' element={<MentorsList/>}></Route>
          <Route path='/user/signup/' element={<UserSignUp/>}></Route>
          <Route path='/user/login/' element={<UserLogin/>}></Route>
          <Route path='/mentor/login/' element={<MentorLogin/>}></Route>
          <Route path='/admin/login/' element={<AdminLogin/>}></Route>
          <Route path='/mentor/join/' element={<MentorJoinPage/>}></Route>
          <Route path='/admin/users/' element={<AdminUserManagement/>}></Route>
          <Route path='/admin/user/:id' element={<AdminUserDetails/>}></Route>
          <Route path='/admin/courses/' element={<AdminCourseManagement/>}></Route>
          <Route path='/admin/course/id/' element={<AdminCourseView/>}></Route>
          <Route path='/admin/mentors/' element={<AdminMentorManagement/>}></Route>
          <Route path='/admin/mentor/active/:id/' element={<AdminActiveMentorDetails/>}></Route>
          <Route path="/admin/mentor/request/:id/" element={<AdminMentorRequestDetails />}></Route>
          <Route path='/admin/category/' element={<AdminCategoryManagement/>}></Route>
          <Route path='/admin/category/id/' element={<AdminCategoryView/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
