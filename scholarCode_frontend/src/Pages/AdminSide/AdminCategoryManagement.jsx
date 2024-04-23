import React from 'react'
import AdminNavBar from '../../components/Admin/AdminNavBar'
import AsideMenu from '../../components/Admin/AsideMenu'
import AdminCategoryList from '../../components/Admin/AdminCategoryList'

const AdminCategoryManagement = () => {
  return (
    <>
        <AdminNavBar/>
        <AdminCategoryList/>
        <AsideMenu/>
    </>
  )
}

export default AdminCategoryManagement