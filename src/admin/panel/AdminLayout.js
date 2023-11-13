/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-empty-pattern */
import React, { useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./admin-layout.scss";
import UserContext from "../../context/UserContext";
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
              <NavLink className="navlink" to="/admin">ANASAYFA</NavLink>
              <NavLink className="navlink" to="/admin/problems">PROBLEMLER</NavLink>
              <NavLink className="navlink" to="/admin/users">KULLANICILAR</NavLink>
              <NavLink className="navlink" to="/admin/comments">YORUMLAR</NavLink>
              <NavLink className="navlink" to="/admin/categories">KATEGORİLER</NavLink>
              <NavLink className="navlink" to="/admin">SİTE AYARLARI</NavLink>
            
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
