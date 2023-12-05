/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import "./nav.scss";
import image from "../../images/avatar.png";
import { ThemeContext } from "../../context/ThemeContext";
import Login from "../login/Login";
import SignUp from "../signup/SignUp";
const Navi = () => {
  const { state, dispatch, toggleDropdown, handleLogout } =
    useContext(UserContext);
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    state.isLoginPage||state.isSignUpPage?
    document.body.style.overflow = 'hidden'
    :document.body.style.overflow = 'unset'
    
  }, [state.isLoginPage,state.isSignUpPage]);
  return (
    <>
      <div className="navi-container">
        <div className="navi-header">
          <h3>
            <NavLink onClick={()=>dispatch({ type: "selectedCategory", payload: null })} className="navi-link" to="/home/main">
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
            <div onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
              {state.activeUser && state.activeUser.userPicture ? (
                <img
                  src={"http://localhost:3001/" + state.activeUser.userPicture}
                  alt="res"
                />
              ) : (
                <img src={image} alt="res" />
              )}

              {state.isDropdownOpen && state.activeUser && (
                <div className="dropdown-menu">
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
                          toggleDropdown();
                          navigate(`/admin/`);
                        }}
                      >
                        Admin Paneli
                      </li>
                    )}
                    <li
                      onClick={() => {
                        dispatch({ type: "selectedCategory", payload: null });
                          toggleDropdown();
                          navigate(`/home/profile/${state.activeUser.userName}/detail`);
                      }}
                    >
                      Profilim
                    </li>
                    <li
                      onClick={() => {
                        dispatch({ type: "selectedCategory", payload: null });
                          toggleDropdown();
                          navigate(
                          `/home/profile/${state.activeUser.userName}/problems`
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
            <button onClick={()=>dispatch({type:"isLoginPage"})}>
              {/* <NavLink className="navi-link" to="login"> */}
                Giriş Yap
              {/* </NavLink> */}
            </button>
          )}
          
             {state.isLoginPage && <Login/>}
             {state.isSignUpPage && <SignUp/>}
          
         
        </div>
      </div>
      <div className="navi-outlet" >
        <Outlet />
      </div>
    </>
  );
};

export default Navi;
