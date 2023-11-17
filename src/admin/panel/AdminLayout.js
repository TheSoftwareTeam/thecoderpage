/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-empty-pattern */
import React, { useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./admin-layout.scss";
import UserContext from "../../context/UserContext";
import { FaHome, FaUsers, FaComments } from "react-icons/fa";
import { MdReportProblem,MdContactMail } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { IoSettings,IoNewspaperSharp ,IoLogOut} from "react-icons/io5";
import image from "../../images/avatar.png";
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
          TheCoderPage <h5>Administrator Panel</h5>
        </h3>

        {
                    userState.activeUser &&
                    userState.activeUser.userPicture ? (
                      <img
                      onClick={toggleDropdown}
                        src={
                          "http://localhost:3001/" +
                          userState.activeUser.userPicture
                        }
                        alt="res"
                      />
                    )
                  : (
                    <img onClick={toggleDropdown} src={image} alt="res" />
                  )}

        {userState.isDropdownOpen && (
          <div onClick={toggleDropdown} className="dropdown-menu">
            <ul>
              <h4>{userState.activeUser.userName}</h4>
              <hr />
              <li
                onClick={() =>
                  navigate(`/admin/userdetail/${userState.activeUser.id}`)
                }
              >
                Profilim
              </li>
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
              to="/admin/categori"
            >
             <IoNewspaperSharp />
              Şikayetler
            </NavLink>
            <NavLink
              className="navlink"
              activeClassName="active"
              to="/admin/categor"
            >
          <MdContactMail />
              İletişim Formları
            </NavLink>
            <NavLink className="navlink" activeClassName="active" to="/admina">
              <IoSettings />
              Site Ayarları
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