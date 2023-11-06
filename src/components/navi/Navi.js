/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import DataContext from "../../context/DataContext";
import "./nav.scss";

const Navi = () => {
  const { state, dispatch } = useContext(DataContext);
  const navigate = useNavigate();

  useEffect(() => {}, []);
  return (
    <>
      <div className="navi-container">
        <div className="navi-header">
          <h3>
            <NavLink className="navi-link" to="/home/main">
              TheCoderPage
            </NavLink>
          </h3>
          {localStorage.getItem("userToken")!== null ? (
            <div>
              {" "}
              <button
                onClick={() => {
                  dispatch({ type: "login", payload: null });
                  localStorage.removeItem("userToken")
                  localStorage.removeItem("userId")
                  
                  navigate(`/home/main`);
                  
                }}
              >
                Çıkış Yap
              </button>
              <img src="https://media.licdn.com/dms/image/C4D03AQE2WJMTy32AtQ/profile-displayphoto-shrink_200_200/0/1639764302027?e=1704326400&v=beta&t=S3cw8swGln2MV0OR94LgX2l4cHw39_NiXw5Gw1NHf6w" />
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
