import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./admin-panel.scss";
const AdminPanel = () => {
  return (
    <>
      <div id="head">
        <h3>
          <NavLink className="navi-link" to="/home/main">
            TheCoderPage
          </NavLink>
        </h3>
      </div>
      <div id="panel-container">
        <div id="navi">
          <ul>
            <li>
              <NavLink to="/admin/users">Kullanıcılar</NavLink>
            </li>
            <li>
              <NavLink to="/admin/problems">Problemler</NavLink>
            </li>
            <li>
              <NavLink to="/admin/comments">Yorumlar</NavLink>
            </li>
            <li>
              <NavLink to="/admin/categories">Kategoriler</NavLink>
            </li>
          </ul>
        </div>
        <div id="panel-content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
