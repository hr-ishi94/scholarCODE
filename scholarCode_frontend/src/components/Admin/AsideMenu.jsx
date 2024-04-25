import React from 'react'
import './AsideMenu.css'
import { Link } from 'react-router-dom'

const AsideMenu = () => {
  return (
    <div className='aside-admin py-1'>
        <Link className="react-router-link text-dark"><h2 className='aside-content'>Dashboard</h2></Link>
        <Link to={'/admin/users/'} className="react-router-link text-dark"><h2 className='aside-content'>Users</h2></Link>
        <Link to={'/admin/mentors/'} className="react-router-link text-dark"><h2 className='aside-content'>Mentors</h2></Link>
        <Link to={'/admin/courses/'} className="react-router-link text-dark"><h2 className='aside-content'>Courses</h2></Link>
        <Link to={'/admin/category/'} className="react-router-link text-dark"><h2 className='aside-content'>Categories</h2></Link>
        <Link className="react-router-link text-dark"><h2 className='aside-content'>Reviews</h2></Link>
    </div>
  )
}

export default AsideMenu