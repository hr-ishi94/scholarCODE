import React from 'react'
import AdminNavBar from '../../components/Admin/AdminNavBar'
import AsideMenu from '../../components/Admin/AsideMenu'
import AdminCourseList from '../../components/Admin/AdminCourseList'

const AdminCourseManagement = () => {
  return (
    <div>
        <AdminNavBar/>
        <AsideMenu/>
        <AdminCourseList/>
    </div>
  )
}

export default AdminCourseManagement