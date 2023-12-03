import React, { useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import "./menu.scss";
import { Outlet, useNavigate } from "react-router-dom";
import { FaHtml5, FaCss3Alt, FaReact, FaJava } from "react-icons/fa";
import { RiJavascriptFill } from "react-icons/ri";
import { SiCsharp } from "react-icons/si";
import { BiCategoryAlt } from "react-icons/bi";
import { DiPython } from "react-icons/di";
const Menu = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {}, [state.selectedCategory]);
  return (
    <>
      {" "}
      <nav>
        <hr />
        <ul>
          <li
            className={state.selectedCategory === null ? "navi-active" : ""}
            onClick={() => {
              dispatch({ type: "selectedCategory", payload: null });
              navigate(`/home/listproblem/all`);
              // dispatch({
              //   type: "loadMoreProblems",
              //   payload: 5,
              // })
            }}
          >
            <BiCategoryAlt style={{ color: "sienna" }} />
            <span>Hepsi</span>
          </li>
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
              {category.categoryName === "HTML" && (
                <>
                  <FaHtml5 style={{ color: "red" }} />
                  <span>HTML</span>
                </>
              )}
              {category.categoryName === "CSS" && (
                <>
                  <FaCss3Alt style={{ color: "blue" }} />
                  <span>CSS</span>
                </>
              )}
              {category.categoryName === "JAVASCRIPT" && (
                <>
                  <RiJavascriptFill style={{ color: "rgb(224, 196, 36)" }} />{" "}
                  <span> JavaScript</span>
                </>
              )}
              {category.categoryName === "REACT" && (
                <>
                  <FaReact style={{ color: "cadetblue" }} />
                  <span> React</span>
                </>
              )}
              {category.categoryName === "JAVA" && (
                <>
                  <FaJava style={{ color: "orange" }} />
                  <span> Java</span>
                </>
              )}
              {category.categoryName === "PHYTON" && (
                <>
                  <DiPython style={{ color: "blue" }} />
                  <span>Phyton</span>
                </>
              )}
              {category.categoryName === "CSHARP" && (
                <>
                  <SiCsharp style={{ color: "purple" }} />
                  <span>C#</span>
                </>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Menu;
