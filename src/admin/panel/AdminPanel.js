import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import './admin-panel.scss'
const AdminPanel = () => {
  return (
    <>
    <div id='head'>TheCoderPage</div>
    <div id='panel-container'>
      <div id='navi'>
      <ul>
        <li><NavLink to="/admin/users">KULLANICILAR</NavLink></li>
        <li><NavLink to="/admin/problems">PROBLEMLER</NavLink></li>
        <li><NavLink to="/admin/comments">YORUMLAR</NavLink></li>
        <li><NavLink to="/admin/categories">KATEGORİLER</NavLink></li>

      </ul>
      </div>
      <div id='panel-content'>
        <Outlet/>
      </div>
    </div>
    </>
  )
}

export default AdminPanel