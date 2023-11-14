/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-empty-pattern */
import React, { useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./admin-layout.scss";
import UserContext from "../../context/UserContext";
import { FaHome, FaUsers, FaComments } from "react-icons/fa";
import { MdReportProblem } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { IoSettings } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
const AdminPanel = () => {
  const navigate = useNavigate();
  const {
    state: userState,
    toggleDropdown,
    handleLogout,
  } = useContext(UserContext);
  return (
    <>
      <div className="navi-header">
        <h3 onClick={() => navigate("/admin")}>
          TheCoderPage Administrator Panel
        </h3>

        <img
          onClick={toggleDropdown}
          src="https://media.licdn.com/dms/image/C4D03AQE2WJMTy32AtQ/profile-displayphoto-shrink_200_200/0/1639764302027?e=1704326400&v=beta&t=S3cw8swGln2MV0OR94LgX2l4cHw39_NiXw5Gw1NHf6w"
        />

        {userState.isDropdownOpen && (
          <div onClick={toggleDropdown} className="dropdown-menu">
            <ul>
              <h4>{userState.activeUser.userName}</h4>
              <hr />
              <li onClick={() => navigate(`/home/profile`)}>Profilim</li>
              <li onClick={handleLogout}>Çıkış Yap</li>
            </ul>
          </div>
        )}
      </div>

      <div id="panel-container">
        <div id="navi">
          <ul>
            <NavLink
              className="navlink"
              activeClassName="active"
              to="/admin"
  
            >
              <FaHome />Anasayfa</NavLink>
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
            <NavLink className="navlink" activeClassName="active" to="/admina">
              <IoSettings />
              Site Ayarları
            </NavLink>
            <NavLink onClick={handleLogout} className="navlink" activeClassName="active" to="/admind">
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
