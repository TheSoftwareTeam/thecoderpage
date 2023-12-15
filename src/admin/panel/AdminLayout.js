/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-empty-pattern */
import React, { useContext, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./admin-layout.scss";
import { FaHome, FaUsers, FaComments } from "react-icons/fa";
import { MdReportProblem } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { IoSettings, IoNewspaperSharp, IoLogOut } from "react-icons/io5";
import image from "../../images/avatar.png";
import AdminContext from "../../context/AdminContext";
const AdminPanel = () => {
  const navigate = useNavigate();
  
  const { state,roleControl,handleLogout, getUsers,getActiveUser, getCategory, getProblem,toggleDropdown } =
    useContext(AdminContext);

  useEffect(() => {
  if(localStorage.getItem("userToken")===null){
    navigate("/");
  }
  else{
    roleControl();
    getActiveUser()
    getUsers();
    getCategory();
    getProblem();
  } 
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    localStorage.getItem("userToken")===null&& <>
      <div className="navi-header">
        <h3 onClick={() => navigate("/admin")}>
          TheCoderPage <h5>Administrator Panel</h5>
        </h3>
        <div
          id="navi-context"
          onMouseEnter={toggleDropdown}
          onMouseLeave={toggleDropdown}
        >
          {state.activeUser && state.activeUser.userPicture ? (
            <img
              src={"http://localhost:3001/" + state.activeUser.userPicture}
              alt="res"
            />
          ) : (
            <img src={image} alt="res" />
          )}

          {state.activeUser && state.isDropdownOpen && (
            <div className="dropdown-menu">
              <ul>
                <h4>{state.activeUser.userName}</h4>
                <hr />
                <li
                  onClick={() => {
                    toggleDropdown();
                    navigate(`/admin/userdetail/${state.activeUser.userName}`);
                  }}
                >
                  Profilim
                </li>
                <li onClick={handleLogout}>Çıkış Yap</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div id="panel-container">
        <div id="navi">
          <ul>
            <NavLink
              className="navlink"
              activeClassName="active"
              to="/admin/"
              exact
            >
              <FaHome />
              Anasayfa
            </NavLink>
            <NavLink
              className="navlink"
              activeClassName="active"
              to="/admin/problems"
            >
              <MdReportProblem />
              Problemler
            </NavLink>
            <NavLink
              className="navlink"
              activeClassName="active"
              to="/admin/users"
            >
              <FaUsers />
              Kullanıcılar
            </NavLink>
            <NavLink
              className="navlink"
              activeClassName="active"
              to="/admin/comments"
            >
              <FaComments />
              Yorumlar
            </NavLink>
            <NavLink
              className="navlink"
              activeClassName="active"
              to="/admin/categories"
            >
              <BiSolidCategoryAlt />
              Kategoriler
            </NavLink>
            <NavLink
              className="navlink"
              activeClassName="active"
              to="/admin/complaints"
            >
              <IoNewspaperSharp />
              Şikayetler
            </NavLink>

            <NavLink
              className="navlink"
              activeClassName="active"
              to="/"
            >
              <IoSettings />
              Siteyi Görüntüle
            </NavLink>
            <NavLink
              onClick={handleLogout}
              className="navlink"
              activeClassName="active"
              to="/admind"
            >
              <IoLogOut />
              Oturumu Kapat
            </NavLink>
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
