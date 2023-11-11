/* eslint-disable jsx-a11y/alt-text */
import React, { useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import "./nav.scss";

const Navi = () => {
  const { state, dispatch,toggleDropdown,handleLogout } = useContext(UserContext);
  const navigate = useNavigate();

 
  return (
    <>
      <div className="navi-container">
        <div className="navi-header">
          <h3>
            <NavLink className="navi-link" to="/home/main">
              TheCoderPage
            </NavLink>
          </h3>
          {localStorage.getItem("userToken") !== null ? (
            <div>
              <img
                onClick={toggleDropdown}
                src="https://media.licdn.com/dms/image/C4D03AQE2WJMTy32AtQ/profile-displayphoto-shrink_200_200/0/1639764302027?e=1704326400&v=beta&t=S3cw8swGln2MV0OR94LgX2l4cHw39_NiXw5Gw1NHf6w"
              />

              {state.isDropdownOpen && (
                <div onClick={toggleDropdown} className="dropdown-menu">
                  <ul>
                    <h5>
                      {state.activeUser.name} {state.activeUser.surName}
                    </h5>
                    <h5>{state.activeUser.email}</h5>

                    <hr />
                    {state.activeUser.userRol === "admin" && (
                      <li onClick={() => navigate(`/admin`)}>Admin Paneli</li>
                    )}
                    <li onClick={() => navigate(`/home/profile`)}>Profilim</li>
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
        <nav>
          <ul>
            {state.categories.map((category) => (
              <li
                className={
                  state.selectedCategory === category.id ? "navi-active" : ""
                }
                onClick={() => {
                  dispatch({ type: "selectedCategory", payload: category.id });
                  navigate(`/home/listproblem/${category.categoryName}`);
                }}
                key={category.id}
              >
                {category.categoryName === "CSHARP"
                  ? "C#"
                  : category.categoryName}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="navi-outlet">
        <Outlet />
      </div>
    </>
  );
};

export default Navi;
