/* eslint-disable jsx-a11y/alt-text */
import React, { useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import "./nav.scss";
import image from "../../images/avatar.png";
import { ThemeContext } from "../../context/ThemeContext";
const Navi = () => {
  const { state, dispatch, toggleDropdown, handleLogout } =
    useContext(UserContext);
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  return (
    <>
      <div className="navi-container">
        <div className="navi-header">
          <h3>
            <NavLink className="navi-link" to="/home/main">
              TheCoderPage
            </NavLink>
          </h3>
          <button
            className={darkMode ? "darkMode" : "lightMode"}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "Light" : "Dark"} mode
          </button>

          {localStorage.getItem("userToken") !== null ? (
            <div>
              {state.activeUser && state.activeUser.userPicture ? (
                <img
                  onClick={toggleDropdown}
                  src={"http://localhost:3001/" + state.activeUser.userPicture}
                  alt="res"
                />
              ) : (
                <img onClick={toggleDropdown} src={image} alt="res" />
              )}

              {state.isDropdownOpen && (
                <div onClick={toggleDropdown} className="dropdown-menu">
                  <ul>
                    <h5>
                      {state.activeUser.name} {state.activeUser.surName}
                    </h5>
                    <h5>{state.activeUser.email}</h5>

                    <hr />
                    {state.activeUser.userRol === "admin" && (
                      <li
                        onClick={() => {
                          dispatch({ type: "selectedCategory", payload: null });
                          navigate(`/admin/`);
                        }}
                      >
                        Admin Paneli
                      </li>
                    )}
                    <li
                      onClick={() => {
                        dispatch({ type: "selectedCategory", payload: null });
                        navigate(`/home/profile`);
                      }}
                    >
                      Profilim
                    </li>
                    <li
                      onClick={() => {
                        dispatch({ type: "selectedCategory", payload: null });
                        navigate(
                          `/home/userproblems/${state.activeUser.userName}`
                        );
                      }}
                    >
                      Problemlerim
                    </li>
                    <li onClick={handleLogout}>Çıkış Yap</li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <button>
              <NavLink className="navi-link" to="login">
                Giriş Yap
              </NavLink>
            </button>
          )}
        </div>
      </div>
      <div className="navi-outlet">
        <Outlet />
      </div>
    </>
  );
};

export default Navi;
