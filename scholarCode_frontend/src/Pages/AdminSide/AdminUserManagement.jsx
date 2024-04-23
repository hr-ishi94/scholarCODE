import React from 'react'
import AdminNavBar from '../../components/Admin/AdminNavBar'
import AsideMenu from '../../components/Admin/AsideMenu'
import AdminUserList from '../../components/Admin/AdminUserList'

const AdminUserManagement = () => {
  return (
    <>
        <AdminNavBar/>
        <AsideMenu/>
        <AdminUserList/>
    </>
  )
}

export default AdminUserManagement