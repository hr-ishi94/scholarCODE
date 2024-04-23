import React from 'react'
import AdminNavBar from '../../components/Admin/AdminNavBar'
import AdminMentorList from '../../components/Admin/AdminMentorList'
import AsideMenu from '../../components/Admin/AsideMenu'

const AdminMentorManagement = () => {
  return (
    <>
    <AdminNavBar/>
    <AsideMenu/>
    <AdminMentorList/>
    </>
  )
}

export default AdminMentorManagement